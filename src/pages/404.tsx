import * as React from "react"
import SEO from "../components/seo/seo"

export default ({data}) => {
  
  const page = {
    titleAlt: "Error page of the Scala blog - VictoriaZ",
    url: data.site.siteMetadata.siteUrl + "/404",
    title: "Error page - " + data.site.siteMetadata.siteTitle,
    image: data.site.siteMetadata.siteLogo,
    main: false,
    description: "Error page",
    keywords: "error",
  }

  return (
  <div>
    <SEO page = {page} article = {null}/ >
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </div>
)}


export const pageQuery = graphql`
  query ErrorPageQuery {
    site {
      siteMetadata {
        siteUrl
        siteTitle
        siteLogo
      }
    }
  }`
