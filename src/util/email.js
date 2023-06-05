import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv';
dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendEmail = async (emailContent) => {

  const { username, firstName, otp, subject } = emailContent;
  const msg = {
    to: username,
    from: '20rt223@vjcet.org',
    subject,
    text: `Hello ${firstName}, \nYour username is : ${username} \n\nYour otp is : ${otp}\n\nBest wishes,\nEasy Clutch`,
  }
  await sgMail.send(msg)
  return true;
}




