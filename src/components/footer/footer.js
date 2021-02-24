import { useStaticQuery, graphql } from "gatsby"
import React, { useState } from "react"
import addToMailchimp from 'gatsby-plugin-mailchimp'
import Swal from 'sweetalert2'

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Img from "gatsby-image"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.css'

import { injectIntl, useIntl, Link } from "gatsby-plugin-intl"

const Footer = () => {
  const intl = useIntl()
  const data = useStaticQuery(
    graphql`
      query {
        contentfulLogo {
          logo {
            fluid {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
     }`
  )

  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = await addToMailchimp(email)
    setResult(message)
    Swal.fire({
      title: intl.formatMessage({ id: "newslatter_confirm_title" }),
      text: intl.formatMessage({ id: "newslatter_confirm" }),
      icon: 'success',
      confirmButtonText: intl.formatMessage({ id: "form_submit_back_btn" })
    })
  }

  const handleMailInput = (e) => { setEmail(e.currentTarget.value) }

  return (
    <>

      < footer >
        <article className="mainFooter">
          <section className="footerInfo">
            <section className="footerAbout">
              <figure onContextMenu={(e) => e.preventDefault()} role='presentation'>
                <Img fluid={data.contentfulLogo.logo.fluid} alt="Asasline" title="Asasline" />
              </figure>
              <p>
                {intl.formatMessage({ id: "footerAboutText" })}
              </p>
              <p>{intl.formatMessage({ id: "contactpageCity" })} - {intl.formatMessage({ id: "contactpageCountry" })}</p>
              <ul>
                <li><FontAwesomeIcon icon={faPhoneAlt} /> {intl.formatMessage({ id: "phone_number" })}</li>
                <li><FontAwesomeIcon icon={faEnvelope} /> contact(@)asasline.com</li>
                <li><FontAwesomeIcon icon={faGlobe} />  www.asasline.com</li>
              </ul>
              <ul className="footerScoialNetwork">
                <li>
                  <a href="https://facebook.com/asasline" target='_blank' rel="noreferrer" title="Asasline facebook page" aria-label="Asasline facebook page"><FontAwesomeIcon icon={faFacebookF} /></a>
                </li>
                <li>
                  <a href="https://instagram.com/asasline" target='_blank' rel="noreferrer" title="Asasline instagram page" aria-label="Asasline instagram page"><FontAwesomeIcon icon={faInstagram} /></a>
                </li>
              </ul>
            </section>
            <section className="footerMainMenu">
              <h3>Menu</h3>
              <ul>
                <li>{<Link to="/">{intl.formatMessage({ id: "home_page" })}</Link>}</li>
                <li>{<Link to="/about">{intl.formatMessage({ id: "about_page" })}</Link>}</li>
                <li>{<Link to="/services">{intl.formatMessage({ id: "services_page" })}</Link>}</li>
                <li>{<Link to="/contact">{intl.formatMessage({ id: "contact_page" })}</Link>}</li>
                <li>{<Link to="/quote">{intl.formatMessage({ id: "devis_page" })}</Link>}</li>
                <li className="lastElm">{<Link to="/shipping">{intl.formatMessage({ id: "shipping_page" })}</Link>}</li>
              </ul>

            </section>
            <section className="footerSecondMenu">
              <h3>{intl.formatMessage({ id: "link_page" })}</h3>
              <ul>
                {/* <li>{<AnchorLink title="Batrade secondhand clothes" to="/used-clothes">{intl.formatMessage({ id: "prod_clothes" })}</AnchorLink>}</li> */}

                {/* <li className="lastElm">{<AnchorLink title="Batrade recycling" to="/recycling">{intl.formatMessage({ id: "prod_recycling" })}</AnchorLink>}</li > */}
              </ul >
            </section >
            <section className="footerNewsletter">
              <h3>{intl.formatMessage({ id: "newslaetterText.title" })}</h3>
              <p>{intl.formatMessage({ id: "newslaetterText.text" })}</p>
              <p>{intl.formatMessage({ id: "newslaetterText.callToAction" })}</p>
              <Form method="POST" data-netlify="true" name="newsletterForm" onSubmit={(e) => handleSubmit(e, email)}>
                <input type="hidden" name="form-name" value="newsletterForm" />
                <InputGroup>
                  <FormControl
                    required
                    name='email'
                    type="email"
                    placeholder="Email*"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={handleMailInput}
                  />
                  <InputGroup.Append>
                    <Button variant="outline-secondary" type="submit"><FontAwesomeIcon icon={faPaperPlane} /></Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </section>
          </section >
        </article >
        <section className="reservedRights">
          © {new Date().getFullYear()}, ASASLINE S.R.L . All Rights Reserved.
        </section>

      </footer >

    </>
  )
}


export default injectIntl(Footer)


