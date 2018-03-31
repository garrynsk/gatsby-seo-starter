import * as React from "react"
import Navigation from "../navigation/navigation"
import styled from "styled-components"


const Sidebar = styled.div`
  grid-area: sidebar;
  font-size: 90%;
  margin-left: 10%;
  margin-bottom: 10vh;
  text-align: center;
  text-line: 5px;

  @media (max-width: 1300px) {
    width: 100%;
    margin-left: 0;
  }
  
`

export default ({
  algoliaAppId,
  algoliaApiKey}) =>
(
  <Sidebar>
    <Navigation algoliaAppId={algoliaAppId} algoliaApiKey={algoliaApiKey} />
  </Sidebar>
)
