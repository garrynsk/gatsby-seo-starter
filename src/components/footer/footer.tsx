import * as React from "react"
import Tooltip from "material-ui/Tooltip"
import "./footer.css"
import {
  FaFacebookSquare,
  FaLinkedinSquare,
  FaGithubSquare,
  FaTwitterSquare,
} from "react-icons/lib/fa"

export default ({ facebookUrl, twitterUrl, linkednUrl, githubUrl }) => {
  return (
    <div className="footer">
      <Tooltip id="tooltip-top" placement="top" title="More about me">
        <a href={facebookUrl}>
          <FaFacebookSquare />
        </a>
      </Tooltip>
      <Tooltip id="tooltip-top" placement="top" title="More about me">
        <a href={twitterUrl}>
          <FaTwitterSquare />
        </a>
      </Tooltip>
      <Tooltip id="tooltip-top" placement="top" title="More about me">
        <a href={linkednUrl}>
          <FaLinkedinSquare />
        </a>
      </Tooltip>
      <Tooltip id="tooltip-top" placement="top" title="More about me">
        <a href={githubUrl}>
          <FaGithubSquare />
        </a>
      </Tooltip>
    </div>
  )
}
