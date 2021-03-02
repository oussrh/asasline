import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Carousel from "../components/carousel/carousel"
import GeneralInfo from "../components/generalInfo/genralInfo"
import InfoAndImage from "../components/infoAndImage/infoAndImage"
import ContactForm from "../components/contactForm/contactForm"
import FixedDiv from "../components/fixDivShortcut/fixDivShortcut"

import { useIntl } from "gatsby-plugin-intl"

const IndexPage = () => {
  const intl = useIntl()
  const data = useStaticQuery(
    graphql`
    query {
      allContentfulHomepageSeo {
        nodes {
          seoTitle
          seoDescription
          node_locale
        }
      }
    }`)

  let seoTitle, seoDescription
  data.allContentfulHomepageSeo.nodes.filter(artl => artl.node_locale === intl.locale).map(seo => {
    seoTitle = seo.seoTitle
    seoDescription = seo.seoDescription
  })

  return (
    <Layout>
      <SEO
        title={seoTitle}
        description={seoDescription} />
      <Carousel />
      <GeneralInfo />
      <InfoAndImage />
      <ContactForm />
      <FixedDiv />
    </Layout>
  )

}

export default IndexPage
