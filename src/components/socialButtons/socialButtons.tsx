import * as React from "react"
import Tooltip from "material-ui/Tooltip"
import styled from "styled-components"
import { withPrefix } from "gatsby-link"
import { theme, LocalLink } from "../../theme"
import { ThemeProvider } from "styled-components"
import Helmet from "react-helmet"

const Link = styled(LocalLink)`
  font-size: 150%;
  margin-left: 2%;
`

const Buttons = styled.div`
  @media (max-width: 1000px) {
    display: none;
  }
`

const SwitchLink = ({ label }) => {
  switch (label) {
    case "Facebook":
      return <i className="fab fa-facebook-square fa-lg" />

      break

    case "Twitter":
      return <i className="fab fa-twitter-square fa-lg" />

      break

    case "Google+":
      return <i className="fab fa-google-plus-square fa-lg" />
      break

    case "GitHub":
      return <i className="fab fa-github-square fa-lg" />

      break

    default:
      break
  }
}

export default ({ socialLinks }) => (
  <ThemeProvider theme={theme}>
    <Buttons>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.0.9/css/brands.css"
          integrity="sha384-ATC/oZittI09GYIoscTZKDdBr/kI3lCwzw3oBMnOYCPVNJ4i7elNlCxSgLfdfFbl"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.0.9/css/fontawesome.css"
          integrity="sha384-Lyz+8VfV0lv38W729WFAmn77iH5OSroyONnUva4+gYaQTic3iI2fnUKtDSpbVf0J"
          crossorigin="anonymous"
        />
      </Helmet>
      {socialLinks.map(element => (
        <Tooltip placement="top" title={`Me on ${element.label}`}>
          <Link href={element.url}>
            <SwitchLink label={element.label} />
          </Link>
        </Tooltip>
      ))}
    </Buttons>
  </ThemeProvider>
)
