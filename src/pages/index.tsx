import * as React from "react"
import Link from "gatsby-link"
import "./index.css"
import "prismjs/themes/prism-tomorrow.css"
import Img from "gatsby-image"
import * as kebabCase from "lodash/kebabCase"
import Helmet from "react-helmet"
import SEO from "../components/seo/seo"
import * as config from "../../config"

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <div className="blog-posts">
      <Helmet title={config.siteTitle} />
      <SEO postEdges={data.allMarkdownRemark.edges} />
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => (
          <div className="blog-post-preview" key={post.id}>
            <Img
              className="image"
              alt={post.frontmatter.featuredImage.name}
              sizes={post.frontmatter.featuredImage.childImageSharp.sizes}
            />
            <h1>
              <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </h1>
            <p className="date">{post.frontmatter.date}</p>
            <div>
              {post.frontmatter.tags.map(tag => {
                return (
                  <Link className="tag" to={`/tags/${kebabCase(tag)}/`}>
                    {tag}
                  </Link>
                )
              })}
            </div>
            <p className="excerpt">{post.excerpt}</p>
          </div>
        ))}
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
