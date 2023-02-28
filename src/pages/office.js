import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { AnchorLink } from 'gatsby-plugin-anchor-links'
// import {
// 	useQueryParam,
// 	StringParam,
// 	QueryParamProvider,
// } from 'use-query-params'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faFax } from '@fortawesome/free-solid-svg-icons/faFax'

import Layout from '../components/layout'
import SEO from '../components/seo'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/style.css'

import { injectIntl, useIntl } from 'gatsby-plugin-intl'

import { renderRichText } from 'gatsby-source-contentful/rich-text'

const Office = (props) => {
	const query = new URLSearchParams(props.location.search)
	const q = query.get('q')

	const intl = useIntl()

	const data = useStaticQuery(
		graphql`
			query {
				allContentfulOfficePage {
					nodes {
						id
						title
						node_locale
						seoTitle
						seoDescription
						description {
							raw
						}
					}
				}
				allContentfulOffice {
					nodes {
						id
						name
						node_locale
						city
						anchor
						country
						image {
							fluid {
								...GatsbyContentfulFluid_withWebp
							}
						}
						email {
							contact
							email
						}
						adress {
							adress
						}
					}
				}
			}
		`
	)

	const offices = data.allContentfulOffice.nodes.filter(
		(office) => office.node_locale === intl.locale
	)
	const officePages = data.allContentfulOfficePage.nodes.filter(
		(page) => page.node_locale === intl.locale
	)

	const { seoTitle, seoDescription } = officePages[0]

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<Layout>
			<SEO title={seoTitle} description={seoDescription} />

			<section className="officeContactCardList">
				{offices.map((office) => {
					if (office.anchor === q)
						return (
							<>
								<Img
									onContextMenu={(e) => e.preventDefault()}
									key={office.id}
									fluid={office.image?.fluid}
									title={office.name}
									alt={office.name}
									className="officeContactImage"
								/>

								<article key={office.id} className="officeContactCard">
									<h5>{office.name}</h5>
									<p className="officeContactAddress">
										<FontAwesomeIcon icon={faBuilding} /> {office.adress.adress}
									</p>
									<p className="officeContactCountry">
										{office.city} / {office.country}
									</p>
									<div className="officeContactInfo" id={office.anchor}>
										<h6>Contact info :</h6>
										<ul>
											{office.email.map(({ contact, email }, index) => (
												<li key={index}>
													<FontAwesomeIcon icon={faEnvelope} />{' '}
													{contact && <label>{contact} -</label>}{' '}
													<a href={`mailto:${email}`}>{email}</a>
												</li>
											))}
										</ul>
									</div>
								</article>
							</>
						)
				})}
			</section>
		</Layout>
	)
}

export default injectIntl(Office)
