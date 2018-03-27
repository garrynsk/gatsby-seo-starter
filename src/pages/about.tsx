import * as React from "react"
import Link from "gatsby-link"
import "./about.css"
import Helmet from "react-helmet"
import SEO from "../components/seo/seo"
import * as config from "../../config"

export default () => {
  return (
    <div className="about">
      <Helmet title={config.siteTitle} />
      <SEO />
      I am a scala developer, who loves functional programming (including
      category theory, cats, scalaz etc.). I want to build something special,
      that's why I develop a project named Mutator. By the way, I'm fond of elm.
    </div>
  )
}
