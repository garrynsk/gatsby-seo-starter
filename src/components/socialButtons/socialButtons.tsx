import * as React from "react"
import Tooltip from "material-ui/Tooltip"
import {
  FaFacebookSquare,
  FaLinkedinSquare,
  FaGithubSquare,
  FaTwitterSquare,
} from "react-icons/lib/fa"
import styled from "styled-components"

const Link = styled.a`
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
      return <FaFacebookSquare />

      break

    case "Twitter":
      return <FaTwitterSquare />

      break

    case "Linkedn":

      return <FaLinkedinSquare />

      break

    case "GitHub":

      return <FaGithubSquare />

      break

    default:

      break
  }
}

export default ({ socialLinks }) => (
  <Buttons>
    {socialLinks.map(element => (
          <Tooltip id="tooltip-top" placement="top" title={`Me on ${element.label}`}>
            <Link href={element.url}>
              <SwitchLink label = {element.label} />
            </Link>
          </Tooltip>
        )
      )
    }
  </Buttons>
)
