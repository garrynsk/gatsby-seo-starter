import * as React from "react"
import { Component } from "react"
import Helmet from "react-helmet"
import Link from "gatsby-link"
import SEO from "../components/seo/seo"
import * as ReactDisqusThread from "react-disqus-thread"
import styled from "styled-components"
import Typography from "material-ui/Typography"
import PostHeader from "../components/postHeader/postHeader"
import "./post.css"
import Image from "../components/image/image"

const BlogPost = styled.div`
  margin-left: 20px;
`

const ImageStyled = styled(Image)`
  margin-bottom: 15%;
  
`

const Text = styled(Typography)`
  padding-top: 10%;
  @media (max-width: 1000px) {
    width: 80vw;
    padding-top: 0;
  }
`

const ResizedText = styled.span`
  @media (max-width: 1000px) {
    font-size: 80%;
    line-height: 1.3em;
  }
`
const Embed = (author, title) => <Helmet>title={`${author} - ${title}`}</Helmet>

export default class Post extends React.Component {
  constructor({ data }) {
    super({ data })

    this.state = {
      disqus: data.site.siteMetadata.disqusShortname,
      post: data.markdownRemark,
      shareUrl: data.markdownRemark.frontmatter.path,
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
      <BlogPost>
        <div id="fb-root" />

        <Embed author={post.frontmatter.author} title={title} />
        <SEO postPath={shareUrl} postNode={post} postSEO />
        <ImageStyled
          featuredImage={post.frontmatter.featuredImage}
        />
        <PostHeader post={post} />
       <Text
          variant="body2"
        ><ResizedText id="text" className="inner-text" dangerouslySetInnerHTML={{ __html: post.html }}/>
        </Text>     
        <ReactDisqusThread
          shortname={disqus}
          identifier={title}
          title={title}
          url={shareUrl}
        />
      </BlogPost>
    )
  }
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
