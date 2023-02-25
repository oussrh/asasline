import { useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import 'bootstrap/dist/css/bootstrap.min.css'
import './header.css'

import english from '../../images/english.png'
import francais from '../../images/francais.png'

import {
	injectIntl,
	Link,
	FormattedMessage,
	changeLocale,
	useIntl,
} from 'gatsby-plugin-intl'

const Header = ({ siteTitle }) => {
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
			}
		`
	)
	const src = data.contentfulLogo.logo.fluid.src

	return (
		<>
			<header className="headerInfo">
				<ul className="infoList">
					{/* <li><FontAwesomeIcon icon={faPhoneAlt} style={{ fontSize: "16px" }} />&nbsp;{intl.formatMessage({ id: "phone_number" })}</li>
          <li><FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "16px" }} />&nbsp;contact(@)asasline.com</li>
          <li><FontAwesomeIcon icon={faClock} style={{ fontSize: "16px" }} />&nbsp;{intl.formatMessage({ id: "opning_days" })}</li> */}
				</ul>
				<ul className="socialNet">
					<li>
						<a
							href="https://facebook.com/asas.lines"
							target="_blank"
							rel="noreferrer"
						>
							<FontAwesomeIcon
								icon={faFacebookF}
								style={{ fontSize: '16px' }}
							/>
						</a>
					</li>
					<li>
						<a
							href="https://instagram.com/asas.line"
							target="_blank"
							rel="noreferrer"
						>
							<FontAwesomeIcon
								icon={faInstagram}
								style={{ fontSize: '16px' }}
							/>
						</a>
					</li>
				</ul>
			</header>
			<Navbar sticky="top" variant="dark" expand="lg" className="Navbar">
				<Navbar.Brand
					as="div"
					href="#home"
					onContextMenu={(e) => e.preventDefault()}
				>
					<AniLink
						cover
						direction="down"
						duration={1}
						to={intl.locale === 'en' ? '/' : '/fr'}
						bg="#f7af3d"
					>
						<img src={src} alt="Asasline" className="navLogo" />
					</AniLink>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="m-auto">
						<Nav.Link as={Link} to="/">
							<FormattedMessage id="home_page" />
						</Nav.Link>
						<Nav.Link as={Link} to="/about">
							<FormattedMessage id="about_page" />
						</Nav.Link>
						<Nav.Link as={Link} to="/services">
							<FormattedMessage id="services_page" />
						</Nav.Link>
						<Nav.Link as={Link} to="/contact">
							<FormattedMessage id="contact_page" />
						</Nav.Link>
						<Nav.Link as={Link} to="/quote">
							<FormattedMessage id="devis_page" />
						</Nav.Link>
					</Nav>

					<Nav.Link onClick={() => changeLocale('en')}>
						<img
							src={english}
							alt="AsasLine english page"
							title="AsasLine english page"
						/>
					</Nav.Link>
					<Nav.Link onClick={() => changeLocale('fr')}>
						<img
							src={francais}
							alt="AsasLine french page"
							title="AsasLine french page"
						/>
					</Nav.Link>
				</Navbar.Collapse>
			</Navbar>
		</>
	)
}

Header.propTypes = {
	siteTitle: PropTypes.string,
}

Header.defaultProps = {
	siteTitle: ``,
}

export default injectIntl(Header)
