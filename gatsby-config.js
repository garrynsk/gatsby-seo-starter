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
        headerBackground: config.headerBackground,
        algoliaAppId: config.algoliaAppId,
        algoliaApiKey: config.algoliaApiKey,
        disqusShortname: config.disqusShortname,
        facebookUrl: config.facebookUrl,
        linkednUrl: config.linkednUrl,
        twitterUrl: config.twitterUrl,
        githubUrl: config.githubUrl,
    },
    plugins: [
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-offline`,
        //`gatsby-plugin-debug-build`,
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
                trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
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
                    "gatsby-remark-prismjs",
                    `gatsby-remark-autolink-headers`,
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
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
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
                appId: "YOUR_APP_ID",
                // Include facebook analytics in development.
                // Defaults to false meaning the library will only be loaded in production.
                includeInDevelopment: false,
                // Include debug version of sdk
                // Defaults to false meaning the library will load sdk.js
                debug: false,
                // Can select your language, default will load english
                language: "en_US",
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: "GatsbyJS",
                short_name: "GatsbyJS",
                start_url: "/",
                background_color: "#f7f0eb",
                theme_color: "#a2466c",
                display: "minimal-ui",
                icons: [{
                        // Everything in /static will be copied to an equivalent
                        // directory in /public during development and build, so
                        // assuming your favicons are in /static/favicons,
                        // you can reference them here
                        src: `src/static/img/colored-feather-64-147313.png`,
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
