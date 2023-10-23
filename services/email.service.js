const nodeMailer = require('nodemailer');

const sendMail = async(options)=>{
    const transporter = nodeMailer.createTransport({
        service : 'Gmail',
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
        }
    })
    const message = {
        from : 'Nguyen Hai Chau',
        to: options.email,
        subject : options.subject,
        html: options.html
    }
    const info = await transporter.sendMail(message);
    return info;
}
module.exports = sendMail;