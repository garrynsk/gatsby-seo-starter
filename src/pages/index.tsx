import * as React from "react"
import "./index.css"
import Helmet from "react-helmet"
import SEO from "../components/seo/seo"
import * as config from "../../config"
import PostsList from "../components/postsList/postsList"

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <div className="blog-posts">
      <Helmet title={config.siteTitle} />

      <SEO postEdges={data.allMarkdownRemark.edges} />

      <PostsList posts={posts} />
    </div>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
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
