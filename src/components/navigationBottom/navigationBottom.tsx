import * as React from "react"
import { Component } from "react"
import styled from "styled-components"
import Link from "gatsby-link"
import Typography from "material-ui/Typography"
import BottomNavigation, {
  BottomNavigationAction,
} from "material-ui/BottomNavigation"
import Icon from "material-ui/Icon"
import IconButton from "material-ui/IconButton"
import FaceIcon from "material-ui-icons/Face"
import BookmarkIcon from "material-ui-icons/Bookmark"
import HomeIcon from "material-ui-icons/Home"
import FolderIcon from "material-ui-icons/Folder"

const Navigation = styled.div`
  @media (min-width: 1000px) {
    display: none;
  }
`
const NavButton = styled(Link)`
  margin: 0 auto;
`

export default () => (
  <Navigation>
    <BottomNavigation>
      <NavButton to="/">
        <IconButton aria-label="Home" value="/">
          <HomeIcon />
        </IconButton>
      </NavButton>
      <NavButton to="/about">
        <IconButton aria-label="About" value="/about">
          <FaceIcon />
        </IconButton>
      </NavButton>
      <NavButton to="/tags">
        <IconButton aria-label="Tags" value="/tags">
          <BookmarkIcon />
        </IconButton>
      </NavButton>
      <NavButton to="/repositories">
        <IconButton aria-label="Repositories" value="/repositories">
          <FolderIcon />
        </IconButton>
      </NavButton>
    </BottomNavigation>
  </Navigation>
)
