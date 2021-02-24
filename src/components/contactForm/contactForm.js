import React from "react"
import ReCAPTCHA from "react-google-recaptcha";

import './contactForm.css'

import { useIntl, injectIntl } from "gatsby-plugin-intl"

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

const ContactForm = () => {
    const intl = useIntl()
    return (
        <div className="homePageFormContainer">
            <div className="parallax"></div>
            <article className="formContact">
                <Form method="POST" data-netlify="true" name="contactFormHomePage v2" data-netlify-recaptcha='true'>
                    <input type="hidden" name="form-name" value="contactFormHomePage v2" />
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="First-Name">
                                <Form.Control type="text" name="First-Name" placeholder={intl.formatMessage({ id: "form_name_label" })} aria-describedby="inputGroupPrepend" required />
                                <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_name_validation" })}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="Last-Name">
                                <Form.Control type="text" name="Last-Name" placeholder={intl.formatMessage({ id: "form_lastname_label" })} required />
                                <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_lastName_validation" })}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                    </Form.Row>
                    <Form.Group controlId="email">
                        <Form.Control type="email" name="email" placeholder={intl.formatMessage({ id: "form_email_label" })} required />
                        <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_email_validation" })}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="subject">
                        <Form.Control type="text" name="subject" placeholder={intl.formatMessage({ id: "contactpageformSubjectPlaceHolder" })} required />
                        <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "contactpageformSubjectValidation" })}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="message">
                        <Form.Control as="textarea" rows="3" type="text" name="message" placeholder={intl.formatMessage({ id: "contactpageformMessagePlaceHolder" })} required />
                        <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "contactpageformMessageValidation" })}</Form.Control.Feedback>
                    </Form.Group>
                    <ReCAPTCHA sitekey={process.env.GATSBY_RECAPTCHA_KEY} />
                    <Button variant="primary" type="submit">
                        {intl.formatMessage({ id: "form_send" })}
                    </Button>
                </Form>
                <section className="homePageconatctText">
                    <h3>{intl.formatMessage({ id: "contactSectionTitle" })}</h3>
                    <p>{intl.formatMessage({ id: "contactSectiontext" })}</p>
                    <p>Tel: {intl.formatMessage({ id: "phone_number" })}</p>
                    <p>Email: contact(@)asasline.com</p>
                </section>
            </article>
            <div className="parallax"></div>
        </div>

    )
}


export default injectIntl(ContactForm)
