import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { injectIntl, useIntl } from "gatsby-plugin-intl"

import { renderRichText } from "gatsby-source-contentful/rich-text"

import './genralInfo.css'


const GeneralInfo = () => {
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
          aboutText {
            raw
            }
        }
      }
    }`)

    return (

        <section className="GeneralInfo">

        </section>
    )
}

export default injectIntl(GeneralInfo)
