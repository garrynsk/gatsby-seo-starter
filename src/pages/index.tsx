import * as React from "react"
import SEO from "../components/seo/seo"
import PostsList from "../components/postsList/postsList"
import styled from "styled-components"

const BlogPosts = styled.div``

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  const page = {
    titleAlt: "Main page of the Scala blog VictoriaZ",
    url: data.site.siteMetadata.siteUrl + "",
    title: "Home page - " + data.site.siteMetadata.siteTitle,
    image: data.site.siteMetadata.siteLogo,
    main: true,
    description: `It is a blog about Scala language.`,
    keywords: "Scala, blog, articles, programming",
  }

  return (
    <BlogPosts>
      <SEO page = {page} article = {null} />

      <PostsList posts = {posts} />
    </BlogPosts>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteUrl
        siteTitle
        siteLogo
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
