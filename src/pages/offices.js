import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFax } from '@fortawesome/free-solid-svg-icons'
import {
	ComposableMap,
	Geographies,
	Geography,
	Marker,
} from 'react-simple-maps'
import Layout from '../components/layout'
import SEO from '../components/seo'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/style.css'

import { injectIntl, useIntl } from 'gatsby-plugin-intl'

import { renderRichText } from 'gatsby-source-contentful/rich-text'

const geoUrl =
	'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'

const Offices = () => {
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
						coordinates
						zone
						offest
						country

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

	// const markers = [
	// 	{
	// 		markerOffset: 15,
	// 		name: 'Istanbul',
	// 		coordinates: [28.9784, 41.0082],
	// 	},
	// 	{
	// 		markerOffset: 15,
	// 		name: 'Dubai',
	// 		coordinates: [55.2708, 25.2048],
	// 	},
	// 	{
	// 		markerOffset: 15,
	// 		name: 'Beirut',
	// 		coordinates: [35.4944, 33.8938],
	// 	},
	// 	{
	// 		markerOffset: 15,
	// 		name: 'Port-Sudan',
	// 		coordinates: [37.2394, 19.5773],
	// 	},
	// 	{
	// 		markerOffset: 15,
	// 		name: 'Aqaba',
	// 		coordinates: [35.0023, 29.5329],
	// 	},
	// 	{
	// 		markerOffset: 15,
	// 		name: 'Latakia',
	// 		coordinates: [35.7836, 35.5326],
	// 	},
	// 	{
	// 		markerOffset: 15,
	// 		name: 'Jeddah',
	// 		coordinates: [39.2192, 21.4858],
	// 	},
	// 	{
	// 		markerOffset: -15,
	// 		name: 'Gaziantep',
	// 		coordinates: [37.0675, 37.3833],
	// 	},
	// 	{
	// 		markerOffset: -15,
	// 		name: 'Iskenderun',
	// 		coordinates: [36.1048, 36.147],
	// 	},
	// 	{
	// 		markerOffset: 15,
	// 		name: 'Al-Adabiya',
	// 		coordinates: [32.211, 29.472],
	// 	},
	// ]

	const middelEastZone = data.allContentfulOffice.nodes
		.filter(
			(office) =>
				office.zone === 'Middle-East' && office.node_locale === intl.locale
		)
		.map((office) => ({
			markerOffset: office.offest,
			name: office.anchor,
			coordinates: JSON.parse(office.coordinates),
		}))

	const europeZone = data.allContentfulOffice.nodes
		.filter(
			(office) => office.zone === 'Europe' && office.node_locale === intl.locale
		)
		.map((office) => ({
			markerOffset: office.offest,
			name: office.anchor,
			coordinates: JSON.parse(office.coordinates),
		}))

	let seoTitle, seoDescription
	data.allContentfulOfficePage.nodes
		.filter((artl) => artl.node_locale === intl.locale)
		.map((seo) => {
			seoTitle = seo.seoTitle
			seoDescription = seo.seoDescription
		})

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<Layout>
			<SEO title={seoTitle} description={seoDescription} />

			<article className="OfficesPageContainer">
				{data.allContentfulOfficePage.nodes
					.filter((artl) => artl.node_locale === intl.locale)
					.map((artl) => {
						return (
							<section className="privacyRow">
								<section key={artl.id}>
									<h1 id="pageTitle">{artl.title}</h1>
									{renderRichText(artl.description)}
								</section>
							</section>
						)
					})}
			</article>
			<section className="mapContainer">
				<div className="regioMap">
					<h2>Europe</h2>
					<ComposableMap
						projection="geoAzimuthalEqualArea"
						projectionConfig={{
							rotate: [-10.0, -52.0, 0],
							center: [-5, -3],
							scale: 1800,
						}}
					>
						<Geographies geography={geoUrl}>
							{({ geographies }) =>
								geographies.map((geo) => (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										fill="#F0F0F0"
										style={{
											default: { outline: 'none' },
											hover: { outline: 'none' },
											pressed: { outline: 'none' },
										}}
									/>
								))
							}
						</Geographies>
						{europeZone.map(({ name, coordinates, markerOffset }) => (
							<a href={'/office?q=' + name}>
								<Marker
									key={name}
									coordinates={coordinates}
									className="mapMarker"
								>
									<circle r={6} fill="#F00" />
									<text
										className="citiesName"
										textAnchor="middle"
										y={markerOffset + 4}
									>
										{name}
									</text>
								</Marker>
							</a>
						))}
					</ComposableMap>
				</div>
				<div className="regioMap">
					<h2>Middel-east</h2>
					<ComposableMap
						projection="geoAzimuthalEqualArea"
						projectionConfig={{
							rotate: [-39, -30, 0],
							scale: 1400,
						}}
					>
						<Geographies geography={geoUrl}>
							{({ geographies }) =>
								geographies.map((geo) => (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										style={{
											default: { outline: 'none' },
											hover: { outline: 'none' },
											pressed: { outline: 'none' },
										}}
										fill="#DDD"
										stroke="#FFF"
									/>
								))
							}
						</Geographies>
						{middelEastZone.map(({ name, coordinates, markerOffset }) => (
							<a href={'/office?q=' + name}>
								<Marker
									className="mapMarker"
									key={name}
									coordinates={coordinates}
									on
								>
									<circle r={6} fill="#F00" />
									<text
										className="citiesName"
										textAnchor="middle"
										y={markerOffset + 4}
									>
										{name}
									</text>
								</Marker>
							</a>
						))}
					</ComposableMap>
				</div>
			</section>
			{/* <section className="officeContactCardList">
				{data.allContentfulOffice.nodes
					.filter((office) => office.node_locale === intl.locale)
					.map((office) => {
						return (
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
										{office.email.map((elm) => (
											<li>
												<FontAwesomeIcon icon={faEnvelope} />{' '}
												{elm.contact && <label>{elm.contact} -</label>}{' '}
												<a href={`mailto:${elm.email}`}>{elm.email}</a>
											</li>
										))}
									</ul>
								</div>
							</article>
						)
					})}
			</section> */}
		</Layout>
	)
}

export default injectIntl(Offices)
