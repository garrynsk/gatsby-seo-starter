import * as React from "react"
import Navigation from "../navigation/navigation"
import "./sidebar.css"

export default ({
  userName,
  userMoto,
  userEmail,
  algoliaAppId,
  algoliaApiKey,
}) => (
  <div className="sidebar">
    <div className="userName">{userName}</div>
    <div className="userMoto">{userMoto}</div>
    <div className="userEmail">{userEmail}</div>
    <hr />
    <Navigation algoliaAppId={algoliaAppId} algoliaApiKey={algoliaApiKey} />
  </div>
)
