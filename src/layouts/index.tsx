import * as React from "react"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import Sidebar from "../components/sidebar/sidebar"
import "./index.css"
import Helmet from "react-helmet"
import "./scrollblur"

export default ({ children, data }) => {
  const metaData = data.site.siteMetadata
  return (
    <div className="default">
      <Helmet title={metaData.siteTitle} />

      <Header title={metaData.siteTitle} blogLink={metaData.siteUrl} />
      <Sidebar
        userName={metaData.userName}
        userMoto={metaData.userMoto}
        userEmail={metaData.userEmail}
        algoliaAppId={metaData.algoliaAppId}
        algoliaApiKey={metaData.algoliaApiKey}
        avatar={metaData.avatar}
      />

      <div className="content">{children()}</div>
      <Footer socialLinks={metaData.socialLinks} />
    </div>
  )
}

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        siteUrl
        siteTitle
        userEmail
        userName
        userMoto
        avatar
        year
        algoliaAppId
        algoliaApiKey
        socialLinks {
          label
          url
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          headings {
            depth
            value
          }
          frontmatter {
            title
            tags
            date(formatString: "MMMM DD, YYYY")
            path
            featuredImage {
              name
              childImageSharp {
                sizes(maxWidth: 1900) {
                  src
                  srcSet
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`
