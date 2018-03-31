import * as React from "react"
import { Component } from "react"
import { parseData } from "../parser/parser"
import Helmet from "react-helmet"
import SEO from "../components/seo/seo"
import Readme from "../components/readme/readme"
import * as config from "../../config"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Typography from "material-ui/Typography"
import Collapse from "material-ui/transitions/Collapse"
import IconButton from "material-ui/IconButton"
import ExpandMoreIcon from "material-ui-icons/ExpandMore"
import styled from "styled-components"
import Typography from "material-ui/Typography"
import Divider from "material-ui/Divider"

const Repositories = styled.div`
  margin-bottom: 6%;
`

const Header = styled.div`
  margin-bottom: 20px;
`

const Description = styled(Typography)``
const Name = styled(Typography)`
  padding-bottom: 30px;

  @media (max-width: 1000px) {
    font-size: 60%;
    padding-bottom: 5px;
  }
`

const ResizedTitle = styled.span`
  @media (max-width: 1000px) {
    font-size: 60%;
  }
`
const Title = ({ repository }) => (
  <Header>
    <Name variant="display1">
      <a href={repository.url}>
        <ResizedTitle>{repository.name}</ResizedTitle>
      </a>
    </Name>
    <Description variant="subheading"> {repository.description}</Description>
  </Header>
)

export default ({ data }) => {
  const repositories = parseData(data).repositories

  return (
    <Repositories>
      <Helmet title={config.siteTitle} />
      <SEO postEdges={data.githubData.data.user.repositories.edges} />

      {repositories.map(repository => {
        return (
          <div>
            <Title repository={repository} />

            <Divider />
            <Readme readme={repository.readme} />
          </div>
        )
      })}
    </Repositories>
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
