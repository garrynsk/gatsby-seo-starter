import * as React from "react"
import Navigation from "../navigation/navigation"
import "./sidebar.css"
import Avatar from "material-ui/Avatar"
export default ({
  userName,
  userMoto,
  userEmail,
  algoliaAppId,
  algoliaApiKey,
  avatar,
}) => (
  <div className="sidebar">
    <div className="userName">
      <Avatar
        alt="Victoria Zakharova"
        src={avatar}
        size={80}
        style={{ width: "140px", height: "100px" }}
      />
    </div>
    <div>{userName}</div>
    <div className="userMoto">{userMoto}</div>
    <div className="userEmail">{userEmail}</div>
    <hr />
    <Navigation algoliaAppId={algoliaAppId} algoliaApiKey={algoliaApiKey} />
  </div>
)
