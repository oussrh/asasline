import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Img from "gatsby-image"


import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css'

import { injectIntl, useIntl } from "gatsby-plugin-intl"

import { renderRichText } from "gatsby-source-contentful/rich-text"


const AboutPage = () => {
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
          seoTitle
          seoDescription
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

    let seoTitle, seoDescription
    data.allContentfulAboutPage.nodes.filter(artl => artl.node_locale === intl.locale && Number(artl.order) === 1).map(seo => {
        seoTitle = seo.seoTitle
        seoDescription = seo.seoDescription
    })

    return (

        < Layout >

            <SEO
                title={seoTitle}
                description={seoDescription}
            />
            <article className="aboutPageContainer">


                {
                    data.allContentfulAboutPage.nodes.filter(artl => artl.node_locale === intl.locale).map(artl => {
                        if (Number(artl.order) % 2 !== 0) {
                            return (
                                <section className="aboutRow">

                                    <section key={artl.id}>
                                        <h1>{artl.title}</h1>
                                        {renderRichText(artl.aboutText)}
                                    </section >

                                    <figure onContextMenu={(e) => e.preventDefault()} role='presentation'>

                                        <Img fluid={artl.aboutPicture.fluid} alt={artl.title} title={artl.title} />

                                    </figure>

                                </section>
                            )
                        }
                        else {
                            return (
                                <section className="aboutRow aboutRowRevers" >

                                    <figure onContextMenu={(e) => e.preventDefault()} role='presentation'>
                                        <Img fluid={artl.aboutPicture.fluid} alt={artl.title} title={artl.title} />
                                    </figure>
                                    <section key={artl.id} className="txtRightImg">
                                        <h1>{artl.title}</h1>
                                        {renderRichText(artl.aboutText)}
                                    </section >

                                </section>
                            )
                        }
                    })
                }

            </article>
        </Layout >
    )
}

export default injectIntl(AboutPage)
