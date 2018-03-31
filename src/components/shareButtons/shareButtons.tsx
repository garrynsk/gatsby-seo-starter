import * as React from "react"
import Tooltip from "material-ui/Tooltip"
import styled from "styled-components"
import Typography from 'material-ui/Typography';
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


const Container = styled.div`
  position: fixed;
  margin-left: -4vw;
  margin-bottom: 40vh;
  bottom: 0%;

  @media (max-width: 1000px) {
    display: none;
  }

`

const ShareButton = styled.div`
  padding: '50px';
  cursor: pointer;
  padding-bottom: 3vh;

  :hover:not(:active) {
    opacity: 0.75;
  }
`

export default ({ shareUrl, title, excerpt }) => (
  <Tooltip id="tooltip-top-start" title="Share" placement="top-start">

    <Container>
      <ShareButton>
        <FacebookShareButton
          url={shareUrl}
          quote={excerpt}
          className="social-share-button"
        >
        
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      </ShareButton>

      <ShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={title}
          className="social-share-button"
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </ShareButton>

      <ShareButton>
        <GooglePlusShareButton url={shareUrl} className="social-share-button">
          <GooglePlusIcon size={32} round />
        </GooglePlusShareButton>
      </ShareButton>
      <ShareButton>
        <LinkedinShareButton
          url={shareUrl}
          title={title}
          windowWidth={750}
          windowHeight={600}
          className="social-share-button"
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </ShareButton>
    </Container>
  </Tooltip>
)
