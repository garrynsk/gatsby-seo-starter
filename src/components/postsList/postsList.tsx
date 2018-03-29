import * as React from "react"
import Link from "gatsby-link"
import Img from "gatsby-image"
import * as kebabCase from "lodash/kebabCase"
import TagsLine from "../tagsLine/tagsLine"

export default ({ posts }) => (
  <div className="blog-posts">
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

          <TagsLine tags={post.frontmatter.tags} />

          <p className="excerpt">{post.excerpt}</p>
        </div>
      ))}
  </div>
)
