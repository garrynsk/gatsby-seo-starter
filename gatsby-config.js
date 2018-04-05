const config = require("./config")

const query = `query {
  allMarkdownRemark {
    edges {
      node {
        excerpt(pruneLength: 250)
        id
        frontmatter {
          title
          tags
          path
        }
      }
    }
  }
}`;

const queries = [{
    query,
    transformer: ({
        data
    }) => data.allMarkdownRemark.edges.map(({
        node
    }) => node),
}, ];

module.exports = {
    pathPrefix: config.pathPrefix,
    siteMetadata: {
        siteUrl: config.siteUrl,
        siteUrlShort: config.siteUrlShort,
        siteTitle: config.siteTitle,
        siteTitleAlt: `Scala programming blog - VictoriaZ`,
        siteDescription: config.siteDescription,
        siteLogo: config.siteLogo,
        siteKeyWords: config.siteKeyWords,
        favicon: config.favicon,
        userEmail: config.userEmail,
        userName: config.userName,
        userMoto: config.userMoto,
        avatar: config.avatar,
        year: config.year,
        algoliaAppId: config.algoliaAppId,
        algoliaApiKey: config.algoliaApiKey,
        disqusShortname: config.disqusShortname,
        socialLinks: config.socialLinks,
        title: config.siteTitle,
        description: config.siteDescription,
    },
    plugins: [
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-offline`,
        //`gatsby-plugin-debug-build`,
        `gatsby-plugin-twitter`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-typescript`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-catch-links`,
        {
            resolve: 'gatsby-plugin-purify-css',
            options: {
              /* Defaults */
              styleId: 'gatsby-inlined-css',
              purifyOptions: {
                info: true,
                minify: true
              }
            }
          },
          {
            resolve: 'gatsby-plugin-mixpanel',
            options: {
              apiToken: 'ccc51377775adf9ac103654869aaff63',
              pageViews: {
                '/monads': 'Monads article view', // an event 'Page blog view' will be send to mixpanel a every vist on the /blog page
                '/about': 'Page about view',
              }
            },
          },
        {
        resolve: `gatsby-plugin-feed`,
        options: {
            query: `
              {
                site {
                  siteMetadata {
                    title
                    description
                    siteUrl
                    site_url: siteUrl
                  }
                }
              }
            `,
            feeds: [
              {
                serialize: ({ query: { site, allMarkdownRemark } }) => {
                  return allMarkdownRemark.edges.map(edge => {
                    return Object.assign({}, edge.node.frontmatter, {
                      description: edge.node.excerpt,
                      url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                      custom_elements: [{ "content:encoded": edge.node.html }],
                    });
                  });
                },
                query: `
                  {
                    allMarkdownRemark(
                      limit: 1000,
                      sort: { order: DESC, fields: [frontmatter___date] },
                    ) {
                      edges {
                        node {
                            excerpt(pruneLength: 250)
                            html
                            frontmatter {
                                date
                                title
                                tags
                            }
                        }
                      }
                    }
                  }
                `,
                output: "/rss.xml",
              },
            ],
          },
        },
        {
            resolve: `gatsby-plugin-algolia`,
            options: {
                appId: process.env.ALGOLIA_APP_ID,
                apiKey: process.env.ALGOLIA_API_KEY,
                indexName: "myblog",
                queries,
                chunkSize: 10000, // default: 1000
            },
        },
        {
            resolve: `gatsby-source-github-api`,
            options: {
                // token: required by the GitHub API
                token: process.env.GITHUB_TOKEN,

                // GraphQLquery: defaults to a search query
                graphQLQuery: `query ($author: String = "garrynsk", $first: Int = 20) {
                  user(login: $author) {
                    repositories(first: $first, orderBy: {field: NAME, direction: DESC}) {
                      edges {
                        node {
                          name
                          description
                          url
                          readme: object(expression: "master:README.md") {
                            ... on Blob {
                              text
                            }
                          }
                        }
                      }
                    }
                  }
                }
                `,
                variables: {
                    author: config.githubAuthor,
                    first: 20,
                },
            },
        },

        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/posts/`,
                name: "content",
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/static/img/`,
                name: "img",
            },
        },
        {
            resolve: `gatsby-plugin-webpack-bundle-analyzer`,
            options: {
                analyzerPort: 3000,
                disable: true,
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: config.googleAnalyticsID,
                // Puts tracking script in the head instead of the body
                head: true,
                // Setting this parameter is optional
                anonymize: true,
                // Setting this parameter is also optional
                respectDNT: true,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [

                    `gatsby-remark-autolink-headers`,
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: "language-scala",
                            inlineCodeMarker: '>',
                            aliases: {
                                scala: "scala"
                            },
                        },
                    },
                    `gatsby-remark-copy-linked-files`,
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 590,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-image`,
                        options: {
                            maxWidth: 590,
                        },
                    },
                    {
                        resolve: `gatsby-remark-smartypants`,
                        options: {
                            dashes: "oldschool",
                            quotes: true,
                            ellipses: true,
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-remark-prismjs`,
            options: {
                inlineCodeMarker: ">",
            },
        },
        {
            resolve: `gatsby-plugin-facebook-analytics`,
            options: {
                appId: config.facebookAnalyticsID,
                includeInDevelopment: false,
                debug: false,
                language: "en_US",
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: "GatsbyJS",
                short_name: "GatsbyJS",
                start_url: "/",
                background_color: "#fff",
                theme_color: "#fff",
                display: "minimal-ui",
                icons: [{
                        src: `src/favicon.png`,
                        sizes: `192x192`,
                        type: `image/png`,
                    },

                ],
            },
        },
        {
            resolve: `gatsby-plugin-netlify`,
            options: {
              headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
              allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
              mergeSecurityHeaders: true, // boolean to turn off the default security headers
              mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
              mergeCachingHeaders: true, // boolean to turn off the default caching headers
              transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
              generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
            },
          },
          {
            resolve: `gatsby-plugin-favicon`,
            options: {
              logo: "./src/favicon.png",
              injectHTML: true,
              icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                twitter: true,
                yandex: true,
                windows: true
              }
            }
          }
    ],
}
