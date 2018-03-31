import * as React from "react"
import SocialButtons from "../socialButtons/socialButtons"
import styled from "styled-components"
import NavigationBottom from "../navigationBottom/navigationBottom"

const Footer = styled.div`
  height: 50px;
  position: fixed;
  bottom: 0%;
  width: 100%;
  grid-area: footer;
`

export default ({ socialLinks }) => (
  <Footer>
    <SocialButtons socialLinks={socialLinks} />
    <NavigationBottom />
  </Footer>
)
