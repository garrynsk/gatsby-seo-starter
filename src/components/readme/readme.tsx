import * as React from "react"
import { Component } from "react"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Collapse from "material-ui/transitions/Collapse"
import IconButton from "material-ui/IconButton"
import ExpandMoreIcon from "material-ui-icons/ExpandMore"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink, PostTitle, Date, CasualText } from "../../theme"
import Helmet from "react-helmet"
import "./readme.css"

const Container = styled.div`
  margin-bottom: 40px;

`

export default class Readme extends React.Component {
  constructor({ readme }) {
    super(readme)

    this.state = {
      expanded: false,
      readme: readme,
    }
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { expanded, readme } = this.state

    return (
      <ThemeProvider theme={theme}>
      <Container>
      <Helmet></Helmet>
        {readme ? (
          <Card style={{margin:"0 auto", padding: "0"}}>
            <CardContent>
              <CasualText className="card-title">
                Readme:
              </CasualText>

              <IconButton
                className={expanded ? "expand" : "expandOpen"}
                onClick={this.handleExpandClick}
                aria-expanded={expanded}
                aria-label="Show more"
                color="primary"
              >
                <ExpandMoreIcon />
              </IconButton>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                {readme.text ? (
                  <CasualText>{readme.text}</CasualText>
                ) : null}
              </Collapse>
            </CardContent>
          </Card>
        ) : null}
      </Container>
      </ThemeProvider>
    )
  }
}
