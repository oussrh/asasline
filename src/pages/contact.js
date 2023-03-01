import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import '../style/style.css'

import FormComp from '../components/contatPageForm/contactPageForm'

import { injectIntl, useIntl } from 'gatsby-plugin-intl'

const ContactPage = () => {
	const intl = useIntl()
	const data = useStaticQuery(
		graphql`
			query {
				allContentfulContactPage {
					nodes {
						title
						node_locale
						seoTitle
						seoDescription
						contactText {
							raw
						}
					}
				}
			}
		`
	)

	let seoTitle, seoDescription
	data.allContentfulContactPage.nodes
		.filter(
			(artl) => artl.node_locale === intl.locale && Number(artl.order) === 1
		)
		.map((seo) => {
			seoTitle = seo.seoTitle
			seoDescription = seo.seoDescription
		})
	return (
		<Layout>
			<SEO title={seoTitle} description={seoDescription} />
			<FormComp />
		</Layout>
	)
}
export default injectIntl(ContactPage)
