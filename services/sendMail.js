import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

const transport = nodemailer.createTransport({
  service : process.env.EMAIL_SERVICE,
  port : process.env.EMAIL_PORT,
  host : process.env.EMAIL_HOST,
  secure : true,
  auth:{
    user : process.env.EMAIL_USER,
    password : process.env.EMAIL_PASS
  }
});

const sendEmail = async (reciever,type,checkCode) =>{
  const emailVerify = `
    <div>
      <h1>Email Confirmation</h1>
      <h2>Hello ${reciever.fullName}</h2>
      <p>Thank you for verifying. Please confirm your email by clicking on the following button.</p>
      <a href=${process.env.BASE_URL}/emailverification/${checkCode}> Click here</a>
    </div>
  `;
  const forgotPass = `
    <div>
      <h1>Forgot Password</h1>
      <h2>No Worries, we help you get back to your account.</h2>
      <a href=${process.env.BASE_URL}/forgotpassword/${checkCode}> Click here</a>
    </div>
  `;
  //EVN or FPSWD
  const subject = (type == 'EVN') ? "Email Verification" : "Forgot Password";
  const body = (type == 'EVN') ? emailVerify : forgotPass;
  try {
    await transport.sendMail({
      from : process.env.EMAIL_USER,
      to: reciever.email,
      subject: subject,
      html : body
    });
    console.log("Email sent successfully to " + reciever.email);
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
