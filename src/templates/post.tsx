import * as React from "react"
import Helmet from "react-helmet"
import Img from "gatsby-image"
import "./post.css"
import Link from "gatsby-link"
import SEO from "../components/seo/seo"
import * as ReactDisqusThread from "react-disqus-thread"
import TagsLine from "../components/tagsLine/tagsLine"
import ShareButtons from "../components/shareButtons/shareButtons"

const Embed = () => (
  <Helmet>
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
)

export default ({ data }) => {
  const { markdownRemark: post } = data
  const shareUrl = post.frontmatter.path
  const title = post.frontmatter.title
  return (
    <div className="blog-post">
      <div id="fb-root" />
      <Helmet> title={`${post.frontmatter.author} - ${title}`}</Helmet>
      <Embed />
      <SEO postPath={shareUrl} postNode={post} postSEO />
      <div>
        <Img
          fadeIn={true}
          className="image"
          alt={post.frontmatter.featuredImage.name}
          sizes={post.frontmatter.featuredImage.childImageSharp.sizes}
        />
        <h1 className="blog-post-title">{title}</h1>
        <TagsLine tags={post.frontmatter.tags} />
        <ShareButtons shareUrl={shareUrl} title={title} />
        <div
          className="inner-text"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <ReactDisqusThread
          shortname={data.site.siteMetadata.disqusShortname}
          identifier={title}
          title={title}
          url={shareUrl}
        />
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
