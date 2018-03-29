import * as React from "react"
import { Component } from "react"
import { parseData } from "../parser/parser"
import Helmet from "react-helmet"
import SEO from "../components/seo/seo"
import * as config from "../../config"
import "./repositories.css"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Typography from "material-ui/Typography"
import Collapse from "material-ui/transitions/Collapse"
import Button from "material-ui/Button"
import ExpandMoreIcon from "material-ui-icons/ExpandMore"
import TouchRipple from "material-ui/ButtonBase/Ripple"
import Checkboxes from "../components/checkboxes"

class Readme extends React.Component {
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
      <div>
        {readme ? (
          <Card>
            <CardContent>
              <Typography color="textSecondary" className="card-title">
                Readme:
              </Typography>

              <Button
                variant="fab"
                style={{
                  maxWidth: "6px",
                  width: "6px",
                  height: "6px",
                  paddingTop: "4px",
                  paddingRight: "18px",
                  paddingBottom: "4px",
                  paddingLeft: "18px",
                }}
                className={expanded ? "expand" : "expandOpen"}
                onClick={this.handleExpandClick}
                aria-expanded={expanded}
                aria-label="Show more"
                color="primary"
              >
                <ExpandMoreIcon />
              </Button>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                {readme.text ? <div>{readme.text}</div> : null}
              </Collapse>
            </CardContent>
          </Card>
        ) : null}
      </div>
    )
  }
}

const Title = ({ repository }) => (
  <div>
    <h1 className="repositoryName">
      <a href={repository.url}>{repository.name}</a>
    </h1>
    <div className="description"> {repository.description}</div>
  </div>
)

export default ({ data }) => {
  const repositories = parseData(data).repositories

  return (
    <div className="repositories">
      <Helmet title={config.siteTitle} />
      <SEO postEdges={data.githubData.data.user.repositories.edges} />

      {repositories.map(repository => {
        return (
          <div>
            <Title repository={repository} />

            <br />
            <Readme readme={repository.readme} />
          </div>
        )
      })}
    </div>
  )
}

export const pageQuery = graphql`
  query Github {
    githubData {
      data {
        user {
          repositories {
            edges {
              node {
                name
                description
                url
                readme {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`
