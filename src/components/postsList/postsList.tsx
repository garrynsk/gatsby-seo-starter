import * as React from "react"
import Link from "gatsby-link"
import Img from "gatsby-image"
import * as kebabCase from "lodash/kebabCase"
import TagsLine from "../tagsLine/tagsLine"
import styled from "styled-components"
import Typography from "material-ui/Typography"
import PostHeader from "../postHeader/postHeader"
const BlogPosts = styled.div``
const BlogPostsPreview = styled.div``
const Title = styled(Typography)`
  padding: 4%;
  padding-left: 0;
`

const Date = styled(Typography)`
  font-style: italic;
`

const Excerpt = styled(Typography)`
  padding-bottom: 5%;
  padding-top: 2%;
`

export default ({ posts }) => (
  <BlogPosts>
    {posts
      .filter(post => post.node.frontmatter.title.length > 0)
      .map(({ node: post }) => (
        <BlogPostsPreview key={post.id}>
          <PostHeader post={post} />
          <Excerpt variant="body2">{post.excerpt}</Excerpt>
        </BlogPostsPreview>
      ))}
  </BlogPosts>
)
