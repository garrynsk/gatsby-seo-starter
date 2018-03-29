import * as React from "react"
import Link from "gatsby-link"
import * as kebabCase from "lodash/kebabCase"

export default ({ tags }) => (
  <div>
    {tags.map(tag => {
      return (
        <Link className="tag" to={`/tags/${kebabCase(tag)}/`}>
          {tag}
        </Link>
      )
    })}
  </div>
)
