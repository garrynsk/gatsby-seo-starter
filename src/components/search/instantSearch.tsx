import * as React from "react"
import { Component } from "react"
import * as ReactDOM from "react-dom"
import Link from "gatsby-link"
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
} from "react-instantsearch/dom"

function Search() {
  return (
    <div className="container">
      <SearchBox />
      <Hits hitComponent={Post} />
    </div>
  )
}

function Post({ hit }) {
  return (
    <div style={{ marginTop: "10px" }}>
      <span className="hit-path">
        <a href={hit.frontmatter.path}>
          <Highlight
            attribute="frontmatter.title"
            hit={hit}
            tagName="mark"
            url="frontmatter.path"
          />
        </a>
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
