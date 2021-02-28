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
    let recap = await "";
    if (data.lang == "en") {

        if (data.service == "L") {
            recap = await `
                    <tr>
                        <th style="text-align: left;padding-right: 20px">Service</th>
                        <td>Container renting</td>
                    <tr>
        
                    <tr>
                        <th style="text-align: left;padding-right: 20px">Pick up</th>
                        <td>${data.locCountry}</td>
                    <tr>
                    <tr>
                        <th style="text-align: left;padding-right: 20px">Container type</th>
                        <td>${data.locContainerType}</td>
                    <tr>
                    <tr>
                        <th style="text-align: left;padding-right: 20px">Start date of location</th>
                        <td>${data.locStartDate}</td>
                    <tr>
                    <tr>
                        <th style="text-align: left;padding-right: 20px">End date of location</th>
                        <td>${data.locEndDate}</td>
                    <tr>
               `}
        else {

            recap = await `
            <tr>
                <th style="text-align: left;padding-right: 20px">From</th>
                <td>${data.fromCountry}</td>
            <tr>
            <th style="text-align: left;padding-right: 20px">Service ${process.env.CONTENTFUL_ACCESS_TOKEN}</th>
            <td>Transport</td>
            <tr>
            <tr>
                <th style="text-align: left;padding-right: 20px">From</th>
                <td>${data.fromCountry}</td>
            <tr>
            <tr>
                <th style="text-align: left;padding-right: 20px">To</th>
                <td>${data.toCountry}</td>
            <tr>
            <tr>
                <th style="text-align: left;padding-right: 20px">Commodity</th>
                <td>${data.commodity}</td>
            <tr>
            <tr>
                <th style="text-align: left;padding-right: 20px">Container type</th>
                <td>${data.locContainerType}</td>
            <tr>
            <tr>
                <th style="text-align: left;padding-right: 20px">Weight (Kg)</th>
                <td>${data.weight}</td>
            <tr>
            <tr>
                <th style="text-align: left;padding-right: 20px">Departure date</th>
                <td>${data.expectedDate}</td>
            <tr>`

        }

        let info = await transporter.sendMail({
            from: 'AsasLine Team <contact@asasline.com>',
            to: 'ousrh7@gmail.com',
            bcc: 'ouss_rh@hotmail.com',
            subject: 'Quote Request',
            text: 'Following up on your price request, our team would like to sincerely thank you for the trust you place in us. \n AsasLine thanks you for your online quote request. One of our advisor will study your project and will contact you as soon as possible',
            html: `<table style = "margin: 0 auto; width: 80%;" >
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
                <p>Dear,</p>
                <p>Following up on your price request, our team would like to sincerely thank you for the trust you place in us.</p>
                <p><b>AsasLine</b> thanks you for your online quote request. One of our advisor will study your project and will contact you as soon as possible</p>
            </td>
        </tr>
        <tr>
            <td style="font-size: 18px; font-family: sans-serif;">
                <p>Please find below the summary of your request:</p> 
                <table>
                    <tr>
                        <th style="text-align: left;padding-right: 20px">First Name</th>
                        <td>${data.firstName}</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;padding-right: 20px">Last Name</th>
                        <td>${data.lastName}</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;padding-right: 20px">E-mail</th>
                        <td>${data.fromCountry}</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;padding-right: 20px">Company</th>
                        <td>${data.email}</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;padding-right: 20px">VAT Number</th>
                        <td>${data.vat}</td>
                    </tr>
                    <tr>
                        <th style="text-align: left;padding-right: 20px">Mobile Phone</th>
                        <td>${data.phone}</td>
                    </tr>
                    <tr>
                        <th/>
                    </tr>
                    ${recap}
                </table
            </td>   
        </tr>
        <tr>
            <td style="padding: 0 20px; font-size: 22px; font-family: sans-serif;">
                <p>Do not hesitate to contact us for questions or more information:</p>
                <p><a href="https://asasline.com/contact" target="_blank" style="color: #f7af3d;">Contactez-us</a>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #0c1836; padding: 50px 0; ">
                
                <ul style="text-align: center;">
                <p style="text-align:center; color:#ffffff;font-family: sans-serif; margin-bottom: 20px;">Follow us</p>
                    <li style="display: inline; text-decoration: none; color: #ffffff; "><a
                            href="https://facebook.com/asasline" target="_blank"
                            style="color: #ffffff; text-decoration: none; font-family: sans-serif;">Facebook</a></li>
                    <li style="display: inline; text-decoration: none; color: #ffffff;"> | </li>
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
        if (data.service == "T") {
            recap = await `
                <tr>
                    <th style="text-align: left;padding-right: 20px">Service</th>
                    <td>Transport</td>
                <tr>

                <tr>
                    <th style="text-align: left;padding-right: 20px">De</th>
                    <td>${data.fromCountry}</td>
                <tr>
                <tr>
                    <th style="text-align: left;padding-right: 20px">À</th>
                    <td>${data.toCountry}</td>
                <tr>
                <tr>
                    <th style="text-align: left;padding-right: 20px">Type de marchendise</th>
                    <td>${data.commodity}</td>
                <tr>
                <tr>
                <th style="text-align: left;padding-right: 20px">Type de contenneur</th>
                    <td>${data.locContainerType}</td>
                <tr>
                <tr>
                    <th style="text-align: left;padding-right: 20px">Poids (Kg)</th>
                    <td>${data.weight} Kg</td>
                <tr>
                <tr>
                    <th style="text-align: left;padding-right: 20px">Date de depart</th>
                    <td>${data.expectedDate}</td>
                <tr>
           `

        }
        else {
            recap = await `
            <tr>
                <th style="text-align: left;padding-right: 20px">Service</th>
                <td>Location de contenaire</td>
            <tr>

            <tr>
                <th style="text-align: left;padding-right: 20px">Point de retrait</th>
                <td>${data.locCountry}</td>
            <tr>
            <tr>
                <th style="text-align: left;padding-right: 20px">Type de conteneur</th>
                <td>${data.locContainerType}</td>
            <tr>
            <tr>
                <th style="text-align: left;padding-right: 20px">Debut de location</th>
                <td>${data.locStartDate}</td>
            <tr>
            <tr>
                <th style="text-align: left;padding-right: 20px">Fin de location</th>
                <td>${data.locEndDate}</td>
            <tr>
       `

        }
        let info = await transporter.sendMail({
            from: 'AsasLine Team <contact@asasline.com>',
            to: 'ousrh7@gmail.com',
            bcc: 'ouss_rh@hotmail.com',
            subject: 'Faisant suite à votre demande de prix, notre équipe tenait à vous remercier sincèrement de la confiance que vous nous accordez.\n AsasLine vous remercie de votre demande de devis en ligne. Un conseiller sécurité va étudier votre projet et vous contactera dans les plus bref delais',
            text: 'Demande de Devis',
            html: `<table style = "margin: 0 auto;" width: 80 %; ";>
                    < tr >
                    <th style="background-color:#f7af3d; height: 20px;">

                    </th>
        </tr >
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
                <p><b>AsasLine</b> vous remercie de votre demande de devis en ligne. Un conseiller sécurité va étudier votre projet et vous contactera dans les plus bref delais</p>
            </td>
        </tr>
        <tr>
            <td style="font-size: 18px; font-family: sans-serif;">
                <p>Veuillez trouver ci-dessous le récapitulatif de votre demande :</p> 
                <table>
                <tr>
                    <th style="text-align: left;padding-right: 20px">Prénom</th>
                    <td>${data.firstName}</td>
                </tr>
                <tr>
                    <th style="text-align: left;padding-right: 20px">Nom</th>
                    <td>${data.lastName}</td>
                </tr>
                <tr>
                    <th style="text-align: left;padding-right: 20px">E-mail</th>
                    <td>${data.fromCountry}</td>
                </tr>
                <tr>
                    <th style="text-align: left;padding-right: 20px">Societé</th>
                    <td>${data.email}</td>
                </tr>
                <tr>
                    <th style="text-align: left;padding-right: 20px">Numéro de TVA</th>
                    <td>${data.vat}</td>
                </tr>
                <tr>
                    <th style="text-align: left;padding-right: 20px">Numéro de telephone</th>
                    <td>${data.phone}</td>
                </tr>
                <tr>
                    <th/>
                </tr>
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
                
                <ul style="text-align: center;">
                <p style="text-align:center; color:#ffffff;font-family: sans-serif; margin-bottom: 20px;">Follow us</p>
                    <li style="display: inline; text-align: center; text-decoration: none; color: #ffffff; "><a
                            href="https://facebook.com/asasline" target="_blank"
                            style="color: #ffffff; text-decoration: none; font-family: sans-serif;">Facebook</a></li>
                    <li style="display: inline;  text-align: center;text-decoration: none; color: #ffffff;"> | </li>
                    <li style="display: inline;  text-align: center;text-decoration: none; color: #ffffff;"><a
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