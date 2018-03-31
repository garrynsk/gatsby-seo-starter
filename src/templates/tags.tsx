import * as React from "react"
import Link from "gatsby-link"
import styled from "styled-components"
import Typography from "material-ui/Typography"
import Button from "material-ui/Button"

const Title = styled(Typography)`
  padding-bottom: 20px;
`

const Post = styled.div`
  padding-bottom: 20px;
`
const TitleButton = styled(Button)`
  text-align: left;
`

const ResizedTitle = styled.span`
  @media (max-width: 1000px) {
    font-size: 60%;
  }
`
const Date = styled(Typography)`
  padding-left: 40px;
  font-style: italic;
`

const Tags = ({ pathContext, data }) => {
  const { tag } = pathContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <div>
      <Title variant="display1">
        <ResizedTitle>{tagHeader}</ResizedTitle>
      </Title>
      {edges.map(({ node }) => {
        const { path, title, date } = node.frontmatter
        return (
          <Post>
            <Link to={path}>
              <TitleButton>{title}</TitleButton>
            </Link>
            <Date variant="caption">{date}</Date>
          </Post>
        )
      })}

      <Link to="/tags">
        <Button> All tags </Button>
      </Link>
    </div>
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
