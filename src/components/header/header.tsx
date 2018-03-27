import * as React from "react"

import "./header.css"

export default ({ title, blogLink }) => (
  <div className="header">
    <hr />
    <h1 className="title">
      <a href={blogLink}> {title} </a>
    </h1>
    <hr />
  </div>
)
