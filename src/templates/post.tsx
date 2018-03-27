import * as React from "react"
import Helmet from "react-helmet"
import Img from "gatsby-image"
import "./post.css"
import * as kebabCase from "lodash/kebabCase"
import Link from "gatsby-link"
import SEO from "../components/seo/seo"
import * as ReactDisqusThread from "react-disqus-thread"


import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  EmailShareButton,
} from "react-share"
import {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,
} from "react-share"
import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  RedditIcon,
  TumblrIcon,
  LivejournalIcon,
  MailruIcon,
  EmailIcon,
} from "react-share"

export default ({ data }) => {
  const { markdownRemark: post } = data
  const shareUrl = post.frontmatter.path
  const title = post.frontmatter.title
  return (
    <div className="blog-post">
      <div id="fb-root" />
      <Helmet>
        title={`${post.frontmatter.author} - ${post.frontmatter.title}`}
        <script
          async
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.5"
          type="text/javascript"
        />
        <script
          async
          src="https://www.redditstatic.com/comment-embed.js"
          type="text/javascript"
        />
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
          type="text/javascript"
        />
      </Helmet>
      <SEO
        postPath={post.frontmatter.path}
        postNode={data.markdownRemark}
        postSEO
      />
      <div>
        <Img
          fadeIn={true}
          className="image"
          alt={post.frontmatter.featuredImage.name}
          sizes={post.frontmatter.featuredImage.childImageSharp.sizes}
        />
        <h1 className="blog-post-title">{post.frontmatter.title}</h1>
        <div>
          {post.frontmatter.tags.map(tag => {
            return (
              <Link className="tag" to={`/tags/${kebabCase(tag)}/`}>
                {tag}
              </Link>
            )
          })}
        </div>
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
        <div
          className="inner-text"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <ReactDisqusThread
          shortname={data.site.siteMetadata.disqusShortname}
          identifier={title}
          title={title}
          url={post.frontmatter.path}/>
      </div>

    </div>
  )
}

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    site {
      siteMetadata {
        disqusShortname
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
        featuredImage {
          name
          childImageSharp {
            sizes(maxWidth: 1900) {
              src
              srcSet
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
