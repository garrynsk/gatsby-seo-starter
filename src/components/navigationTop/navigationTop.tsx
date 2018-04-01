import * as React from "react"
import Link from "gatsby-link"
import styled from "styled-components"
import Typography from "material-ui/Typography"
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import IconButton from "material-ui/IconButton"

const NavButton = styled(Link)`
  margin: 0 auto;
  @media (max-width: 1000px) {
    display: none;
  }

`

const Buttons = styled(Tabs)`
@media (max-width: 1000px) {
    display: none;
  }

`

const Container = styled(AppBar)`
@media (max-width: 1000px) {
    display: none;
  }

`

export default () => {
    return(
        <Container position="fixed" color="default">
          <Buttons
            indicatorColor="primary"
            textColor="white"
            fullWidth
          >
            <NavButton to="/"><Tab style={{fontWeight: "900"}} label="Home" /></NavButton>
            <NavButton to="/about"><Tab style={{fontWeight: "900"}} label="About" /></NavButton>
            <NavButton to="/tags"><Tab style={{fontWeight: "900"}} label="Tags" /></NavButton>
            <NavButton to="/repositories"><Tab style={{fontWeight: "900"}} label="Repositories" /></NavButton>
          </Buttons>
        </Container>
    )
}
