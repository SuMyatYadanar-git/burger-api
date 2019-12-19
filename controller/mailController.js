require('dotenv').config()
const nodemailer = require('nodemailer')
const response = require('../config/response')

// https://myaccount.google.com/lesssecureapps
module.exports.postMail = (req, res) => {
    // step1
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL, pass: process.env.PASSWORD }
    });
    // step2
    let mailOptions = {
        from: 'lucylyida188@gmail.com',
        to: req.body.info.mail,
        subject: ` Thanks for messaging to us ${req.body.info.name}`,
        text: req.body.info.message
    }
    // step3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) res.json(response({ success: false, message: err }))
        else res.status(200).json(response({ success: true, payload: data }))
    })
}