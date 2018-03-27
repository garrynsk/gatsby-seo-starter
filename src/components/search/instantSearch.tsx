import * as React from "react"
import { Component } from "react"
import * as ReactDOM from "react-dom"
import Link from "gatsby-link"
import "./instantSearch.css"
import TextField from "material-ui/TextField"
import { connectSearchBox } from "react-instantsearch/connectors"

import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
} from "react-instantsearch/dom"

const MySearchBox = ({ currentRefinement, refine }) => (
  <TextField
    label="Search field"
    id="search"
    type="search"
    value={currentRefinement}
    onChange={e => refine(e.target.value)}
  />
)

const ConnectedSearchBox = connectSearchBox(MySearchBox)

function Search() {
  return (
    <div className="container">
      <ConnectedSearchBox />
      <Hits hitComponent={Post} />
    </div>
  )
}

function Post({ hit }) {
  return (
    <div style={{ marginTop: "10px" }}>
      <span className="hit-path">
        <Link to={hit.frontmatter.path}>
          <Highlight
            attribute="frontmatter.title"
            hit={hit}
            tagName="mark"
            url="frontmatter.path"
          />
        </Link>
      </span>
    </div>
  )
}

export default ({ algoliaAppId, algoliaApiKey }) => (
  <InstantSearch
    appId={algoliaAppId}
    apiKey={algoliaApiKey}
    indexName="myblog"
    urlSync="[true]"
  >
    <Search />
  </InstantSearch>
)
