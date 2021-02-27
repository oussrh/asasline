import { useStaticQuery, graphql } from "gatsby"
import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faCalculator } from '@fortawesome/free-solid-svg-icons'

import Tooltip from 'react-bootstrap/Tooltip'
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import 'bootstrap/dist/css/bootstrap.min.css';
import './fixDivShortcut.css'

import { injectIntl, Link, FormattedMessage, changeLocale, useIntl } from "gatsby-plugin-intl"

const FixDivShortcut = () => {

    const intl = useIntl()
    const data = useStaticQuery(
        graphql`
      query {
        contentfulLogo {
          logo {
            fluid {
              src
            }
          }
        }
     }`
    )
    const src = data.contentfulLogo.logo.fluid.src

    return (
        <>
            <section className="fixDiv">
                <ul className="infoList">
                    <Link to="/quote" >
                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    <strong>Get a quote online</strong>.
                                </Tooltip>
                            }
                        >
                            <li className="squareBtn" title="Get a quote online">
                                <FontAwesomeIcon icon={faCalculator} style={{ fontSize: "30px" }} />
                            </li>
                        </OverlayTrigger>
                    </Link>
                    <Link to="/contact">
                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    <strong>Contact us</strong>.
                                </Tooltip>
                            }
                        >
                            <li className="squareBtn">
                                <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "30px" }} />
                            </li>
                        </OverlayTrigger>
                    </Link>
                </ul>
            </section>


        </>
    )
}

export default injectIntl(FixDivShortcut)
