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


    if (data.lang == "en") {

        let info = await transporter.sendMail({
            from: 'AsasLine Team <contact@asasline.com>',
            to: 'ousrh7@gmail.com',
            subject: 'Test',
            text: 'hello wo.rld',
            html: `<table style="margin: 0 auto;">
        <tr>
            <th style="background-color:#f7af3d; height: 20px;">

            </th>
        </tr>
        <tr>
            <th style="background-color: #0c1836;">
                <img src="http://images.ctfassets.net/35alcelronzi/4yMwWQ0jjr0YgN5Ocpr3hw/8394691c2a4dcbd4f048561d2bef2b1f/asaslineLogo.png"
                    style="margin: 20px auto;" />
            </th>
        </tr>
        <tr>
            <td style="padding: 0 20px; font-size: 26px; font-family: sans-serif;">
                <p>Madame, Monsieur,</p>
                <p>Faisant suite à votre demande de prix, notre équipe tenait à vous remercier sincèrement de la confiance que vous nous accordez.</p>
                <p><b>Asas Line</b> vous remercie de votre demande de devis en ligne. Un conseiller sécurité va étudier votre projet et vous contactera dans les plus bref delais</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 0 20px; font-size: 22px; font-family: sans-serif;">
                <p>N'hésitez pas à nous contacter pour des questions ou plus d'informations:</p>
                <p><a href="https://asasline.com/contact" target="_blank" style="color: #f7af3d;">Contactez-nous</a>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #0c1836; padding: 50px 0; ">
                <p style="text-align:center; color:#ffffff;font-family: sans-serif; margin-bottom: 20px;">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Follow us</p>
                <ul style="text-align: center;">
                    <li style="display: inline; text-decoration: none; color: #ffffff; "><a
                            href="https://facebook.com/asasline" target="_blank"
                            style="color: #ffffff; text-decoration: none; font-family: sans-serif;">Facebook</a></li>
                    <li style="display: inline; text-decoration: none; color: #ffffff;">|</li>
                    <li style="display: inline; text-decoration: none; color: #ffffff;"><a
                            href="https://instagram.com/asasline" target="_blank"
                            style="color: #ffffff; text-decoration: none; font-family: sans-serif;">Instagram</a></li>
                </ul>
                <p
                    style="color: #ffffff; text-align: center; text-decoration: none; font-size: 12px; font-family: sans-serif; margin-top: 50px;">
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;www.asasline.com
                </p>
            </td>
        </tr>
    </table>`
        })

        return info
    }
    else {
        let info = await transporter.sendMail({
            from: 'AsasLine Team <contact@asasline.com>',
            to: 'ousrh7@gmail.com',
            subject: 'Test',
            text: 'hello wo.rld',
            html: `<table style="margin: 0 auto;">
        <tr>
            <th style="background-color:#f7af3d; height: 20px;">

            </th>
        </tr>
        <tr>
            <th style="background-color: #0c1836;">
                <img src="http://images.ctfassets.net/35alcelronzi/4yMwWQ0jjr0YgN5Ocpr3hw/8394691c2a4dcbd4f048561d2bef2b1f/asaslineLogo.png"
                    style="margin: 20px auto;" />
            </th>
        </tr>
        <tr>
            <td style="padding: 0 20px; font-size: 26px; font-family: sans-serif;">
                <p>Madame, Monsieur,</p>
                <p>Faisant suite à votre demande de prix, notre équipe tenait à vous remercier sincèrement de la confiance que vous nous accordez.</p>
                <p><b>Asas Line</b> vous remercie de votre demande de devis en ligne. Un conseiller sécurité va étudier votre projet et vous contactera dans les plus bref delais</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 0 20px; font-size: 22px; font-family: sans-serif;">
                <p>N'hésitez pas à nous contacter pour des questions ou plus d'informations:</p>
                <p><a href="https://asasline.com/contact" target="_blank" style="color: #f7af3d;">Contactez-nous</a>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #0c1836; padding: 50px 0; ">
                <p style="text-align:center; color:#ffffff;font-family: sans-serif; margin-bottom: 20px;">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Follow us</p>
                <ul style="text-align: center;">
                    <li style="display: inline; text-decoration: none; color: #ffffff; "><a
                            href="https://facebook.com/asasline" target="_blank"
                            style="color: #ffffff; text-decoration: none; font-family: sans-serif;">Facebook</a></li>
                    <li style="display: inline; text-decoration: none; color: #ffffff;">|</li>
                    <li style="display: inline; text-decoration: none; color: #ffffff;"><a
                            href="https://instagram.com/asasline" target="_blank"
                            style="color: #ffffff; text-decoration: none; font-family: sans-serif;">Instagram</a></li>
                </ul>
                <p
                    style="color: #ffffff; text-align: center; text-decoration: none; font-size: 12px; font-family: sans-serif; margin-top: 50px;">
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;www.asasline.com
                </p>
            </td>
        </tr>
    </table>`
        })

        return info
    }

}