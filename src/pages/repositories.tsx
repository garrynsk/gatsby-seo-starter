import * as React from "react"
import { Component } from "react"
import { parseData } from "../parser/parser"
import Helmet from "react-helmet"
import SEO from "../components/seo/seo"
import Readme from "../components/readme/readme"
import * as config from "../../config"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Collapse from "material-ui/transitions/Collapse"
import IconButton from "material-ui/IconButton"
import ExpandMoreIcon from "material-ui-icons/ExpandMore"
import styled from "styled-components"
import Divider from "material-ui/Divider"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink, Title, CasualText, LocalLink } from "../theme"

const Repositories = styled.div`
  word-break: break-all;
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding-right: ${(props) => props.theme.grid.paddingRight};

  @media (max-width: ${(props) => props.theme.screen.px1000}) {
    padding-left: ${(props) => props.theme.grid.paddingLeft};
  }

`

const Header = styled.div`

`

const Description = styled(CasualText)`
  padding-bottom: 20px;
`
const Name = styled(Title)`
  padding-bottom: 20px;
`

const RepositoryHeader = ({ repository }) => (
  <Header>
    <Name>
      <LocalLink href={repository.url}>
        {repository.name}
      </LocalLink>
    </Name>
    <Description>{repository.description}</Description>
  </Header>
)

export default ({ data }) => {
  const repositories = parseData(data).repositories

  return (
    <ThemeProvider theme={theme}>
    <Repositories>
      <Helmet title={config.siteTitle} />
      <SEO postEdges={data.githubData.data.user.repositories.edges} />

      {repositories.map(repository => {
        return (
          <div>
            <RepositoryHeader repository={repository} />

            <Divider />
            <Readme readme={repository.readme} />
          </div>
        )
      })}
    </Repositories>
    </ThemeProvider>
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
