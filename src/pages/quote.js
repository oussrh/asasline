// @ts-nocheck
import React, { useState } from "react"
import { navigate } from 'gatsby'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import axios from 'axios'
import Swal from 'sweetalert2'

import { useStaticQuery, graphql } from "gatsby"


import Layout from "../components/layout"
import SEO from "../components/seo"

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css'

import { injectIntl, FormattedMessage, useIntl } from "gatsby-plugin-intl"

const DevisPage = () => {
    const intl = useIntl()
    const endpoint = "/.netlify/functions/hello"
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [vat, setVat] = useState('');
    const [phone, setPhone] = useState('');
    const [dock, setDock] = useState('');
    const [country, setCountry] = useState('');
    const [saison, setSaison] = useState('0');
    const [qualityV, setQualityV] = useState(false);
    const [quality, setQuality] = useState('0');
    const [quantity, setQuantity] = useState('0');
    const [quantityV, setQuantityV] = useState(false);
    const [validated, setValidated] = useState(false);
    const [result, setResult] = useState(null);

    const handleFirstNameInput = (e) => { setFirstName(e.currentTarget.value) }
    const handleLastNameInput = (e) => { setLastName(e.currentTarget.value) }
    const handleEmailInput = (e) => { setEmail(e.currentTarget.value) }
    const handlePhoneInput = (e) => { setPhone(e.currentTarget.value) }
    const handleDockInput = (e) => { setDock(e.currentTarget.value) }
    const handleCompanyInput = (e) => { setCompany(e.currentTarget.value) }
    const handleCountryInput = (e) => { setCountry(e.currentTarget.value) }
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
        }`)

    const handleSaisonSelect = (e) => {
        if (e.currentTarget.value === '0') {
            setQualityV(false)
            setQuantityV(false)
            setSaison('0')
            setQuality('0')
            setQuantity('0')
        }
        else {
            setQualityV(true)
            setSaison(e.currentTarget.value)
        }
    }

    const handleQualitySelect = (e) => {
        if (e.currentTarget.value === '0') {
            setQuantityV(false)
            setQuality('0')
            setQuantity('0')
        }
        else {
            setQuantityV(true)
            setQuality(e.currentTarget.value)
        }
    }

    const handleQuatitySelect = (e) => {

        setQuantity(e.currentTarget.value)

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

            let pdfs = qdata.allContentfulAsset.nodes
            const data =
            {
                lang,
                email,
                firstName,
                lastName,
                phone,
                company,
                vat,
                country,
                dock,
                saison,
                quality,
                quantity,
                pdfs
            }

            axios.post(endpoint, JSON.stringify(data)).then(response => {
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
                    <h1><FormattedMessage id="devis_page" /></h1>
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
                        <Form.Group controlId="email">
                            <Form.Label>{intl.formatMessage({ id: "form_email_label" })} <span className="required_star">*</span></Form.Label>
                            <Form.Control type="email" name="email" onChange={handleEmailInput} placeholder={intl.formatMessage({ id: "form_email_placeHolder" })} required />
                            <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_email_validation" })}</Form.Control.Feedback>
                        </Form.Group>
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
                            <Col>
                                <Form.Group controlId="country">
                                    <Form.Label>{intl.formatMessage({ id: "form_country_label" })} <span className="required_star">*</span></Form.Label>
                                    <Form.Control as="select" name="country" onChange={handleCountryInput} placeholder={intl.formatMessage({ id: "form_country_placeHolder" })} required>
                                        <option value="">...</option>
                                        {
                                            countries.map(c =>
                                                <option key={c.id} value={c.name}>{c.name}</option>
                                            )
                                        }
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">{intl.formatMessage({ id: "form_country_validation" })}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="dock">
                            <Form.Label>{intl.formatMessage({ id: "form_port_label" })}</Form.Label>
                            <Form.Control type="text" name="dock" onChange={handleDockInput} placeholder={intl.formatMessage({ id: "form_port_placeHolder" })} />
                        </Form.Group>
                        {/* Selections */}
                        <Form.Group controlId="season">
                            <Form.Label>{intl.formatMessage({ id: "form_saison_label" })}</Form.Label>
                            <Form.Control as="select" name="season" onChange={handleSaisonSelect} required>
                                <option key="0" value="0">{intl.formatMessage({ id: "form_select_keyword" })}</option>
                                <option key="1" value="summer">{intl.formatMessage({ id: "summer_saison_label" })}</option>
                                <option key="2" value="winter">{intl.formatMessage({ id: "winter_saison_label" })}</option>
                            </Form.Control>
                        </Form.Group>
                        {

                            qualityV ?
                                < Form.Group controlId="quality">
                                    <Form.Label>{intl.formatMessage({ id: "form_quality_label" })}</Form.Label>
                                    <Form.Control as="select" name="quality" onChange={handleQualitySelect} required>
                                        <option key="0" value="0">{intl.formatMessage({ id: "form_select_keyword" })}</option>
                                        {
                                            saison === 'summer' ?
                                                <>
                                                    <option key="1" value="extra_cream">{intl.formatMessage({ id: "form_quality_summer_1" })}</option>
                                                    <option key="3" value="cream_mix_A_B">{intl.formatMessage({ id: "form_quality_summer_4" })}</option>
                                                    <option key="2" value="grade_A_and_B">{intl.formatMessage({ id: "form_quality_summer_2" })}</option>
                                                    <option key="3" value="tropica_Mix">{intl.formatMessage({ id: "form_quality_summer_3" })}</option>
                                                </>
                                                :
                                                <>
                                                    <option key="1" value="mix_cream">{intl.formatMessage({ id: "form_quality_winter_1" })}</option> mix cream
                                                    <option key="2" value="grade_A">{intl.formatMessage({ id: "form_quality_winter_2" })}</option> A grade
                                                </>
                                        }
                                    </Form.Control>
                                </Form.Group>
                                :
                                null
                        }
                        {
                            quantityV ?
                                <Form.Group controlId="quantity">
                                    <Form.Label>{intl.formatMessage({ id: "form_quantity_label" })}</Form.Label>
                                    <Form.Control as="select" name="quantity" onChange={handleQuatitySelect} required>
                                        <option key="0" value="0"> {intl.formatMessage({ id: "form_select_keyword" })}</option>
                                        {
                                            quality === 'extra_cream' ?
                                                <>
                                                    <option key="1" value="under_900">{intl.formatMessage({ id: "form_qte_under900" })}</option>
                                                    <option key="2" value="summer_under_10tCream">{intl.formatMessage({ id: "form_qte_under10t" })}</option>
                                                    <option key="2" value="20ftCreamSummer">{intl.formatMessage({ id: "form_qte_20ft" })}</option>
                                                </>
                                                : quality === 'cream_mix_A_B' ?
                                                    <>
                                                        <option key="1" value="mix_cream_20ft45kg">{intl.formatMessage({ id: "form_qte_mix_cream_20ft_45" })}</option>
                                                        <option key="2" value="mix_cream_40ft45kg">{intl.formatMessage({ id: "form_qte_mix_cream_40ft_45" })}</option>
                                                        <option key="5" value="mix_cream_20ft55kg">{intl.formatMessage({ id: "form_qte_mix_cream_20ft_55" })}</option>
                                                        <option key="3" value="mix_cream_40ft55kg">{intl.formatMessage({ id: "form_qte_mix_cream_40ft_55" })}</option>
                                                        <option key="4" value="mix_cream_40ft80kg">{intl.formatMessage({ id: "form_qte_mix_cream_40ft_80" })}</option>
                                                    </>
                                                    : quality === 'grade_A_and_B' ?
                                                        <>
                                                            <option key="1" value="20ft_45AB">{intl.formatMessage({ id: "form_qte_20ft_45" })}</option>
                                                            <option key="2" value="20ft_55AB">{intl.formatMessage({ id: "form_qte_20ft_55" })}</option>
                                                            <option key="3" value="40ft_45AB">{intl.formatMessage({ id: "form_qte_40ft_45" })}</option>
                                                            <option key="4" value="40ft_55AB">{intl.formatMessage({ id: "form_qte_40ft_55" })}</option>
                                                        </>
                                                        : quality === 'tropica_Mix' ?
                                                            <>
                                                                <option key="1" value="tropical20ft45kg">{intl.formatMessage({ id: "form_qte_tropical20" })}</option>
                                                                <option key="2" value="tropical40ft45kg">{intl.formatMessage({ id: "form_qte_tropical40_45" })}</option>
                                                                <option key="3" value="tropical40ft55kg">{intl.formatMessage({ id: "form_qte_tropical_40_55" })}</option>
                                                                <option key="4" value="tropical40ft80kg">{intl.formatMessage({ id: "form_qte_tropical40_80" })}</option>
                                                            </>
                                                            : quality === 'mix_cream' ?
                                                                <>
                                                                    <option key="1" value="under_900">{intl.formatMessage({ id: "form_qte_under900" })}</option>
                                                                    <option key="2" value="winter_under_10tMixCream">{intl.formatMessage({ id: "form_qte_under10t" })}</option>
                                                                    <option key="3" value="20ftMixCreamWinter">{intl.formatMessage({ id: "form_qte_20ft" })}</option>
                                                                </>
                                                                : quality === 'grade_A' ?
                                                                    <>
                                                                        <option key="1" value="under_900">{intl.formatMessage({ id: "form_qte_under900" })}</option>
                                                                        <option key="2" value="more_900_A_Winter">{intl.formatMessage({ id: "form_qte_under10t_gradeA" })}</option>
                                                                        {/* <option key="3" value="20ftWinterA">{intl.formatMessage({ id: "form_qte_20ft" })}</option> */}
                                                                    </>
                                                                    : null
                                        }
                                    </Form.Control>
                                </Form.Group>
                                :
                                null
                        }
                        {
                            saison !== '0' && quality !== '0' && quantity !== '0' ?
                                quantity === 'under_900' ?
                                    Swal.fire({
                                        text: intl.formatMessage({ id: "under_900kg_msg" }),
                                        icon: 'info',
                                        confirmButtonText: intl.formatMessage({ id: "under_900kg_btn" })
                                    })
                                        .then((result) => {
                                            navigate('https://sakando.com')
                                        })
                                    :
                                    <Button variant="primary" type="submit">
                                        {intl.formatMessage({ id: "form_submit_keyword" })}
                                    </Button>
                                : <br />
                        }
                    </Form>
                </Container>
            </Layout>
        </>
    )
}

export default injectIntl(DevisPage)