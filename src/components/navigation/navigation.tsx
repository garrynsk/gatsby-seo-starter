import * as React from "react"
import Link from "gatsby-link"
import "./navigation.css"
import InstantSearch from "../search/instantSearch"

export default ({ algoliaAppId, algoliaApiKey }) => (
  <div className="navigation">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About me</Link>
      </li>
      <li>
        <Link to="/tags">Tags</Link>
      </li>
      <li>
        <Link to="/repositories">Repositories</Link>
      </li>
    </ul>
    <InstantSearch algoliaAppId={algoliaAppId} algoliaApiKey={algoliaApiKey} />
  </div>
)
