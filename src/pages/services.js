import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Img from "gatsby-image"


import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css'

import { injectIntl, useIntl } from "gatsby-plugin-intl"

import { renderRichText } from "gatsby-source-contentful/rich-text"


const ServicesPage = () => {
    const intl = useIntl()

    const data = useStaticQuery(
        graphql`
    query {
        allContentfulServicesPage {
        nodes {
          id
          title
          node_locale
          seoTitle
          seoDescription
          servicesText {
            raw
            }
        }
      }
    }`)

    let seoTitle, seoDescription
    data.allContentfulServicesPage.nodes.filter(artl => artl.node_locale === intl.locale).map(seo => {
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
                    data.allContentfulServicesPage.nodes.filter(artl => artl.node_locale === intl.locale).map(artl => {

                        return (
                            <section className="aboutRow">

                                <section key={artl.id}>
                                    <h1>{artl.title}</h1>
                                    {renderRichText(artl.servicesText)}
                                </section >
                            </section>
                        )


                    })
                }

            </article>
        </Layout >
    )
}

export default injectIntl(ServicesPage)
