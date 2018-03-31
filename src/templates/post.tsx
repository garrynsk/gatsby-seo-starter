import * as React from "react"
import {Component} from 'react'
import Helmet from "react-helmet"
import Link from "gatsby-link"
import SEO from "../components/seo/seo"
import * as ReactDisqusThread from "react-disqus-thread"
import ShareButtons from "../components/shareButtons/shareButtons"
import styled from "styled-components"
import Typography from 'material-ui/Typography'
import PostHeader from "../components/postHeader/postHeader"

const BlogPost = styled.div`
  margin-left: 20px;
`

const Text = styled(Typography)``

const Embed = (author, title) => (
  <Helmet>
    title={`${author} - ${title}`}
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
      type="text/javascript"
    />
  </Helmet>
)

export default class Post extends React.Component {

  constructor({data}) {
    super(data)
    this.forceUpdate()
    this.state = {
      disqus: data.site.siteMetadata.disqusShortname,
      post : data.markdownRemark,
      shareUrl : data.markdownRemark.frontmatter.path,
      title : data.markdownRemark.frontmatter.title,
      excerpt: data.markdownRemark.excerpt,
    }
 
  }
  componentDidMount = () => {
    this.mountFacebook()
    this.mountReddit()
  }

  mountReddit = () => {
    const script = document.createElement("script");
    script.src = "https://www.redditstatic.com/comment-embed.js";
    script.async = true;
    document.body.appendChild(script);
  }

  mountFacebook = () => {
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.5";
    script.async = true;
    document.body.appendChild(script);
  }


  render() {
    const {disqus, post, shareUrl, title, excerpt} = this.state

    return (
      <BlogPost>
        <div id="fb-root"/>
          
          <Embed author ={post.frontmatter.author} title={title} />
          <SEO postPath={shareUrl} postNode={post} postSEO />
          <PostHeader post={post}/>
          <ShareButtons shareUrl={shareUrl} title={title} excerpt={excerpt}/>
          <Text
            id="text"
            variant="body2"
            className="inner-text"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
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
      excerpt(pruneLength: 250)
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
