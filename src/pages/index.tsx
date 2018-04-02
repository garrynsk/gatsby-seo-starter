import * as React from "react"
import Helmet from "react-helmet"
import SEO from "../components/seo/seo"
import PostsList from "../components/postsList/postsList"
import styled from "styled-components"

const BlogPosts = styled.div``

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <BlogPosts>
      <Helmet title={`Home page - ${data.site.siteMetadata.siteTitle}`} >
    </Helmet>

      <SEO postEdges={data.allMarkdownRemark.edges} />

      <PostsList posts={posts} />
    </BlogPosts>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteUrl
        siteTitle
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          shortExcerpt: excerpt(pruneLength: 70)
          longExcerpt: excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            tags
            date(formatString: "MMMM DD, YYYY")
            path
            featuredImage {
              name
              childImageSharp {
                sizes(maxWidth: 900) {
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
