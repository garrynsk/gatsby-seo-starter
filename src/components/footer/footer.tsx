import * as React from "react"
import SocialButtons from "../socialButtons/socialButtons"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import NavigationBottom from "../navigationBottom/navigationBottom"
import { theme } from "../../theme"

const Footer = styled.div`
  height: ${(props) => props.theme.grid.footer.height};
  position: fixed;
  bottom: 0%;
  width: 100%;
  grid-area: footer;
`

export default ({ socialLinks }) => (
  <ThemeProvider theme={theme}>
    <Footer>
      <SocialButtons socialLinks={socialLinks} />
      <NavigationBottom />
    </Footer>
  </ThemeProvider>
)
