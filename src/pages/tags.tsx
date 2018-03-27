import * as React from "react"

import * as kebabCase from "lodash/kebabCase"
import Helmet from "react-helmet"
import Link from "gatsby-link"
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List"
const TagsPage = ({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { siteTitle } } },
}) => (
  <div>
    <Helmet title={siteTitle} />
    <div>
      <h1>Tags</h1>
      <List component="nav">
        {group.map(tag => (
          <ListItem button key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              <ListItemText primary={`${tag.fieldValue} (${tag.totalCount})`} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  </div>
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
