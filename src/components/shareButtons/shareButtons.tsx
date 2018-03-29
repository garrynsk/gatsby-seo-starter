import * as React from "react"
import Tooltip from "material-ui/Tooltip"
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share"
import {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
} from "react-share"
import {
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
} from "react-share"

export default ({ shareUrl, title }) => (
  <Tooltip id="tooltip-top-start" title="Share" placement="top-start">
    <div className="social-container">
      <FacebookShareButton
        url={shareUrl}
        quote={title}
        className="social-share-button"
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      <TwitterShareButton
        url={shareUrl}
        title={title}
        className="social-share-button"
      >
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>

      <GooglePlusShareButton url={shareUrl} className="social-share-button">
        <GooglePlusIcon size={32} round />
      </GooglePlusShareButton>

      <LinkedinShareButton
        url={shareUrl}
        title={title}
        windowWidth={750}
        windowHeight={600}
        className="social-share-button"
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  </Tooltip>
)
