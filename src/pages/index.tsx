import * as React from "react"
import "./index.css"
import Helmet from "react-helmet"
import SEO from "../components/seo/seo"
import * as config from "../../config"
import PostsList from "../components/postsList/postsList"
import styled from "styled-components"
import Typography from 'material-ui/Typography';
import Reboot from 'material-ui/Reboot';

const BlogPosts = styled.div`

`

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <BlogPosts>
      <Helmet title={config.siteTitle} />

      <SEO postEdges={data.allMarkdownRemark.edges} />

      <PostsList posts={posts} />

    </BlogPosts>
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
