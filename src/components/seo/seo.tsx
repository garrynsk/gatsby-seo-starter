// File copy pasted from https://github.com/Vagr9K/gatsby-advanced-starter. Thank you, Ruben Harutyunyan!
import * as React from "react"
import { Component } from "react"
import Helmet from "react-helmet"
import * as config from "../../../config"

function schemaOrg(){

  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "url": blogURL,
      "name": title,
      "alternateName": config.siteTitleAlt ? config.siteTitleAlt : "",
    },
  ]

  if (postSEO) {
    schemaOrgJSONLD.push([
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": postURL,
              "name": title,
              "image": image,
            },
          },
        ],
      },

      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: blogURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
        headline: title,
        image: {
          "@type": "ImageObject",
          url: image,
        },
        description,
      },
    ])
  }


  const article = 
    {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      "headline": "Headline",
      "image": {
        "@type": "ImageObject",
        "url": "url",
        "width": 45,
        "height": 233
      }
    }

}

function generalMeta(){
  <link href="https://example.com/" rel="canonical" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Example Title</title>
  <meta name="description" content={description} />
  <meta name="image" content={image} />
  <meta name="keywords" content="cats, feeding cats, funny cats"/>

  {/*Article*/}
  <meta itemprop="name" content="The Name or Title Here"/>

}

function openGraph(){
  <meta name="twitter:card" value="summary"/>
  <meta property="og:url" content={postSEO ? postURL : blogURL} />
  {postSEO ? <meta property="og:type" content="article" /> : null}
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />

  {/* Open Graph data */}}   {/*Article*/}
  <meta property="og:title" content="Title Here" />
  <meta property="og:site_name" content="Site Name, i.e. Moz" />
  <meta property="article:published_time" content="2013-09-17T05:59:00+01:00" />
  <meta property="article:modified_time" content="2013-09-16T19:08:47+01:00" />
  <meta property="article:section" content="Article Section" />
  <meta property="article:tag" content="Article Tag" />
}


function facebookID(){

  <meta property="fb:app_id"
    content={config.siteFBAppID ? config.siteFBAppID : ""}/>
  <meta property="fb:admins" content="Facebook numberic ID" />
}

function twitterCards(){

  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:creator"
    content={config.userTwitter ? config.userTwitter : ""}
  />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  {/*Article*/}
  <meta name="twitter:site" content="@publisher_handle"/>
  {/* Twitter summary card with large image must be at least 280x150px */}}
  <meta name="twitter:image:src" content="http://www.example.com/image.jpg"/>

}

function breadcrumbs(){

  {/*Breadcrumbs*/}}
  <ol itemscope itemtype="http://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
        <a itemprop="item" href="https://example.com/widgets">
        <span itemprop="name">Widgets</span></a>
        <meta itemprop="position" content="1" />
    </li>
    <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
        <a itemprop="item" href="https://example.com/widgets/large">
        <span itemprop="name">Large Widgets</span></a>
        <meta itemprop="position" content="2" />
    </li>
  </ol>

}

export default class SEO extends Component {
    constructor({postNode, postPath, postSEO}){

      super(postNode, postPath, postSEO)
      this.state={
        postNode:postNode,
        postPath:postPath,
        postSEO:postSEO,
      }

    }

  render() {
    const { postNode, postPath, postSEO } = this.state
    let title
    let description
    let image
    let postURL
    if (postSEO) {
      const postMeta = postNode.frontmatter
      title = postMeta.title
      description = postMeta.description
        ? postMeta.description
        : postNode.excerpt
      image = postMeta.cover
      postURL = config.siteUrl + config.pathPrefix + postPath
    } else {
      title = config.siteTitle
      description = config.siteDescription
      image = config.siteLogo
    }
    const realPrefix = config.pathPrefix === "/" ? "" : config.pathPrefix
    image = config.siteUrl + realPrefix + image
    const blogURL = config.siteUrl + config.pathPrefix
   


    return (
      <Helmet>
       
        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

  

      </Helmet>
    )
  }
}

