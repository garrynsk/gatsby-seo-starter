import * as React from "react"

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
      <a href={facebookUrl}>
        <FaFacebookSquare />
      </a>
      <a href={twitterUrl}>
        <FaTwitterSquare />
      </a>
      <a href={linkednUrl}>
        <FaLinkedinSquare />
      </a>
      <a href={githubUrl}>
        <FaGithubSquare />
      </a>
    </div>
  )
}
