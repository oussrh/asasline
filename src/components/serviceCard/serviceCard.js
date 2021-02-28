import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Card from 'react-bootstrap/Card'
import Img from "gatsby-image"

import { injectIntl, useIntl } from "gatsby-plugin-intl"

import { renderRichText } from "gatsby-source-contentful/rich-text"

import './serviceCard.css'


const InfoAndImage = () => {
    const intl = useIntl()

    const data = useStaticQuery(
        graphql`
    query {
        allContentfulServiceCard(sort: {fields: order}) {
            nodes {
                service
                node_locale
                order
                serviceImage {
                    fluid{
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
                serviceDescription {
                    raw
                }
            }
        }
    }`)

    return (


        <section className="ServicesContainer">
            {
                data.allContentfulServiceCard.nodes.filter(artl => artl.node_locale === intl.locale).map(artl => {

                    return (
                        <Card className="Service" key={artl.id}>
                            <Card.Title>{artl.service}</Card.Title>
                            <Img
                                onContextMenu={(e) => e.preventDefault()}
                                key={artl.id}
                                fluid={artl.serviceImage.fluid}
                                title={artl.service}
                                alt={artl.service}
                            />
                            <Card.Body>

                                <Card.Text as="span">
                                    {renderRichText(artl.serviceDescription)}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </section>
    )
}

export default injectIntl(InfoAndImage)
