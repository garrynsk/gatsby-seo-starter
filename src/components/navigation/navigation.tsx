import * as React from "react"
import Link from "gatsby-link"
import InstantSearch from "../search/instantSearch"
import { MenuItem, MenuList } from "material-ui/Menu"
import Paper from "material-ui/Paper"
import styled from "styled-components"
import Typography from "material-ui/Typography"

const Navigation = styled(Paper)`
  @media (max-width: 1000px) {
    display: none;
  }
`

export default ({ algoliaAppId, algoliaApiKey }) => (
  <Navigation>
    <MenuList>
      <Link to="/">
        <MenuItem>Home</MenuItem>
      </Link>
      <Link to="/about">
        <MenuItem>About me</MenuItem>
      </Link>
      <Link to="/tags">
        <MenuItem>Tags</MenuItem>
      </Link>
      <Link to="/repositories">
        <MenuItem>Repositories</MenuItem>
      </Link>
    </MenuList>
    <InstantSearch algoliaAppId={algoliaAppId} algoliaApiKey={algoliaApiKey} />
  </Navigation>
)
