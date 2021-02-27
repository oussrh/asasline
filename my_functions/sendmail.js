const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {

    let transporter = await nodemailer.createTransport({
        service: "Outlook365",
        auth: {
            user: 'contact@asasline.com',
            pass: 'MSAs@sL1ne2021**'
        },
    })

    let info = await transporter.sendMail({
        from: 'AsasLine Team <contact@asasline.com>',
        to: 'ousrh7@gmail.com',
        subject: 'Test',
        text: 'hello world',
        html: '<h1>TEST</h1>'
    })

    return info
}