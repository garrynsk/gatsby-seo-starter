import * as React from "react"
import styled from "styled-components"
import InstantSearch from "../search/instantSearch"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink, CasualText } from "../../theme"

const Sidebar = styled.div`
  grid-area: sidebar;
  
  @media (max-width: ${(props) => props.theme.screen.px1000}) {
    width: 100%;
    margin-bottom: 150px;
    padding-right: ${(props) => props.theme.grid.paddingRight};
  }
`

export default ({ algoliaAppId, algoliaApiKey }) => (
  <ThemeProvider theme={theme}>
    <Sidebar>
      <InstantSearch algoliaAppId={algoliaAppId} algoliaApiKey={algoliaApiKey} />
    </Sidebar>
  </ThemeProvider>
)
