import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css'

import { injectIntl, useIntl } from "gatsby-plugin-intl"

import { renderRichText } from "gatsby-source-contentful/rich-text"


const PrivacyPage = () => {
    const intl = useIntl()

    const data = useStaticQuery(
        graphql`
    query {
        allContentfulPrivacyPolicy {
        nodes {
          id
          title
          node_locale
          seoTitle
          seoDescription
          privacyText {
            raw
            }
        }
      }
    }`)

    let seoTitle, seoDescription
    data.allContentfulPrivacyPolicy.nodes.filter(artl => artl.node_locale === intl.locale).map(seo => {
        seoTitle = seo.seoTitle
        seoDescription = seo.seoDescription
    })

    return (

        < Layout >

            <SEO
                title={seoTitle}
                description={seoDescription}
            />
            <article className="privacyPageContainer">

                {
                    data.allContentfulPrivacyPolicy.nodes.filter(artl => artl.node_locale === intl.locale).map(artl => {

                        return (
                            <section className="privacyRow">

                                <section key={artl.id}>
                                    <h1>{artl.title}</h1>
                                    {renderRichText(artl.privacyText)}
                                </section >
                            </section>
                        )


                    })
                }

            </article>
        </Layout >
    )
}

export default injectIntl(PrivacyPage)
