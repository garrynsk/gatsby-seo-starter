import * as React from "react"
import "./footer.css"
import SocialButtons from "../socialButtons/socialButtons"

export default ({ socialLinks }) => (
  <div className="footer">
    <SocialButtons socialLinks={socialLinks} />
  </div>
)
