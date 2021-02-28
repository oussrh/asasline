import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { injectIntl, useIntl } from "gatsby-plugin-intl"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoad } from '@fortawesome/free-solid-svg-icons'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons'

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
      <section className="qualitiesContainer">
        <div>
          <FontAwesomeIcon icon={faRoad} style={{ fontSize: "16px" }} className="qualityIcon" />
          <span className="qualityTxt">Flexibility</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faHeadset} style={{ fontSize: "16px" }} className="qualityIcon" />
          <span className="qualityTxt">Availability</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faHandsHelping} style={{ fontSize: "16px" }} className="qualityIcon" />
          <span className="qualityTxt">Collaboration</span>
        </div>
      </section>
    </section>
  )
}

export default injectIntl(GeneralInfo)
