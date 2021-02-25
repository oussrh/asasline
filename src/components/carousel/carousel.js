import React, { useState } from "react"
import Carousel from 'react-bootstrap/Carousel'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import './carousel.css'

import { useIntl, injectIntl } from "gatsby-plugin-intl"

const CarouselComp = () => {
    const intl = useIntl()

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const data = useStaticQuery(
        graphql`
        query {
        allContentfulCarousel {
            nodes {
                id
                title
                node_locale
                carouselImage {
                    fluid(maxWidth:1200) {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
            }
            }
    }`)

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} controls={false} indicators={false} className="carousel">
            {
                data.allContentfulCarousel.nodes.filter(lang => lang.node_locale === intl.locale).map(slide => {

                    return (
                        <Carousel.Item key={slide.id} className="carouselItem" onContextMenu={(e) => e.preventDefault()}>
                            <Img
                                key={slide.id}
                                fluid={slide.carouselImage.fluid}
                                alt={slide.title ? slide.title : null}
                                title={slide.title ? slide.title : null}
                            />
                            <Carousel.Caption className="SlideCaption">
                                {slide.title ? slide.title : null}
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })
            }

        </Carousel>
    )
}


export default injectIntl(CarouselComp)
