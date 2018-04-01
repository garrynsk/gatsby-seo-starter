import * as React from "react"
import Link from "gatsby-link"

import TagsLine from "../tagsLine/tagsLine"
import styled from "styled-components"
import Typography from "material-ui/Typography"

const PostHeader = styled.div``

const Title = styled(Typography)`
  padding-left: 0;
`

const ResizedText = styled.span`
  @media (max-width: 1000px) {
    font-size: 50%;
    line-height: 0.5em;
    
  }
`
const ResizedDate = styled.span`
  @media (max-width: 1000px) {
    font-size: 70%;
    line-height: 1em;
    
  }
`


const Date = styled(Typography)`
  font-style: italic;
`

export default ({ post }) => (
  <PostHeader>


    <Title variant="display1">
      <Link to={post.frontmatter.path}>
        <ResizedText>{post.frontmatter.title}</ResizedText>
      </Link>
    </Title>

    <Date variant="caption"><ResizedDate>{post.frontmatter.date}</ResizedDate></Date>

    <TagsLine tags={post.frontmatter.tags} />
  </PostHeader>
)
