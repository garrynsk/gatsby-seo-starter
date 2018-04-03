import * as React from "react"
import { Component } from "react"
import Helmet from "react-helmet"
import SEO from "../components/seo/seo"
import * as ReactDisqusThread from "react-disqus-thread"
import styled from "styled-components"
import PostHeader from "../components/postHeader/postHeader"
import Image from "../components/image/image"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink, Title, CasualText } from "../theme"

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

const Embed = (author, title) => <Helmet>title={`${author} - ${title}`}</Helmet>

export default class Post extends React.Component {
  constructor({ data }) {
    super({ data })

    this.state = {
      disqus: data.site.siteMetadata.disqusShortname,
      post: data.markdownRemark,
      shareUrl: data.site.siteMetadata.siteUrlShort + data.markdownRemark.frontmatter.path,
      title: data.markdownRemark.frontmatter.title,
    }
  }
  componentDidMount = () => {
    this.mountFacebook()
    this.mountReddit()
    this.mountTwitter()
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

  render() {
    const { disqus, post, shareUrl, title } = this.state

    return (
      <ThemeProvider theme={theme}>
        <BlogPost>
          <Helmet title={`${title}`} >
            <link rel="stylesheet" href="./css/post.css"/></Helmet>
          <div id="fb-root" />

          <Embed author={post.frontmatter.author} title={title} />
          <SEO postPath={shareUrl} postNode={post} postSEO />
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
