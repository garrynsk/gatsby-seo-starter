import * as React from "react"
import img from "./../../../static/img/flock.png"
import "./header.css"

export default ({ title, blogLink }) => (
  <div
    className="header"
    style={{ backgroundImage: `url(./img/Flying_Herk_in_the_Clouds.svg)` }}
  >
    <h1 className="title">
      <a href={blogLink}> {title} </a>
    </h1>
    <img className="flock" src="./img/flock.png" alt="flock" />
  </div>
)
