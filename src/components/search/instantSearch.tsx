import * as React from "react"
import { Component } from "react"
import * as ReactDOM from "react-dom"
import TextField from "material-ui/TextField"
import { connectSearchBox } from "react-instantsearch/connectors"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink, CasualText } from "../../theme"
import Helmet from "react-helmet"
import "./instantSearch.css"

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

`

const SearchResult = styled(CasualText)`
  text-align: left;
  padding-top: 20px;
`

const SearchPaper = styled.div`
  padding-left: ${(props) => props.theme.grid.paddingLeft};

`

const MySearchBox = ({ currentRefinement, refine }) => (
  <TextField
    label="Search field"
    id="search"
    type="search"
    value={currentRefinement}
    onChange={event => refine(event.target.value)}
    style={{ width: "100%"}}
  />
)

const ConnectedSearchBox = connectSearchBox(MySearchBox)

function Search() {
  return (
    <Container>
       <Helmet></Helmet>
      <ConnectedSearchBox />
      <ResultsContainer hitComponent={Post} />
    </Container>
  )
}

function Post({ hit }) {
  return (
    <SearchResult>
      <GatsbyLink to={hit.frontmatter.path}>
        <Highlight
          attribute="frontmatter.title"
          hit={hit}
          tagName="mark"
          url="frontmatter.path"
        />
      </GatsbyLink>
    </SearchResult>
  )
}


export default ({ algoliaAppId, algoliaApiKey }) => (
  <ThemeProvider theme={theme} >
    <SearchPaper>
      <InstantSearch
        appId={algoliaAppId}
        apiKey={algoliaApiKey}
        indexName="myblog"
        urlSync="[true]"
      >
      <Search />
      </InstantSearch>
    </SearchPaper>
  </ThemeProvider>
)
