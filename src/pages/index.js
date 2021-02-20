import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Carousel from "../components/carousel/carousel"
// import HomepageAbout from "../components/homepageAbout"
// import OurProduct from "../components/ourProduct"
import ContactForm from "../components/contactForm/contactForm"
// import Qualities from "../components/ourQualities"

import { useIntl } from "gatsby-plugin-intl"

const IndexPage = () => {
  const intl = useIntl()
  return (
    <Layout>
      <SEO
        title={intl.formatMessage({ id: "homePage_seo_title" })}
        description={intl.formatMessage({ id: "homePage_seo_description" })} />
      <Carousel />
      <ContactForm />
    </Layout>
  )

}

export default IndexPage
