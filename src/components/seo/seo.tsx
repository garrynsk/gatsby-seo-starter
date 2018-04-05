// File copy pasted from https://github.com/Vagr9K/gatsby-advanced-starter. Thank you, Ruben Harutyunyan!
import * as React from "react"
import { Component } from "react"
import Helmet from "react-helmet"
import * as config from "../../../config"

function schemaOrg(article, page ) {
  const schemaOrgJSONLD = 
      [{
        "@context": "http://schema.org",
        "@type": "WebSite",
        "url": page.url,
        "name": page.title,
        "alternateName": page.titleAlt ? page.titleAlt : ""
        }]
   
   if(page.main){
    schemaOrgJSONLD.push(
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
              "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": config.siteUrl,
              "name": config.siteTitle,
              "image": config.siteUrl + config.siteLogo
            }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@id": config.siteUrl + "/tags",
                "name": "Article Tags - " + config.siteTitle,
                "image": config.siteUrl + config.siteLogo
            }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": config.siteUrl + "/repositories",
                  "name": "GitHub repositories - " + config.siteTitle,
                  "image": config.siteUrl + config.siteLogo
                }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@id": config.siteUrl + "/about",
                "name": "About Zakharova Victoria - " + config.siteTitle,
                "image": config.siteUrl + config.siteLogo
              }
            }]
        }
      )
    }
    

  if(article){
    schemaOrgJSONLD.push(  
      {"@context": "http://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "url": article.url,
        "image": {
          "@type": "ImageObject",
          "url": article.imgUrl,
          "width": article.imgWidth,
          "height": article.imgHeight
        },
        "author": config.userName,
        "datePublished": article.date,
        "publisher": 
        {
          "@type": "Organization",
          "@id": config.siteUrl,
          "name": config.siteTitle,
          "logo": {
            "@type": "ImageObject",
            "url": config.siteUrl + config.favicon,
            "width": 30,
            "height": 20
          }
        },  
        "description": article.description,
        "dateModified": article.date,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": article.url
        }
    })
  }

  return schemaOrgJSONLD
}


/**
function twitterCards(){

  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:creator"
    content={config.userTwitter ? config.userTwitter : ""}
  />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />


  <meta name="twitter:site" content="@publisher_handle"/>

  <meta name="twitter:image:src" content="http://www.example.com/image.jpg"/>

}

function breadcrumbs(){
  <meta itemprop="name" content="The Name or Title Here"/>

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

}*/

export default class SEO extends Component {
    constructor({page, article}) {

      super(page, article)
      this.state = {
        page: page,
        article: article || null,
      }
    }

  render() {
    const { page, article } = this.state
  /*  let title
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
   
    */

    return (
      <Helmet>
        <title>{page.title}</title>
        {/* Common tags */}
        <meta name="description" content={page.description} />
        <meta name="image" content={page.image} />
        <meta name="keywords" content={page.keywords}/>
        <link href={config.siteUrl} rel="canonical" />
        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrg(article, page))}
        </script>
        <meta property="og:url" content={page.url} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:image" content={page.image} />
        <meta property="og:site_name" content={config.siteTitle} />

       
     
       {article ? <meta property="og:type" content="article" /> :
          <meta property="og:type" content="website" />
        }
        {article ?  <meta property="article:published_time" content={article.date} /> :null}
        {article ?   <meta property="article:modified_time" content={article.date}  /> :null}
        {article ?   <meta property="article:section" content={article.description} /> :null}
        {article ?   <meta property="article:tag" content={article.tags} /> :null}
    
        

        <meta property="fb:app_id"
          content={config.facebookAnalyticsID}/>
        <meta property="fb:admins" content={config.facebookUserID}  />

      </Helmet>
    )
  }
}

