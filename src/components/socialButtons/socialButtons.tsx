import * as React from "react"
import Tooltip from "material-ui/Tooltip"
import {
  FaFacebookSquare,
  FaLinkedinSquare,
  FaGithubSquare,
  FaTwitterSquare,
} from "react-icons/lib/fa"

const SwitchLink = ({ element }) => {
  switch (element.label) {
    case "Facebook": {
      return (
        <Tooltip id="tooltip-top" placement="top" title="More about me">
          <a href={element.url}>
            <FaFacebookSquare />
          </a>
        </Tooltip>
      )
      break
    }
    case "Twitter": {
      return (
        <Tooltip id="tooltip-top" placement="top" title="More about me">
          <a href={element.url}>
            <FaTwitterSquare />
          </a>
        </Tooltip>
      )
      break
    }
    case "Linkedn": {
      return (
        <Tooltip id="tooltip-top" placement="top" title="More about me">
          <a href={element.url}>
            <FaLinkedinSquare />
          </a>
        </Tooltip>
      )
      break
    }
    case "GitHub": {
      return (
        <Tooltip id="tooltip-top" placement="top" title="More about me">
          <a href={element.url}>
            <FaGithubSquare />
          </a>
        </Tooltip>
      )
      break
    }
    default:
      break
  }
}

export default ({ socialLinks }) => (
  <div>{socialLinks.map(element => <SwitchLink element={element} />)}</div>
)
