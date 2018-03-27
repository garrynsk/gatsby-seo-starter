import * as React from "react"

import * as kebabCase from "lodash/kebabCase"
import Helmet from "react-helmet"
import Link from "gatsby-link"

const TagsPage = ({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { siteTitle } } },
}) => (
  <div>
    <Helmet title={siteTitle} />
    <div>
      <h1>Tags</h1>
      <ul>
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
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
