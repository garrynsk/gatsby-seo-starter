import * as React from "react"
import {Component} from "react"
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink } from "../../theme"

const NavButton = styled(GatsbyLink)`
  margin: 0 auto;
  font-weight: bold;
  
  @media (max-width: ${(props) => props.theme.screen.px1000}) {
    display: none;
  }

`

const Buttons = styled(Tabs)`
    @media (max-width: ${(props) => props.theme.screen.px1000}) {
        display: none;
    }

`

const Bar = styled(AppBar)`
    background-color:${(props) => props.theme.palette.primary.black};
    
    @media (max-width: ${(props) => props.theme.screen.px1000}) {
        display: none;
    }

`

export default class NavigationTop extends React.Component {
    
    constructor() {
        super();
        this.state = {
            index: 0,
        }
      }

      handleChange = (path) => {
        switch (path) {
            case "/": this.setState({index: 0}); break;
            case "/about": this.setState({index: 1}); break;
            case "/tags": this.setState({index: 2}); break;
            case "/repositories": this.setState({index: 3}); break;
            default: this.setState({index: 0}); break;
        }
      }
    render() {
        const {index} = this.state
        return (
    <ThemeProvider theme={theme} >

        <Bar position="fixed" color = "inherit">
          <Buttons fullWidth  value = {index}>
            <NavButton to="/">
                <Tab style={{fontWeight: "inherit"}} label="Home" value={0} onClick={() => this.handleChange("/")}/>
            </NavButton>
            <NavButton to="/about">
                <Tab style={{fontWeight: "inherit"}} label="About" value={1} 
                    onClick={() => this.handleChange("/about")}/>
            </NavButton>
            <NavButton to="/tags">
                <Tab style={{fontWeight: "inherit"}} label="Tags" value={2} onClick={() => this.handleChange("/tags")}/>
            </NavButton>
            <NavButton to="/repositories">
                <Tab style={{fontWeight: "inherit"}} label="Repositories" value={3}  
                   onClick={() => this.handleChange("/repositories")} />
            </NavButton>
          </Buttons>
        </Bar>

    </ThemeProvider>
)
    }
}
