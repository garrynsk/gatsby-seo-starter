import * as React from "react"
import Link from "gatsby-link"
import Img from "gatsby-image"
import * as kebabCase from "lodash/kebabCase"
import TagsLine from "../tagsLine/tagsLine"
import styled from "styled-components"
import Typography from "material-ui/Typography"
import PostHeader from "../postHeader/postHeader"
import Image from "../image/image"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50% ;
  grid-gap: 10px;
  margin-bottom: 6%;

  @media (max-width: 1500px) {
    grid-template-columns: 60% 40%;
  
  }

  @media (max-width: 600px) {
    grid-template-columns: 100%;
  
  }
`

const Box = styled.div`
  border-radius: 5px;
  padding: 20px;
  @media (max-width: 1000px) {
    padding: 0%;
  }
`


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
const ResizedText = styled.span`
@media (max-width: 1000px) {
  font-size: 80%;
  line-height: 1.3em;
}
`
export default ({ posts }) => (
  <BlogPosts>
    {posts
      .filter(post => post.node.frontmatter.title.length > 0)
      .map(({ node: post }) => (
        <BlogPostsPreview key={post.id}>
          <PostHeader post={post} />
          <Wrapper><Box><Excerpt variant="body2"><ResizedText>{post.excerpt}</ResizedText></Excerpt></Box><Box>
          <Image featuredImage = {post.frontmatter.featuredImage}/></Box></Wrapper>
        </BlogPostsPreview>
      ))}
  </BlogPosts>
)
