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
        siteTitle: config.siteTitle,
        userEmail: config.userEmail,
        userName: config.userName,
        userMoto: config.userMoto,
        avatar: config.avatar,
        year: config.year,
        algoliaAppId: config.algoliaAppId,
        algoliaApiKey: config.algoliaApiKey,
        disqusShortname: config.disqusShortname,
        socialLinks: config.socialLinks,
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
                head: false,
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
                        src: `src/static/img/colored-feather-48-147313.png`,
                        sizes: `192x192`,
                        type: `image/png`,
                    },
                    {
                        src: `src/static/img/colored-feather-152-14731.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-nprogress`,
            options: {
                // Setting a color is optional.
                color: `tomato`,
                // Disable the loading spinner.
                showSpinner: false,
            },
        },
    ],
}
