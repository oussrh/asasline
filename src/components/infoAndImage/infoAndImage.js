import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

import { injectIntl, useIntl } from "gatsby-plugin-intl"

import { renderRichText } from "gatsby-source-contentful/rich-text"

import './InfoAndImage.css'


const InfoAndImage = () => {
    const intl = useIntl()

    const data = useStaticQuery(
        graphql`
    query {
    allContentfulAboutPage {
        nodes {
          id
          order
          title
          node_locale
          aboutPicture{
            fluid{
              ...GatsbyContentfulFluid_withWebp
            }
          }
          aboutText {
            raw
            }
        }
      }
    }`)

    return (

        <section className="infoAndImgContainer">
            {
                data.allContentfulAboutPage.nodes.filter(artl => artl.node_locale === intl.locale).map(artl => {
                    if (Number(artl.order) % 2 !== 0) {
                        return (
                            <section className="infoAndImgRow ">


                                <section key={artl.id} className="infoAndImgTdTxt">
                                    <h1>{artl.title}</h1>
                                    {renderRichText(artl.aboutText)}
                                </section >
                                <section className="infoAndImgTdImg" onContextMenu={(e) => e.preventDefault()} role='presentation'>
                                    <Img fluid={artl.aboutPicture.fluid} alt={artl.title} title={artl.title} />
                                </section>

                            </section>
                        )
                    }
                    else {
                        return (
                            <section className="infoAndImgRow infoAndImgRowReverse">

                                <section className="infoAndImgTdImg" onContextMenu={(e) => e.preventDefault()} role='presentation'>
                                    <Img fluid={artl.aboutPicture.fluid} alt={artl.title} title={artl.title} />
                                </section>

                                <section key={artl.id} className="infoAndImgTdTxt">
                                    <h1>{artl.title}</h1>
                                    {renderRichText(artl.aboutText)}
                                </section >

                            </section>

                        )
                    }
                })
            }
        </section>
    )
}

export default injectIntl(InfoAndImage)
