import * as React from "react"
import { Component } from "react"
import * as ReactDOM from "react-dom"
import Link from "gatsby-link"
import "./instantSearch.css"
import TextField from "material-ui/TextField"
import { connectSearchBox } from "react-instantsearch/connectors"
import styled from "styled-components"
import Typography from 'material-ui/Typography';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
} from "react-instantsearch/dom"

const Container = styled.div`
  width: 100%;
  
`
const ResultsContainer = styled(Hits)`
  margin-top: 10px;
  padding: 10px;

`

const SearchResult = styled(Typography)`
  text-align: left;
  padding: 5px;
  text-transform: capitalize;

`
const MySearchBox = ({ currentRefinement, refine }) => (
  <TextField
    label="Search field"
    id="search"
    type="search"
    value={currentRefinement}
    onChange={(event) => refine(event.target.value)}
    style= {{width: "80%"}}
  />
)

const ConnectedSearchBox = connectSearchBox(MySearchBox)

function Search() {
  return (
    <Container>
      <ConnectedSearchBox />
      <ResultsContainer hitComponent={Post} />
    </Container>
  )
}

function Post({ hit }) {
  return (
    <SearchResult variant="subheading"><Link to={hit.frontmatter.path}>
      <Highlight
        attribute="frontmatter.title"
        hit={hit}
        tagName="mark"
        url="frontmatter.path"
      />
    </Link></SearchResult>
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
