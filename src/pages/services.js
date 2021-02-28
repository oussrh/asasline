import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import ServiceCard from "../components/serviceCard/serviceCard"


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
            <article className="servicePageContainer">

                {
                    data.allContentfulServicesPage.nodes.filter(artl => artl.node_locale === intl.locale).map(artl => {

                        return (
                            <section className="serviceGeneralInfoRow">

                                <section key={artl.id}>
                                    <h1>{artl.title}</h1>
                                    {renderRichText(artl.servicesText)}
                                </section >
                                <ServiceCard />
                            </section>
                        )


                    })
                }

            </article>
        </Layout >
    )
}

export default injectIntl(ServicesPage)
