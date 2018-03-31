import * as React from "react"
import * as kebabCase from "lodash/kebabCase"
import Helmet from "react-helmet"
import Link from "gatsby-link"
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List"
import styled from "styled-components"
import Typography from "material-ui/Typography"

const Tags = styled.div``

const Title = styled(Typography)``

const TagsPage = ({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { siteTitle } } },
}) => (
  <Tags>
    <Helmet title={siteTitle} />
    <Title variant="display2">Tags</Title>
    <List component="nav">
      {group.map(tag => (
        <ListItem button key={tag.fieldValue}>
          <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
            <ListItemText primary={`${tag.fieldValue} (${tag.totalCount})`} />
          </Link>
        </ListItem>
      ))}
    </List>
  </Tags>
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
