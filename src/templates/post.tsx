import * as React from "react"
import { Component } from "react"
import SEO from "../components/seo/seo"
import * as ReactDisqusThread from "react-disqus-thread"
import styled from "styled-components"
import PostHeader from "../components/postHeader/postHeader"
import Image from "../components/image/image"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink, Title, CasualText } from "../theme"
import "./post.css"
import SEO from "../components/seo/seo"

const BlogPost = styled.div`
  word-break: break-all;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  padding-right: ${(props) => props.theme.grid.paddingRight};

  @media (max-width: ${(props) => props.theme.screen.px1000}) {

    padding-left: ${(props) => props.theme.grid.paddingLeft};
    
  }
`

const ImageStyled = styled(Image)`
  margin-bottom: 15%;
`

//const Embed = (author, title) => <Helmet>title={`${author} - ${title}`}</Helmet>

export default class Post extends React.Component {
  
  constructor({ data }) {
    super({ data })
    const metaData = data.site.siteMetadata
    const post = data.markdownRemark.frontmatter
    const page = {
      titleAlt: "Article for Scala blog VictoriaZ: " + post.title,
      url: metaData.siteUrl + post.path,
      title: "Article - " + post.title,
      image: metaData.siteLogo,
      main: false,
      description: data.markdownRemark.shortExcerpt,
      keywords: post.tags,
    }

    const article = {
      title: post.title,
      url: metaData.siteUrl + post.path,
      imgUrl: post.featuredImage.childImageSharp.sizes.src,
      imgWidth: 400,
      imgHeight: 300,
      date: post.date,
      tags: post.tags,
      description: data.markdownRemark.longExcerpt,
    }

    this.state = {
      disqus: metaData.disqusShortname,
      post: data.markdownRemark,
      shareUrl: metaData.siteUrlShort + post.path,
      title: post.title,
      page: page,
      article: article,
    }
  }
  componentDidMount = () => {
    this.mountFacebook()
    this.mountReddit()
    this.mountTwitter()
    this.mountAddThis()
  }

  mountTwitter = () => {
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    document.body.appendChild(script)
  }

  mountReddit = () => {
    const script = document.createElement("script")
    script.src = "https://www.redditstatic.com/comment-embed.js"
    script.async = true
    document.body.appendChild(script)
  }

  mountFacebook = () => {
    const script = document.createElement("script")
    script.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.5"
    script.async = true
    document.body.appendChild(script)
  }

  mountAddThis = () => {
    const script = document.createElement("script")
    script.src =
      `//s7.addthis.com/js/300/addthis_widget.js#pubid=${this.data.site.siteMetadata.AddThisID}`
    script.async = true
    document.body.appendChild(script)
  }

  render() {
    const { disqus, post, shareUrl, title, page, article } = this.state

    return (
      <ThemeProvider theme={theme}>
        <BlogPost>
          <SEO page = {page} article = {article} />
          <div id="fb-root" />
          <ImageStyled
            featuredImage={post.frontmatter.featuredImage}
          />
          <PostHeader post={post} />
          <CasualText id="text" className="inner-text" dangerouslySetInnerHTML={{ __html: post.html }}/> 
          <ReactDisqusThread
            shortname={disqus}
            identifier={title}
            title={title}
            url={shareUrl}
          />
        </BlogPost>
      </ThemeProvider>
    )
  }
}

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    site {
      siteMetadata {
        disqusShortname
        siteUrlShort
        siteUrl
        siteTitle
        siteLogo
        addThisID
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      shortExcerpt: excerpt(pruneLength: 70)
      longExcerpt: excerpt(pruneLength: 400)
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
