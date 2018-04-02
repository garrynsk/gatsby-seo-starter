import * as React from "react"
import * as kebabCase from "lodash/kebabCase"
import Helmet from "react-helmet"
import Link from "gatsby-link"
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink, Title, CasualText } from "../theme"

const Tags = styled.div`
  padding-right: ${(props) => props.theme.grid.paddingRight};

  @media (max-width: ${(props) => props.theme.screen.px1000}) {
    padding-left: ${(props) => props.theme.grid.paddingLeft};
    
  }
`

const TagsPage = ({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { siteTitle } } },
}) => (
  <ThemeProvider theme={theme}>
  <Tags>
    <Helmet title={siteTitle} />
    <Title variant="display2">Tags</Title>
    <List component="nav" >
      {group.map(tag => (
        <ListItem button key={tag.fieldValue}>
          <CasualText><GatsbyLink to={`/tags/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue} ({tag.totalCount})
          </GatsbyLink></CasualText>
        </ListItem>
      ))}
    </List>
  </Tags>
  </ThemeProvider>
)

export default TagsPage

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        siteTitle
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
