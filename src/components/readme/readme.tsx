import * as React from "react"
import { Component } from "react"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Typography from "material-ui/Typography"
import Collapse from "material-ui/transitions/Collapse"
import IconButton from "material-ui/IconButton"
import ExpandMoreIcon from "material-ui-icons/ExpandMore"
import "./readme.css"
import styled from "styled-components"
import Typography from 'material-ui/Typography';

const Container = styled.div`
    margin-bottom: 40px;

`

const Text = styled(Typography)`
    word-wrap: break-word;
    overflow-wrap: break-word;
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
      <Container>
        {readme ? (
          <Card>
            <CardContent>
              <Typography color="textSecondary" className="card-title">
                Readme:
              </Typography>

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
                {readme.text ? <Text variant = "body2">{readme.text}</Text> : null}
              </Collapse>
            </CardContent>
          </Card>
        ) : null}
      </Container>
    )
  }
}

