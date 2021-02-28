import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

import { injectIntl, useIntl } from "gatsby-plugin-intl"

import { renderRichText } from "gatsby-source-contentful/rich-text"

import './infoAndImage.css'


const InfoAndImage = () => {
    const intl = useIntl()

    const data = useStaticQuery(
        graphql`
    query {
        allContentfulInfoAndImage(sort: {fields: order}) {
            nodes {
                id
                imageTitle
                title
                node_locale
                smallText {
                    raw
                }
                image {
                    fluid {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
                order
            }
        }
    }`)

    return (

        <section className="infoAndImgContainer">
            {
                data.allContentfulInfoAndImage.nodes.filter(artl => artl.node_locale === intl.locale).map(artl => {
                    if (Number(artl.order) % 2 !== 0) {
                        return (
                            <section className="infoAndImgRow">
                                <section className="infoAndImgTdImg" onContextMenu={(e) => e.preventDefault()} role='presentation'>
                                    <Img fluid={artl.image.fluid} alt={artl.imageTitle} title={artl.imageTitle} />
                                </section>
                                <section key={artl.id} className="infoAndImgTdTxt">
                                    <div>
                                        <h1>{artl.title}</h1>
                                        {renderRichText(artl.smallText)}
                                    </div>
                                </section >


                            </section>
                        )
                    }
                    else {
                        return (
                            <section className="infoAndImgRow infoAndImgRowReverse">


                                <section key={artl.id} className="infoAndImgTdTxt">
                                    <div>
                                        <h1>{artl.title}</h1>
                                        {renderRichText(artl.smallText)}
                                    </div>
                                </section >
                                <section className="infoAndImgTdImg" onContextMenu={(e) => e.preventDefault()} role='presentation'>
                                    <Img fluid={artl.image.fluid} alt={artl.imageTitle} title={artl.imageTitle} />
                                </section>

                            </section>

                        )
                    }
                })
            }
        </section>
    )
}

export default injectIntl(InfoAndImage)
