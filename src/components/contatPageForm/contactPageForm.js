import React from "react"
import ReCAPTCHA from "react-google-recaptcha";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

import '../style/style.css'

import { useIntl, injectIntl } from "gatsby-plugin-intl"

const ContactForm = () => {
    const intl = useIntl()

    return (
        <Container>

            <article className="formContactPage">
                <section className="contactfirstLine">
                    <h1>{intl.formatMessage({ id: "contact_page" })}</h1>
                    <p>{intl.formatMessage({ id: "contactFormpresentation" })}</p>
                    <p><br /></p>
                </section>
                <Form method="POST" data-netlify="true" name="contactForm v2" data-netlify-recaptcha='true'>
                    <input type="hidden" name="form-name" value="contactForm v2" />
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="First-Name">
                                <Form.Label>{intl.formatMessage({ id: "form_name_label" })} <span className="required_star">*</span></Form.Label>
                                <Form.Control type="text" name="First-Name" placeholder={intl.formatMessage({ id: "form_name_placeHolder" })} aria-describedby="inputGroupPrepend" required />
                                <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_name_validation" })}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="Last-Name">
                                <Form.Label>{intl.formatMessage({ id: "form_lastname_label" })} <span className="required_star">*</span></Form.Label>
                                <Form.Control type="text" name="Last-Name" placeholder={intl.formatMessage({ id: "form_lastname_placeHolder" })} required />
                                <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_lastName_validation" })}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                    </Form.Row>

                    <Form.Group controlId="email">
                        <Form.Label>{intl.formatMessage({ id: "form_email_label" })} <span className="required_star">*</span></Form.Label>
                        <Form.Control type="email" name="email" placeholder={intl.formatMessage({ id: "form_email_placeHolder" })} required />
                        <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_email_validation" })}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="subject">
                        <Form.Label>{intl.formatMessage({ id: "contactpageformSubject" })} <span className="required_star">*</span></Form.Label>
                        <Form.Control type="text" name="subject" placeholder={intl.formatMessage({ id: "contactpageformSubjectPlaceHolder" })} required />
                        <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "contactpageformSubjectValidation" })}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="message">
                        <Form.Label>{intl.formatMessage({ id: "contactpageformMessage" })} <span className="required_star">*</span></Form.Label>
                        <Form.Control as="textarea" rows="3" type="text" name="message" placeholder={intl.formatMessage({ id: "contactpageformMessagePlaceHolder" })} required />
                        <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "contactpageformMessageValidation" })}</Form.Control.Feedback>
                    </Form.Group>
                    <ReCAPTCHA sitekey={process.env.GATSBY_RECAPTCHA_KEY} />
                    <Button variant="primary" type="submit">
                        {intl.formatMessage({ id: "form_send" })}
                    </Button>
                </Form>
            </article>
        </Container >

    )
}


export default injectIntl(ContactForm)
