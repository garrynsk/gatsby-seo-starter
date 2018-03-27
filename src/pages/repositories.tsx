import * as React from "react"
import { parseData } from "../parser/parser"
import Helmet from "react-helmet"
import SEO from "../components/seo/seo"
import * as config from "../../config"
import "./repositories.css"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Typography from "material-ui/Typography"

export default ({ data }) => {
  const repositories = parseData(data).repositories

  return (
    <div className="repositories">
      <Helmet title={config.siteTitle} />
      <SEO postEdges={data.githubData.data.user.repositories.edges} />{" "}
      {repositories.map(repository => {
        return (
          <div>
            <h1 className="repositoryName">
              <a href={repository.url}>{repository.name}</a>{" "}
            </h1>
            <div className="description"> {repository.description}</div>
            <br />
            <div>
              {" "}
              {repository.readme ? (
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" className="card-title">
                      Readme:
                    </Typography>
                    {repository.readme.text ? (
                      <div>{repository.readme.text}</div>
                    ) : null}
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        )
      })}{" "}
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
