import * as React from "react"

import TagsLine from "../tagsLine/tagsLine"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink, PostTitle, Date } from "../../theme"

const PostHeader = styled.div``

export default ({ post }) => (
  <ThemeProvider theme={theme} >
  <PostHeader>
    <PostTitle>
      <GatsbyLink to={post.frontmatter.path}>
        {post.frontmatter.title}
      </GatsbyLink>
    </PostTitle>

    <Date>{post.frontmatter.date}</Date>

    <TagsLine tags={post.frontmatter.tags} />
  </PostHeader>
  </ThemeProvider>
)
