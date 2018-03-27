import * as React from "react"

import "./header.css"
import img from "./../../../static/img/flock.png"
export default ({ title, blogLink, headerBackground }) => (
  <div
    className="header"
    style={{ backgroundImage: `url(./${headerBackground})` }}
  >
    <h1 className="title">
      <a href={blogLink}> {title} </a>
    </h1>
    <img className="flock" src="./img/flock.png" alt="flock" />
  </div>
)
