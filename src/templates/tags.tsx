import * as React from "react"
import Link from "gatsby-link"
import styled from "styled-components"
import Button from "material-ui/Button"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink, Title, CasualText, Date } from "../theme"
import Helmet from "react-helmet"
import plane from "../../img/Flying_Herk_in_the_Clouds.svg"

const Post = styled.div`
  padding-top: 30px;
`
const Container= styled.div`
padding-right: ${(props) => props.theme.grid.paddingRight};

  @media (max-width: ${(props) => props.theme.screen.px1000}) {
    padding-left: ${(props) => props.theme.grid.paddingLeft};
    
  }

`


const Tags = ({ pathContext, data }) => {
  const { tag } = pathContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <ThemeProvider theme={theme}>
    <Container>

      <Title>
        {tagHeader}
      </Title>
      {edges.map(({ node }) => {
        const { path, title, date } = node.frontmatter
        return (
          <Post>
            <CasualText><GatsbyLink to={path}>
              {title}
            </GatsbyLink></CasualText>
            <Date>{date}</Date>
          </Post>
        )
      })}

      <Link to="/tags">
        <Button  color="primary"> All tags </Button>
      </Link>
    </Container>
    </ThemeProvider>
  )
}

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`
