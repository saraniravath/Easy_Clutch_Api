export const generateOTP = () => {

    let otp = Math.trunc((Math.random() * 1000000));
    return otp;
}