// File copy pasted from https://github.com/Vagr9K/gatsby-advanced-starter. Thank you, Ruben Harutyunyan!
import * as React from "react"
import { Component } from "react"
import Helmet from "react-helmet"
import * as config from "../../../config"
import { withPrefix } from 'gatsby-link'
import * as MetaTags from 'react-meta-tags';

function insertTagToHead(tag) {
  tag.className = "metaData"
  const head = document.getElementsByTagName("head")[0]
  head.insertBefore(tag, head.firstChild);

}

function removePreviousTags(){

  const tags = document.getElementsByClassName("metaData");

  while(tags[0]) {
    tags[0].parentNode.removeChild(tags[0]);
  }​

}

function insertTitle(text){
  const title = document.createElement("title")
  title.innerHTML = text
  insertTagToHead(title)
}

function insertTextScriptToHead(type, innerHTML) {
  const script = document.createElement("script")
  script.innerHTML = innerHTML
  script.defer = true
  script.async = true
  script.type = type
  insertTagToHead(script)

}

function insertLink(href, rel) {
  const link = document.createElement("link")
  link.href = href
  link.rel = rel
  insertTagToHead(link)
}

function insertScriptToHead(type, src) {
  const script = document.createElement("script")
  script.src = src
  script.defer = true
  script.async = true
  script.type = type
  insertTagToHead(script)

}

function insertHttpToHead(http, content) {

  const meta = document.createElement("meta")
  meta.httpEquiv = http
  meta.content = content
  insertTagToHead(meta)
}

function insertMetaToHead(name, content) {

  const meta = document.createElement("meta")
  meta.name = name
  meta.content = content
  insertTagToHead(meta)
}

function insertPropertyMetaToHead(property, content){

  const meta = document.createElement("meta")
  meta.setAttribute("property", property);
  meta.content = content
  insertTagToHead(meta)

}


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
          "url": config.siteUrl + article.imgUrl,
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



function twitterCards(page, article){
  if(article){
    insertMetaToHead("twitter:image", config.siteUrl +  article.imgUrl);
    insertMetaToHead("twitter:image:alt", article.tags);
    insertMetaToHead("twitter:description", article.description);
    insertMetaToHead("twitter:title", article.title);
  }else{
    insertMetaToHead("twitter:image", config.siteUrl + config.twitterSiteImg);
    insertMetaToHead("twitter:image:alt", page.keywords);
    insertMetaToHead("twitter:description", page.description);
    insertMetaToHead("twitter:title", page.title);
  }
  
  insertMetaToHead("twitter:site", config.twitterID);
  insertMetaToHead("twitter:creator", config.twitterID);
  insertMetaToHead("twitter:card", "summary_large_image");
}

function commonMetaTags(page, article) {

  insertMetaToHead("robots", "index, follow");
  insertLink(config.siteUrl, "canonical")
  insertHttpToHead("x-ua-compatible; charset=utf-8", "ie=edge")
  insertHttpToHead("Content-Type", "text/html; charset=utf-8")
  insertMetaToHead("viewport", "width=device-width, initial-scale=1.0");

  if(article){
    insertTitle(article.title)
    insertMetaToHead("description", article.description);
    insertMetaToHead("image", config.siteUrl + article.imgUrl);
    insertMetaToHead("keywords", article.tags);
  }else{
    insertTitle(page.title)
    insertMetaToHead("description", page.description);
    insertMetaToHead("image", config.siteUrl + page.image);
    insertMetaToHead("keywords", page.keywords);
  }

}

function thirdPartyServices() {

  insertMetaToHead("yandex-verification", "0ea0b2c5c7e1e0b9");
  insertScriptToHead("text/javascript", '//platform-api.sharethis.com/js/sharethis.js#property=5ac3893ece89f0001364201f&product=sticky-share-buttons');
  insertScriptToHead("text/javascript", withPrefix("/heap.js"));
  insertScriptToHead("text/javascript", withPrefix("/tagmanager.js"));

}

function schemaGraph(article, page){

  insertTextScriptToHead("application/ld+json", JSON.stringify(schemaOrg(article, page)));
}

function openGraph(article, page) {

  insertPropertyMetaToHead("og:url", page.url);
  insertPropertyMetaToHead("og:title", page.title);
  insertPropertyMetaToHead("og:description", page.description);
  
  insertPropertyMetaToHead("og:site_name", config.siteTitle);

  if (article) {
    insertPropertyMetaToHead("og:image", config.siteUrl + article.imgUrl);
    insertPropertyMetaToHead("article:published_time", article.date);
    insertPropertyMetaToHead("article:modified_time", article.date);
    insertPropertyMetaToHead("article:section", article.description);
    insertPropertyMetaToHead("article:tag", article.tags);
    insertPropertyMetaToHead("og:type", "article");

  } else {
    insertPropertyMetaToHead("og:type", "website");
  }

  insertPropertyMetaToHead("fb:app_id", config.facebookAnalyticsID);
  insertPropertyMetaToHead("fb:admins", config.facebookUserID);

}
export default class SEO extends Component {
    constructor({page, article}) {

      super(page, article)
      this.state = {
        page: page,
        article: article || null,
      }
    }

    setUpTags = () => {
      removePreviousTags()

      thirdPartyServices()
      schemaGraph(this.state.article, this.state.page)
      openGraph(this.state.article, this.state.page)
      twitterCards(this.state.page, this.state.article)
      commonMetaTags(this.state.page, this.state.article)
     
    }

  render() {
    const { page, article } = this.state


    return (
      <div>

      <Helmet>
      
        <html lang="en"/>

      </Helmet>
        {this.setUpTags()}
      </div>
    )
  }
}

