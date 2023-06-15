import env from "../config/load.js";
import {
    activatePackage, addScheduleModel, checkVehicleActive, checkVehicleUsage, getAvailableSession, getRequestPackage,
    getScheduleForTraineeModel,
    getScheduleForTrainerModel,
    insertPackageModel, listPackagesModel, updatePackagesModel, getActivePackageIdForVehicle, getPriceIdOfProduct, registerPackagePayment
} from "../models/package.js"
import { listLeaveModel } from "../models/trainer.js";
import Stripe from 'stripe';
const stripe = Stripe(env.stripeAPIKey)

export const listPackagesController = (name) => {
    return listPackagesModel(name)
}

export const updatePackagesController = (id, price) => {
    return updatePackagesModel(id, price)
}

export const insertPackageController = async (id, packageDetails) => {
    const available = await getAvailableSession()
    if (available > 0) {
        await insertPackageModel(id, packageDetails, available)
        return true;
    }
    return false;
}

export const displayRequestPackageController = () => {
    return getRequestPackage()
}

export const verifyPackagePaymentController = async (id) => {
    return await activatePackage(id)
}


export const addScheduleController = async (scheduleDetails) => {
    const vehicleActive = await checkVehicleActive(scheduleDetails.vehicleId)
    const vehicleFree = await checkVehicleUsage(scheduleDetails)
    const packageId = await getActivePackageIdForVehicle(scheduleDetails.vehicleId, scheduleDetails.traineeId)
    const markedLeavesForSession = await listLeaveModel(scheduleDetails.date, scheduleDetails.time)
    if (packageId === 0)
        return 1
    else if (!vehicleActive)
        return 2
    else if (!vehicleFree)
        return 3
    else if (markedLeavesForSession.length > 0)
        return 4
    else {
        await addScheduleModel(packageId, scheduleDetails)
        return 5
    }
}

export const getScheduleController = (user) => {
    if (user.userType === 'trainee') {
        return getScheduleForTraineeModel(user.userId)
    } else {
        return getScheduleForTrainerModel()
    }
}

export const createCheckoutSessionController = async (productId, customerEmail) => {
    const priceId = await getPriceIdOfProduct(productId);
    const session = await stripe.checkout.sessions.create({
        customer_email: customerEmail,
        line_items: [
            {
                price: priceId,
                quantity: 1,
            }
        ],
        mode: 'payment',
        success_url: `${env.traineeFeHost}/packages?payment=success`,
        cancel_url: `${env.traineeFeHost}/packages?payment=cancelled`,
    });
    return session;
}

export const handleWebhookEventController = async (payload, signature) => {
    const event = stripe.webhooks.constructEvent(payload, signature, env.stripeWebhookSecret);
    if (event.type === 'checkout.session.completed') {
        const session = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
                expand: ['line_items'],
            }
        );
        await registerPackagePayment(session.id, session.customer_email, session.line_items.data[0].price.id)
    }
}
