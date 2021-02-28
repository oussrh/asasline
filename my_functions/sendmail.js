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

    let recap;
    if (data.service == "L") {
        if (data.lang == "en") {
            recap = `
        <tr>
            <th>Service</th>
            <td>Container renting</td>
        <tr>
            
        <tr>
            <th>Pick up</th>
            <td>${data.locCountry}</td>
        <tr>
        <tr>
            <th>Container type</th>
            <td>${data.locContainerType}</td>
        <tr>
        <tr>
            <th>Start date of location</th>
            <td>${data.locStartDate}</td>
        <tr>
        <tr>
            <th>End date of location</th>
            <td>${data.locEndDate}</td>
        <tr>
   `}
        else {
            recap = `
        <tr>
            <th>Service</th>
            <td>Location de contenaire</td>
        <tr>
            
        <tr>
            <th>Point de retrait</th>
            <td>${data.locCountry}</td>
        <tr>
        <tr>
            <th>Type de conteneur</th>
            <td>${data.locContainerType}</td>
        <tr>
        <tr>
            <th>Debut de location</th>
            <td>${data.locStartDate}</td>
        <tr>
        <tr>
            <th>Fin de location</th>
            <td>${data.locEndDate}</td>
        <tr>
   `
        }
    }
    else {
        if (data.lang == "en") {
            recap = `
        <tr>
            <th>Service</th>
            <td>Transport</td>
        <tr>
            
        <tr>
            <th>From</th>
            <td>${data.fromCountry}</td>
        <tr>
        <tr>
            <th>To</th>
            <td>${data.toCountry}</td>
        <tr>
        <tr>
            <th>Commodity</th>
            <td>${data.commodity}</td>
        <tr>
        <tr>
            <th>Container type</th>
            <td>${data.locContainerType}</td>
        <tr>
        <tr>
            <th>Weight (Kg)</th>
            <td>${data.weight}</td>
        <tr>
        <tr>
            <th>Departure date</th>
            <td>${data.expectedDate}</td>
        <tr>
   `}
        else {
            recap = `
        <tr>
            <th>Service</th>
            <td>Transport</td>
        <tr>
            
        <tr>
            <th>De</th>
            <td>${data.fromCountry}</td>
        <tr>
        <tr>
            <th>À</th>
            <td>${data.toCountry}</td>
        <tr>
        <tr>
            <th>Type de marchendise</th>
            <td>${data.commodity}</td>
        <tr>
        <tr>
            <th>Type de contenneur</th>
            <td>${data.locContainerType}</td>
        <tr>
        <tr>
            <th>Poids (Kg)</th>
            <td>${data.weight} Kg</td>
        <tr>
        <tr>
            <th>Date de depart</th>
            <td>${data.expectedDate}</td>
        <tr>
   `
        }

        if (data.lang == "en") {

            let info = await transporter.sendMail({
                from: 'AsasLine Team <contact@asasline.com>',
                to: 'ousrh7@gmail.com',
                bcc: 'ouss_rh@hotmail.com',
                subject: 'Quote Request',
                text: 'Following up on your price request, our team would like to sincerely thank you for the trust you place in us. \n AsasLine thanks you for your online quote request. A security advisor will study your project and will contact you as soon as possible',
                html: `<table style="margin: 0 auto; width: 80%;">
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
            <td style="padding: 0 20px; font-size: 18px; font-family: sans-serif;">
                <p>Madame, Monsieur,</p>
                <p>Faisant suite à votre demande de prix, notre équipe tenait à vous remercier sincèrement de la confiance que vous nous accordez.</p>
                <p><b>Asas Line</b> vous remercie de votre demande de devis en ligne. Un conseiller sécurité va étudier votre projet et vous contactera dans les plus bref delais</p>
            </td>
        </tr>
        <tr>
            <td style="font-size: 18px; font-family: sans-serif;">
                <p></p> 
                <table>
                    ${recap}
                </table
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
                bcc: 'ouss_rh@hotmail.com',
                subject: 'Faisant suite à votre demande de prix, notre équipe tenait à vous remercier sincèrement de la confiance que vous nous accordez.\n AsasLine vous remercie de votre demande de devis en ligne. Un conseiller sécurité va étudier votre projet et vous contactera dans les plus bref delais',
                text: 'Demande de Devis',
                html: `<table style="margin: 0 auto;" width: 80%;";>
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
            <td style="padding: 0 20px; font-size: 18px; font-family: sans-serif;">
                <p>Madame, Monsieur,</p>
                <p>Faisant suite à votre demande de prix, notre équipe tenait à vous remercier sincèrement de la confiance que vous nous accordez.</p>
                <p><b>Asas Line</b> vous remercie de votre demande de devis en ligne. Un conseiller sécurité va étudier votre projet et vous contactera dans les plus bref delais</p>
            </td>
        </tr>
        <tr>
            <td style="font-size: 18px; font-family: sans-serif;">
                <p></p> 
                <table>
                    ${recap}
                </table
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