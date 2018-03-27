import * as React from "react"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import Sidebar from "../components/sidebar/sidebar"
import "./index.css"

export default ({ children, data }) => {
  const metaData = data.site.siteMetadata
  return (
    <div className="default">
      <Header title={metaData.siteTitle} blogLink={metaData.siteUrl} />
      <Sidebar
        userName={metaData.userName}
        userMoto={metaData.userMoto}
        userEmail={metaData.userEmail}
        algoliaAppId={metaData.algoliaAppId}
        algoliaApiKey={metaData.algoliaApiKey}
      />

      <div className="content">{children()}</div>
      <Footer
        facebookUrl={metaData.facebookUrl}
        twitterUrl={metaData.twitterUrl}
        linkednUrl={metaData.linkednUrl}
        githubUrl={metaData.githubUrl}
      />
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
        year
        algoliaAppId
        algoliaApiKey
        githubUrl
        facebookUrl
        twitterUrl
        linkednUrl
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
