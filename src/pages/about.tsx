import * as React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import SEO from "../components/seo/seo"
import * as config from "../../config"
import * as React from "react"
import Navigation from "../navigation/navigation"
import Avatar from "material-ui/Avatar"
import styled from "styled-components"
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

const About = styled.div`
`

const User = styled.div`
  margin-bottom: 30px;
`

const Name = styled(Typography)``

const Moto = styled(Typography)``

const Email = styled(Typography)`
  font-style: italic;
`
const Description = styled(Typography)`

`

export default ({data}) => {
  const {siteMetadata: site} = data.site
  return (
    <About>
      <Helmet title={config.siteTitle} />
      <SEO />

      <Avatar
        alt="Victoria Zakharova"
        src={site.avatar}
        size={80}
        style={{ width: "140px", height: "80px", boxShadow: '0 3px 5px 1px #333', marginBottom: "20px"}}
      />
  
      <User>
        <Name variant="body1" gutterBottom>{site.userName}</Name>
        <Moto variant="body1" gutterBottom>{site.userMoto}</Moto>
        <Email variant="caption" gutterBottom>{site.userEmail}</Email>
      </User>
      <Divider />
        <Description variant="body2">I am a scala developer, who loves functional programming (including
        category theory, cats, scalaz etc.). I want to build something special,
        that's why I develop a project named Mutator. By the way, I'm fond of elm.</Description>
    </About>
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
