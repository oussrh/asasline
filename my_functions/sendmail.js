const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {

    let data = await JSON.parse(event.body)

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
        text: 'hello wo.rld',
        html: `<h1>${data.fromCountry}</h1>`
    })

    return info
}