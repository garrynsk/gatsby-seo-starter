import * as React from "react"
import Link from "gatsby-link"
import "./navigation.css"
import InstantSearch from "../search/instantSearch"
import { MenuItem, MenuList } from "material-ui/Menu"
import Paper from "material-ui/Paper"

export default ({ algoliaAppId, algoliaApiKey }) => (
  <Paper className="navigation">
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
  </Paper>
)
