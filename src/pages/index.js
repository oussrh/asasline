import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Carousel from "../components/carousel/carousel"
import GeneralInfo from "../components/generalInfo/genralInfo"
import InfoAndImage from "../components/infoAndImage/infoAndImage"
import ContactForm from "../components/contactForm/contactForm"

import { useIntl } from "gatsby-plugin-intl"

const IndexPage = () => {
  const intl = useIntl()
  return (
    <Layout>
      <SEO
        title={intl.formatMessage({ id: "homePage_seo_title" })}
        description={intl.formatMessage({ id: "homePage_seo_description" })} />
      <Carousel />
      <GeneralInfo />
      <InfoAndImage />
      <ContactForm />
    </Layout>
  )

}

export default IndexPage
