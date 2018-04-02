import * as React from "react"
import * as kebabCase from "lodash/kebabCase"
import Button from "material-ui/Button"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink, PostTitle, Date, Tag } from "../../theme"

const TagLine = styled.div``

export default ({ tags }) => (
  <ThemeProvider theme={theme}>
    <TagLine>
      {tags.map(tag => {
        return (
          <GatsbyLink to={`/tags/${kebabCase(tag)}/`}>
            <Button size="small" color="primary">
              <Tag>{tag}</Tag>
            </Button>
          </GatsbyLink>
        )
      })}
    </TagLine>
  </ThemeProvider>
)
