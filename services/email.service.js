const nodeMailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const sendMail = async(option)=>{
    const transporter = nodeMailer.createTransport({
        service : 'Gmail',
        // secure : true,
        // logger: true,
        // debug : true,
        // secureConnection : false,
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
        },
        // tls:{
        //     rejectUnauthorized: true
        // }
    });
    transporter.use('compile',hbs(
        {
            viewEngine: {
              extname: '.hbs', 
              layoutsDir: '../projectmanager/app/views/layouts/',
              defaultLayout : 'main',
              partialsDir : '../projectmanager/app/views/partials/'
            },
            viewPath: '../projectmanager/app/views/email/'
        }
    ));
    const message = {
        from : 'Nguyen Hai Chau',
        to: option.email,
        subject : option.subject,
        template : option.template,
        context : option.context
    }
    const info = await transporter.sendMail(message);
    return info;
}
module.exports = {sendMail};