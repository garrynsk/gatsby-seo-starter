# Gatsby SEO Starter

The Gatsby starter with typescript and a lot of goodies.

It is a 100% SEO ready gatsby blog starter, especially programming blogs, as it can extract a list of repos via GitHub api. It also includes tags, comments, search, social buttons and SEO support.

#### Preview
[victoriaz.netlify.com](https://victoriaz.netlify.com/)

## How to install

Verify if npm and node are installed on your machine:

```bash
    node -v && npm -v
```

Otherwise, install them:

```bash
    // For Ubuntu
    sudo apt-get install npm
    sudo apt-get install node
```

Install the starter:

```bash
gatsby new YourProjectName https://github.com/garrynsk/gatsby-seo-starter
```

If you want to configure installed plugins, navigate to gatsby-config.js in the root directory and edit it as you wish.

## The list of preinstalled plugins
Feel free to configure them.

#### Images/Video

1. [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/?=gatsby-image#gatsby-image)
Speedy, optimized images without the work.

2. [gatsby-remark-responsive-image](https://www.gatsbyjs.org/packages/gatsby-remark-responsive-image/?=gatsby-remark-responsive-image#gatsby-remark-responsive-image)
Make images in markdown responsive.

3. [gatsby-plugin-sharp](https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/?=gatsby-plugin-sharp#gatsby-plugin-sharp)
Exposes several image processing functions built on the Sharp image processing library.

4. [gatsby-remark-images](https://www.gatsbyjs.org/packages/gatsby-remark-images/?=gatsby-remark-images#gatsby-remark-images)
Processes images in markdown so they can be used in the production build.

5. [gatsby-remark-responsive-iframe](https://www.gatsbyjs.org/packages/gatsby-remark-responsive-iframe/?=gatsby-remark-responsive-iframe#gatsby-remark-responsive-iframe)
Wraps iframes or objects (e.g. embedded YouTube videos) within markdown files in a responsive elastic container with a fixed aspect ratio.

6. [gatsby-transformer-sharp](https://www.gatsbyjs.org/packages/gatsby-transformer-sharp/?=gatsby-transformer-sharp#gatsby-transformer-sharp)
Creates ImageSharp nodes from image types that are supported by the Sharp image processing library and provides fields in their GraphQL types for processing your images in a variety of ways including resizing, cropping, and creating responsive images.

#### Code blocks

1. [gatsby-remark-prismjs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/?=gatsby-remark-prismjs#gatsby-remark-prismjs)
Adds syntax highlighting to code blocks in markdown files using PrismJS.

#### SEO

1. [gatsby-plugin-sitemap](https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/?=gatsby-plugin-sitemap#gatsby-plugin-sitemap)
Create a sitemap for your Gatsby site.

3. [gatsby-plugin-google-analytics](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/?=gatsby-plugin-google-analytics#gatsby-plugin-google-analytics)
Easily add Google Analytics to your Gatsby site.

4. [gatsby-plugin-manifest](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/?=gatsby-plugin-manifest#gatsby-plugin-manifest)
Adds support for shipping a manifest.json with your site. To create manifest.json, you need to run gatsby build.

5. [gatsby-plugin-favicon](https://github.com/Creatiwity/gatsby-plugin-favicon)
Generates all favicons for Web, Android, iOS, ...

6. [gatsby-plugin-hotjar](https://www.gatsbyjs.org/packages/gatsby-plugin-hotjar/)
Hotjar analytics.

#### UX

1. [gatsby-plugin-offline](https://www.gatsbyjs.org/packages/gatsby-plugin-offline/?=gatsby-plugin-offline#gatsby-plugin-offline)
Adds drop-in support for making a Gatsby site work offline and more resistant to bad network connections. It creates a service worker for the site and loads the service worker into the client.

2. [gatsby-plugin-nprogress](https://www.gatsbyjs.org/packages/gatsby-plugin-nprogress/?=gatsby-plugin-nprogress#gatsby-plugin-nprogress)
Automatically shows the nprogress indicator when a page is delayed in loading (which Gatsby considers as one second after clicking on a link).

3. [gatsby-plugin-algolia](https://www.npmjs.com/package/gatsby-plugin-algolia)
Search powered by Algolia.

4. [gatsby-plugin-feed](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-feed)
Create an RSS feed (or multiple feeds) for your Gatsby site.

#### Dev tools

1. [gatsby-plugin-webpack-bundle-analyzer](https://www.gatsbyjs.org/packages/gatsby-plugin-webpack-bundle-analyzer/?=gatsby-plugin-webpack-bundle-analyzer#gatsby-plugin-webpack-bundle-analyzer)
A Gatsby plugin to help analyze your bundle content with [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

2. [gatsby-plugin-debug-build](https://www.gatsbyjs.org/packages/gatsby-plugin-debug-build/?=#gatsby-plugin-debug-build)
Gatsby plugin to force the dev version of builds. NOT FOR USE IN PRODUCTION. This is a debugging utility. Don’t do stupid things with it.

3. [gatsby-plugin-netlify](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-netlify)
Automatically generates a _headers file and a _redirects file at the root of the public folder to configure HTTP headers and redirects on Netlify.

#### Helpers

1. [gatsby-link](https://www.gatsbyjs.org/packages/gatsby-link/?=gatsby-link#gatsby-link)
A <Link> component for Gatsby. It’s a wrapper around React Router’s Link component that adds enhancements specific to Gatsby. All props are passed through to React Router’s Link.

2. [gatsby-plugin-catch-links](https://www.gatsbyjs.org/packages/gatsby-plugin-catch-links/?=gatsby-plugin-catch-links#gatsby-plugin-catch-links)
Intercepts local links from markdown and other non-react pages and does a client-side pushState to avoid the browser having to refresh the page.

3. [gatsby-remark-copy-linked-files](https://www.gatsbyjs.org/packages/gatsby-remark-copy-linked-files/?=gatsby-remark-copy-linked-files#gatsby-remark-copy-linked-files)
Copies local files linked to/from markdown to your public folder.

4. [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/?=gatsby-transformer-remark#gatsby-transformer-remark)
Parses Markdown files using Remark.

5. [gatsby-plugin-fastclick](https://www.gatsbyjs.org/packages/gatsby-plugin-fastclick/?=#gatsby-plugin-fastclick)
Make your Gatsby app more responsive on touch devices with [Fastclick](https://github.com/ftlabs/fastclick).

6. [gatsby-plugin-react-helmet](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet#gatsby-plugin-react-helmet)
Provides drop-in support for server rendering data added with React Helmet. React Helmet is a component which lets you control your document head using their React component.

7. [gatsby-remark-smartypants](https://www.gatsbyjs.org/packages/gatsby-remark-smartypants/?=gatsby-remark-smartypants#gatsby-remark-smartypants)
Replaces “dumb” punctuation marks with “smart” punctuation marks using the retext-smartypants plugin.

8. [gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/?=gatsby-source-filesystem#gatsby-source-filesystem)
Plugin for creating File nodes from the file system. 

9. [gatsby-plugin-twitter](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-twitter)
Loads the Twitter JavaScript for embedding tweets. Let's you add tweets to markdown and in other places

#### Language

1. [gatsby-plugin-typescript](https://www.gatsbyjs.org/packages/gatsby-plugin-typescript/?=gatsby-plugin-typescript#gatsby-plugin-typescript)
Provides drop-in support for TypeScript and TSX.

#### Social

1. [gatsby-source-github-api](https://github.com/ldd/gatsby-source-github-api)
Source plugin for pulling data into Gatsby from the official GitHub v4 GraphQL API.

2. [gatsby-remark-autolink-headers](https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/?=gatsby-remark-autolink-headers#gatsby-remark-autolink-headers)
Adds GitHub-style links to MarkdownRemark headers.

## Features

UI
- [x] material-ui
- [x] styled-components

Posts in markdown
- [x] Code syntax highlighting
- [x] Embedded YouTube videos
- [x] Embedded Tweets
- [x] Embedded Facebook posts
- [x] Embedded Reddit comments

Special blog features
- [x] Tags
- [x] Disqus comments
- [x] List of Github repositories
- [x] Search

Social features
- [x] Twitter tweet button
- [x] Facebook share button
- [x] Google+ share button
- [x] LinkedIn share button

SEO
- [x] Sitemap generation
- [x] robots.txt
- [x] Meta descriptions
- [x] Schema.org
- [x] OpenGraph Tags
- [x] Twitter Tags
- [x] Google analytics
- [x] Web App Manifest
- [x] All essential favicons

Development tools
- [x] TSLint for linting
- [x] Prettier for code style
- [x] Remark-Lint for linting Markdown
- [x] write-good for linting English prose
- [x] gh-pages for deploying to GitHub pages

## Customisation

#### Configuration
First, look as config.js. Here you keep all configuration data. It can be queried like this:
```graphql

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        siteUrl
        siteTitle
        userEmail
        userName
        userMoto
        githubUrl
        facebookUrl
        twitterUrl
        linkednUrl
        ... // other configuration data
      }
    },
}
```

#### SEO

I spend quite some time wrapping my head around how to make seo works in gatsby, but finally it works.
You must know, that [react-helmet doesn't work with Facebook scrapper](https://github.com/nfl/react-helmet/issues/26). It just fails to fetch dynamic tags. So you have to use some kind of prerendering.

I allow myself to cite [@cjimmy](https://github.com/cjimmy):

###### Convert your app to server-side rendering
This is the most obvious solution but the most onerous. You won't be able to use client-side definitions like window in your js. If you're using React Router, you'll have to find a way to mirror the routes between server and client. If you're like me, you might be serverless, and running a server would be a lot more work. On the other hand, your page will likely load faster, and crawlers will see what your users would. This is a non-exhaustive list of tradeoffs.

###### Use a pre-rendering service
Prerender.io, Render-tron, and Prerender.cloud to name a few, give you a way to server-side render when the user-agent is a bot. Some CDNs like Netlify and Roast.io do this for you so you don't have to run your own server.
The downside to this is this is yet another service to pay for.

###### Pre-render on your own
A couple of packages exist for rendering your React app statically. Graphcool's Prep, React-Snap, React-Snapshot were ones I've found that all essentially run a local server to render the site and download the html files. The files won't be pretty, but if all you're looking for is the <head> generated by React Helmet, this will do.

I tried Prep, React-Snap, but they failed. So I ended up using Netlify prerendering feature. It works just fine.

Also, react-helmet inserts meta tags in the end of a header. But most of the crawlers limits their search. At least Facebook couldn't find my headers after gatsby's inlined styles. So I wrote some plain simple helpers for tags inserting. You may find them in components/seo/seo.tsx.

I introduced some great free services for site monitoring: hotjar, heap, google-analytics and google tagmanager. I recommend you to use tagmanager whenever you need to insert static meta tags. It is very convenient. I installed Google Optimiser, Conversion Linker and Facebook Pixel with this. And Facebook Pixel now works fine. But you can try [gatsby-plugin-facebook-analytics](https://www.gatsbyjs.org/packages/gatsby-plugin-facebook-analytics/?=#gatsby-plugin-facebook-analytics). I didn't manage it, though. It fails with Facebook Pixel Helper. Maybe it is my fault.

I checked my blog's SEO health with:

1. [OpenLink Structured Data Sniffer](http://osds.openlinksw.com/)
2. [SEOQuake](https://www.seoquake.com/index.html)
3. [Google's Structured Data testing tool](https://search.google.com/structured-data/testing-tool#url=victoriaz.netlify.com%2Frepositories)
4. [Dareboost](www.dareboost.com)
5. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/sharing/)
6. [Twitter Card Validator](https://cards-dev.twitter.com/validator)
7. Screaming Frog

And a bunch of other tools!

#### Posts

To define custom tags you need to write them in every post in the block at the beginning of the post. Like this:

```markdown
---
title: "What Are They, Monads, Angels or Demons?"
date: "2018-03-26T10:30:00.000Z"
author: "Zakharova Victoria"
path: "/monads"
featuredImage: "./angels.jpg"
tags: ["monads", "Scala"]
---
```
Every post has it's featured image, which will be shown on the Home page and in the post itself. You should it define in the every post too.

#### Plugins

Your plugins can be configurated in gatsby-node.js.

1. gatsby-source-github-api
You must provide token and graphQL query.

2. gatsby-plugin-webpack-bundle-analyzer
Is disabled by default. If you need it, change the value of the "disable" parameter.

3. gatsby-plugin-google-analytics
You must provide trackingId.

4. gatsby-plugin-facebook-analytics
You must provide appId.

5. gatsby-plugin-mixpanel 
You must provide apiToken.

6. gatsby-plugin-feed 
Write a query.

7. gatsby-plugin-hotjar 
Provide an id.
        
#### Social

For social buttons is used addthis service. You can configure it in templates/post.tsx.

For social icons is used fontawesome. You can configure it in components/socialButtons/socialButtons.tsx

In the file parser/parser.tsx is stored a parser for github API.

#### Embed 

You can include or exclude scripts for embed links from templates/post.tsx. 

Oh, I forgot some issues. The first one with repositories' readme. Starter doesn't fetch images and code from readme, it fetches text anyway, but I hope I find time to deal with it.
And the second one is performance. The blog is not notoriously slow, but doesn't perform as fast as I expected. I think, tree-shaking could improve the situation, but Gatsby, unfortunately, still uses Webpack 1.
So, if anyone can advise me how to speed up the blog, it will be great.

### Enjoi!