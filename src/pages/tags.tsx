import * as React from "react"
import * as kebabCase from "lodash/kebabCase"
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink, Title, CasualText } from "../theme"
import SEO from "../components/seo/seo"

const Tags = styled.div`
  padding-right: ${(props) => props.theme.grid.paddingRight};

  @media (max-width: ${(props) => props.theme.screen.px1000}) {
    padding-left: ${(props) => props.theme.grid.paddingLeft};
    
  }
`

export default ({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { siteUrl, siteTitle, siteLogo } } },
}) => {
  const page = {
    titleAlt: "List of article tags for Scala blog VictoriaZ",
    url: siteUrl + "/tags",
    title: "Tags - " + siteTitle,
    image: siteLogo,
    main: false,
    description: `All tags I use to distinguish my articles by topic.`,
    keywords: "Scala, articles, blog",
  }
  return (
  <ThemeProvider theme={theme}>
  <Tags>
  <SEO page={page} article={null} />
    <Title>Tags</Title>
    <List component="nav" >
      {group.map(tag => (
        <ListItem button key={tag.fieldValue}>
          <CasualText><GatsbyLink to={`/tags/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue} ({tag.totalCount})
          </GatsbyLink></CasualText>
        </ListItem>
      ))}
    </List>
  </Tags>
  </ThemeProvider>
)}


export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        siteUrl
        siteTitle
        siteLogo
      }
    }

    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
