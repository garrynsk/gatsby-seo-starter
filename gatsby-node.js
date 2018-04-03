const path = require("path")
const _ = require("lodash")

exports.createPages = ({
    boundActionCreators,
    graphql
}) => {
    const {
        createPage
    } = boundActionCreators
    const blogPostTemplate = path.resolve(`src/templates/post.tsx`)
    const tagTemplate = path.resolve("src/templates/tags.tsx")

    graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            frontmatter {
              date
              path
              title
              tags
              featuredImage {
                name
                relativePath
                absolutePath
              }
            }
          }
        }
      }
    }
  `).then(result => {
        if (result.errors) {
            console.log(result.errors)
            return Promise.reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges

        // Create post detail pages
        posts.forEach(({
            node
        }) => {
            createPage({
                path: node.frontmatter.path,
                component: blogPostTemplate,
            })
        })

        // Tag pages:
        let tags = []
        // Iterate through each post, putting all found tags into `tags`
        _.each(posts, edge => {
            if (_.get(edge, "node.frontmatter.tags")) {
                tags = tags.concat(edge.node.frontmatter.tags)
            }
        })
        // Eliminate duplicate tags
        tags = _.uniq(tags)

        // Make tag pages
        tags.forEach(tag => {
            createPage({
                path: `/tags/${_.kebabCase(tag)}/`,
                component: tagTemplate,
                context: {
                    tag,
                },
            })
        })
    })
}



