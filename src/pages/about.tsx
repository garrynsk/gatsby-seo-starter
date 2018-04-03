import * as React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import SEO from "../components/seo/seo"
import * as config from "../../config"
import * as React from "react"
import Navigation from "../navigation/navigation"
import Avatar from "material-ui/Avatar"
import styled from "styled-components"
import Typography from "material-ui/Typography"
import Divider from "material-ui/Divider"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink, Title, CasualText } from "../theme"

const About = styled.div`
  padding-right: 50%;

  @media (max-width: ${(props) => props.theme.screen.px1000}) {
    margin-bottom: 50px;
    padding-left: ${(props) => props.theme.grid.paddingLeft};
    padding-right: ${(props) => props.theme.grid.paddingRight};
  }
`

const User = styled.div`
  margin-bottom: 30px;
`

const Name = styled(Title)`
  padding-bottom: 20px;
`

const Moto = styled(CasualText)`
  padding-bottom: 20px;
`

const Email = styled(CasualText)`
  font-style: italic;
  font-size: 96%;
`
const Description = styled(CasualText)`
  padding-top: 20px;
`


export default ({ data }) => {
  const { siteMetadata: site } = data.site
  return (
    <ThemeProvider theme={theme}>
    <About>
      <SEO />

      <Avatar
        alt="Victoria Zakharova"
        src={site.avatar}
        size={80}
        style={{
          width: "140px",
          height: "80px",
          boxShadow: "0 3px 5px 1px #333",
          marginBottom: "20px",
        }}
      />

      <User>
        <Name>
          {site.userName}
        </Name>
        <Moto>
          {site.userMoto}
        </Moto>
        <Email>
          {site.userEmail}
        </Email>
      </User>
      <Divider />
      <Description>
        I am a scala developer, who loves functional programming (including
        category theory, cats, scalaz etc.). I want to build something special,
        that's why I develop a project named Mutator. By the way, I'm fond of
        elm.
      </Description>
    </About>
    </ThemeProvider>
  )
}

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        siteUrl
        siteTitle
        userEmail
        userName
        userMoto
        avatar
        year
        socialLinks {
          label
          url
        }
      }
    }
  }
`
