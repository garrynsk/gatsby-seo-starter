import * as React from "react"
import {Component} from "react"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import plane from "./img/Flying_Herk_in_the_Clouds.svg"
import Navigation from "../navigationTop/navigationTop"
import { LocalLink, BlogTitle, theme } from "../../theme"
import { withPrefix } from 'gatsby-link'

const Plane = styled.img`
  position: fixed;
  z-index: -1;
  opacity: 0.8;
  width: 15%;
  left:5%;
  top:10%;


  @media (max-width: ${(props) => props.theme.screen.px1000}) {
    display: none;
  }
`

const Header = styled.div`
  width: 100%;
  height: ${(props) => props.theme.grid.height};
  grid-area: header;
`

const PositionedTitle = styled(BlogTitle)`
  padding-top: 10%;
  padding-bottom: 10%;
  padding-left:  ${(props) => props.theme.grid.paddingLeft};
  float: right;
  padding-right: ${(props) => props.theme.grid.paddingRight};
  
  @media (max-width: ${(props) => props.theme.screen.px700}) {
    padding-top: 15%;
  }

`

export default class HeaderComponent extends React.Component   {



  constructor({ title, blogLink }){
    super(title, blogLink)
    this.state= {
      title: title,
      blogLink: blogLink,

    }
  }

  render(){
    const {title, blogLink} = this.state
    return  (
      <ThemeProvider theme={theme}>
        <Header>
          <Plane src={withPrefix("/img/Flying_Herk_in_the_Clouds.svg")} alt="Plane in the Clouds"/>
            <PositionedTitle>
              <LocalLink href={blogLink}>
                {title}
              </LocalLink>
            </PositionedTitle>
          <Navigation/>
        </Header>
      </ThemeProvider>
    )
  }
}
