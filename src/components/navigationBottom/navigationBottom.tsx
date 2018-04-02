import * as React from "react"
import BottomNavigation, {
  BottomNavigationAction,
} from "material-ui/BottomNavigation"
import Icon from "material-ui/Icon"
import IconButton from "material-ui/IconButton"
import FaceIcon from "material-ui-icons/Face"
import BookmarkIcon from "material-ui-icons/Bookmark"
import HomeIcon from "material-ui-icons/Home"
import FolderIcon from "material-ui-icons/Folder"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink } from "../../theme"
import {Component} from "react"

const Navigation = styled.div`
  @media (min-width: ${(props) => props.theme.screen.px1000}) {
    display: none;
  }
`

export default class NavigationBottom extends React.Component {
  constructor() {
    super();
    this.state = {
        index: 0,
    }
  }

  handleChange = (index) => this.setState({index: index});

  render() {
      const {index} = this.state
      return (
        <ThemeProvider theme={theme}>
          <Navigation>
            <BottomNavigation style = {{justifyContent: "space-around"}} color="primary">

              <GatsbyLink to="/">
                <IconButton aria-label="Home" value={0} onClick={() => this.handleChange(0)} 
                  color={index === 0 ? "primary" : "default" } touch="true">
                  <HomeIcon />
                </IconButton>
              </GatsbyLink>

              <GatsbyLink to="/about">
                <IconButton aria-label="About" value={1} onClick={() => this.handleChange(1)} 
                color={index === 1 ? "primary" : "default" } touch="true"> 
                  <FaceIcon />
                </IconButton>
              </GatsbyLink>

              <GatsbyLink to="/tags">
                <IconButton aria-label="Tags" value={2} onClick={() => this.handleChange(2)}  
                color={index === 2 ? "primary" : "default" } touch="true"> 
                  <BookmarkIcon /> 
                </IconButton>
              </GatsbyLink>

              <GatsbyLink to="/repositories">
                <IconButton aria-label="Repositories" value={3} onClick={() => this.handleChange(3)} 
                color={index === 3 ? "primary" : "default" } touch="true"> 
                  <FolderIcon />
                </IconButton>
              </GatsbyLink>

            </BottomNavigation>
          </Navigation>
        </ThemeProvider>
    )
  }
}
