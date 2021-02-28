// @ts-nocheck
import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { navigate } from 'gatsby'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import axios from 'axios'
import Swal from 'sweetalert2'

import { renderRichText } from "gatsby-source-contentful/rich-text"

import Layout from "../components/layout"
import SEO from "../components/seo"

import 'bootstrap/dist/css/bootstrap.min.css';

import '../style/style.css'

import { injectIntl, FormattedMessage, useIntl } from "gatsby-plugin-intl"

const DevisPage = () => {
    const intl = useIntl()

    const endpoint = "/.netlify/functions/sendmail"
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [vat, setVat] = useState('');
    const [phone, setPhone] = useState('');

    const [service, setService] = useState('0');
    const [location, setLocation] = useState(false);
    const [transport, setTransport] = useState(false);
    const [fromCountry, setFromCountry] = useState('');
    const [toCountry, setToCountry] = useState('');
    const [commodity, setCommodity] = useState('');
    const [weight, setWeight] = useState('');
    const [containerType, setContainerType] = useState('');
    const [expectedDate, setExpectedDate] = useState('');

    const [locCountry, setLocCountry] = useState('');
    const [locContainerType, setLocContainerType] = useState('');
    const [locStartDate, setLocStartDate] = useState('');
    const [locEndDate, setLocEndDate] = useState('');


    const [validated, setValidated] = useState(false);
    const [result, setResult] = useState(null);

    const handleFirstNameInput = (e) => { setFirstName(e.currentTarget.value) }
    const handleLastNameInput = (e) => { setLastName(e.currentTarget.value) }
    const handleEmailInput = (e) => { setEmail(e.currentTarget.value) }
    const handlePhoneInput = (e) => { setPhone(e.currentTarget.value) }
    const handleCompanyInput = (e) => { setCompany(e.currentTarget.value) }

    const handleFromCountryInput = (e) => { setFromCountry(e.currentTarget.value) }
    const handleToCountryInput = (e) => { setToCountry(e.currentTarget.value) }
    const handleCommodityInput = (e) => { setCommodity(e.currentTarget.value) }
    const handleContainerInput = (e) => { setContainerType(e.currentTarget.value) }
    const handleWeightInput = (e) => { setWeight(e.currentTarget.value) }
    const handleExpectedDateInput = (e) => { setExpectedDate(e.currentTarget.value) }

    const handleLocCountryInput = (e) => { setLocCountry(e.currentTarget.value) }
    const handleLocContainerTypeInput = (e) => { setLocContainerType(e.currentTarget.value) }
    const handleExpectedStartDateInput = (e) => { setLocStartDate(e.currentTarget.value) }
    const handleExpectedEndDateInput = (e) => { setLocEndDate(e.currentTarget.value) }


    const handleVatInput = (e) => { setVat(e.currentTarget.value) }

    const lang = intl.locale

    const qdata = useStaticQuery(
        graphql`
        query {
            allContentfulCountries {
                nodes {
                    node_locale
                    countries {
                        id
                        name
                    }
                }
            }
            allContentfulQuotePage {
                nodes {
                    title
                    node_locale
                    id
                    quoteText {
                        raw
                    }
                }
            }
        }`)

    const handleServiceSelect = (e) => {
        let serv = e.currentTarget.value;
        console.log(serv)
        if (service === '0') {
            setLocation(false)
            setTransport(false)
            setService('0')
        }
        if (serv === "T") {
            setTransport(true)
            setLocation(false)
            setService(e.currentTarget.value)
        }

        else if (serv === "L") {
            setTransport(false)
            setLocation(true)
            setService(e.currentTarget.value)
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {
            const message = addToMailchimp(email)
            setResult(message)

            const data =
            {
                lang,
                email,
                firstName,
                lastName,
                phone,
                company,
                vat,
                service,
                fromCountry,
                toCountry,
                commodity,
                containerType,
                weight,
                expectedDate,
                locCountry,
                locContainerType,
                locStartDate,
                locEndDate

            }

            axios.post(endpoint, JSON.stringify(data)).then(response => {
                console.log(response)
                if (response.status !== 200) {
                    Swal.fire({
                        icon: 'error',
                        title: intl.formatMessage({ id: "form_submit_error_title" }),
                        text: intl.formatMessage({ id: "form_submit_error_text" }),
                        confirmButtonText: intl.formatMessage({ id: "form_submit_back_btn" })
                    })
                        .then((result) => {
                            navigate('/')
                        })
                } else {
                    Swal.fire({
                        title: intl.formatMessage({ id: "form_submit_sucess_title" }),
                        text: intl.formatMessage({ id: "form_submit_sucess_text" }),
                        icon: 'success',
                        confirmButtonText: intl.formatMessage({ id: "form_submit_back_btn" })
                    })
                        .then((result) => {
                            navigate('/')
                        })
                }
            })
            event.preventDefault()
        }
    };

    const countries = qdata.allContentfulCountries.nodes.filter(l => l.node_locale === lang)[0].countries
    return (
        <>
            <Layout>
                <SEO title={intl.formatMessage({ id: "devis_page" })} />
                <Container className="estimation_container">

                    {
                        qdata.allContentfulQuotePage.nodes.filter(artl => artl.node_locale === intl.locale).map(artl => {
                            return (
                                <section className="quoteGeneralInfo">
                                    <h1>{artl.title}</h1>
                                    <p>{renderRichText(artl.quoteText)}</p>
                                </section>
                            )
                        })
                    }
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="FirstName">
                                    <Form.Label>{intl.formatMessage({ id: "form_name_label" })} <span className="required_star">*</span></Form.Label>
                                    <Form.Control type="text" name="FirstName" onChange={handleFirstNameInput} placeholder={intl.formatMessage({ id: "form_name_placeHolder" })} aria-describedby="inputGroupPrepend" required />
                                    <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_name_validation" })}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="LastName">
                                    <Form.Label>{intl.formatMessage({ id: "form_lastname_label" })} <span className="required_star">*</span></Form.Label>
                                    <Form.Control type="text" name="LastName" onChange={handleLastNameInput} placeholder={intl.formatMessage({ id: "form_lastname_placeHolder" })} required />
                                    <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_lastName_validation" })}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="email">
                                    <Form.Label>{intl.formatMessage({ id: "form_email_label" })} <span className="required_star">*</span></Form.Label>
                                    <Form.Control type="email" name="email" onChange={handleEmailInput} placeholder={intl.formatMessage({ id: "form_email_placeHolder" })} required />
                                    <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_email_validation" })}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col></Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="company">
                                    <Form.Label>{intl.formatMessage({ id: "form_company_label" })}</Form.Label>
                                    <Form.Control type="text" name="company" onChange={handleCompanyInput} placeholder={intl.formatMessage({ id: "form_company_placeHolder" })} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="vat">
                                    <Form.Label>{intl.formatMessage({ id: "form_vat_label" })}</Form.Label>
                                    <Form.Control type="text" name="vat" onChange={handleVatInput} placeholder={intl.formatMessage({ id: "form_vat_placeHolder" })} />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="phone">
                                    <Form.Label>{intl.formatMessage({ id: "form_mobile_label" })} <span className="required_star">*</span></Form.Label>
                                    <Form.Control type="tel" name="phone" onChange={handlePhoneInput} placeholder={intl.formatMessage({ id: "form_mobile_placeHolder" })} required />
                                    <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_phone_validation" })}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col></Col>
                        </Form.Row>
                        <Form.Row>

                            <Col>
                                <Button onClick={handleServiceSelect} value="T" className="quoteType" variant="secondary">Transport</Button>
                            </Col>
                            <Col>
                                <Button onClick={handleServiceSelect} value="L" className="quoteType" variant="secondary">Location</Button>
                            </Col>


                        </Form.Row>
                        {
                            transport ?
                                <>
                                    <h2>Transport</h2>
                                    <fieldset>
                                        <legend>ROUTE <span className="line"></span></legend>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group controlId="fromcountry">
                                                    <Form.Label>{intl.formatMessage({ id: "form_FROM_country_label" })} <span className="required_star">*</span></Form.Label>
                                                    <Form.Control as="select" name="fromcountry" onChange={handleFromCountryInput} placeholder={intl.formatMessage({ id: "form_country_placeHolder" })} required>
                                                        <option value="">...</option>
                                                        {
                                                            countries.map(c =>
                                                                <option key={c.id} value={c.name}>{c.name}</option>
                                                            )
                                                        }
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_fromcountry_validation" })}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col>

                                                <Form.Group controlId="tocountry">
                                                    <Form.Label>{intl.formatMessage({ id: "form_TO_country_label" })} <span className="required_star">*</span></Form.Label>
                                                    <Form.Control as="select" name="tocountry" onChange={handleToCountryInput} placeholder={intl.formatMessage({ id: "form_country_placeHolder" })} required>
                                                        <option value="">...</option>
                                                        {
                                                            countries.map(c =>
                                                                <option key={c.id} value={c.name}>{c.name}</option>
                                                            )
                                                        }
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_tocountry_validation" })}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                    </fieldset>
                                    <fieldset>
                                        <legend>COMMODITY <span className="line"></span></legend>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group controlId="commodity">
                                                    <Form.Label>{intl.formatMessage({ id: "form_commidity_label" })} <span className="required_star">*</span></Form.Label>
                                                    <Form.Control type="tel" name="phone" onChange={handleCommodityInput} placeholder={intl.formatMessage({ id: "form_commidity_placeHolder" })} required />
                                                    <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_commodity_validation" })}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col></Col>
                                        </Form.Row>
                                    </fieldset>
                                    <fieldset>
                                        <legend>CONTAINER <span className="line"></span></legend>

                                        <Form.Row>
                                            <Col>

                                                <Form.Group controlId="container">
                                                    <Form.Label>{intl.formatMessage({ id: "form_containerType_label" })} <span className="required_star">*</span></Form.Label>
                                                    <Form.Control as="select" name="container" onChange={handleContainerInput} placeholder={intl.formatMessage({ id: "form_country_placeHolder" })} required>
                                                        <option value="">...</option>
                                                        <option key="1" value="20 Dry Standard">{intl.formatMessage({ id: "form_container20_placeHolder" })}</option>
                                                        <option key="2" value="40 Dry High">{intl.formatMessage({ id: "form_container40_placeHolder" })}</option>
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_containerType_validation" })}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="weight">
                                                    <Form.Label>{intl.formatMessage({ id: "form_containerWeight_label" })}</Form.Label>
                                                    <Form.Control type="number" name="dock" onChange={handleWeightInput} placeholder={intl.formatMessage({ id: "form_containerWeight_placeHolder" })} />
                                                    <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_containerWeight_validation" })}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                    </fieldset>
                                    <fieldset>
                                        <legend>DATE <span className="line"></span></legend>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group controlId="startLocDate">
                                                    <Form.Label>{intl.formatMessage({ id: "form_ExpectedDeparture_label" })}</Form.Label>
                                                    <Form.Control type="date" name="dock" onChange={handleExpectedDateInput} placeholder={intl.formatMessage({ id: "form_ExpectedDeparture_placeHolder" })} />
                                                    <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_ExpectedDeparture_validation" })}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                            </Col>
                                        </Form.Row>
                                    </fieldset>
                                    <Button variant="primary" type="submit">
                                        {intl.formatMessage({ id: "form_submit_keyword" })}
                                    </Button>
                                </>
                                : location ?

                                    <>
                                        <h2>Location</h2>
                                        <fieldset>
                                            <legend>ROUTE <span className="line"></span></legend>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Group controlId="locfromcountry">
                                                        <Form.Label>{intl.formatMessage({ id: "form_FROM_country_label" })} <span className="required_star">*</span></Form.Label>
                                                        <Form.Control type="tel" name="locfromcountry" onChange={handleLocCountryInput} placeholder={intl.formatMessage({ id: "form_country_placeHolder" })} required />
                                                        <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_fromcountry_validation" })}</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col>

                                                </Col>
                                            </Form.Row>
                                        </fieldset>
                                        <fieldset>
                                            <legend>CONTAINER <span className="line"></span></legend>

                                            <Form.Row>
                                                <Col>

                                                    <Form.Group controlId="container">
                                                        <Form.Label>{intl.formatMessage({ id: "form_containerType_label" })} <span className="required_star">*</span></Form.Label>
                                                        <Form.Control as="select" name="container" onChange={handleLocContainerTypeInput} placeholder={intl.formatMessage({ id: "form_country_placeHolder" })} required>
                                                            <option value="">...</option>
                                                            <option key="1" value="20 Dry Standard">{intl.formatMessage({ id: "form_container20_placeHolder" })}</option>
                                                            <option key="2" value="40 Dry High">{intl.formatMessage({ id: "form_container40_placeHolder" })}</option>
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_containerType_validation" })}</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col>

                                                </Col>
                                            </Form.Row>
                                        </fieldset>
                                        <fieldset>
                                            <legend>DATE <span className="line"></span></legend>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Group controlId="startLocDate">
                                                        <Form.Label>{intl.formatMessage({ id: "form_ExpectedDeparture_label" })}</Form.Label>
                                                        <Form.Control type="date" name="dock" onChange={handleExpectedStartDateInput} placeholder={intl.formatMessage({ id: "form_ExpectedDeparture_placeHolder" })} />
                                                        <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_ExpectedDeparture_validation" })}</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group controlId="endLocDate">
                                                        <Form.Label>{intl.formatMessage({ id: "form_ExpectedDeparture_label" })}</Form.Label>
                                                        <Form.Control type="date" name="dock" onChange={handleExpectedEndDateInput} placeholder={intl.formatMessage({ id: "form_ExpectedDeparture_placeHolder" })} />
                                                        <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_ExpectedDeparture_validation" })}</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                        </fieldset>
                                        <Button variant="primary" type="submit">
                                            {intl.formatMessage({ id: "form_submit_keyword" })}
                                        </Button>
                                    </>
                                    :
                                    <>

                                    </>
                        }

                    </Form>
                </Container>
            </Layout>
        </>
    )
}

export default injectIntl(DevisPage)