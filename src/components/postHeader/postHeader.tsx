import * as React from "react"
import Link from "gatsby-link"

import TagsLine from "../tagsLine/tagsLine"
import styled from "styled-components"
import Typography from "material-ui/Typography"

const PostHeader = styled.div``

const Title = styled(Typography)`
  padding-left: 0;
`

const ResizedTitle = styled.span`
  @media (max-width: 1000px) {
    font-size: 60%;
  }
`

const Date = styled(Typography)`
  font-style: italic;
`

export default ({ post }) => (
  <PostHeader>


    <Title variant="display1">
      <Link to={post.frontmatter.path}>
        <ResizedTitle>{post.frontmatter.title}</ResizedTitle>
      </Link>
    </Title>

    <Date variant="caption">{post.frontmatter.date}</Date>

    <TagsLine tags={post.frontmatter.tags} />
  </PostHeader>
)
