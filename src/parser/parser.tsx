import * as React from "react"
import * as ReactDOM from "react-dom"
import * as ReactMarkdown from "react-markdown"

/**
 * Parses raw data and returns usable data for the page
 * @param Object rawData raw Data
 * @ return Object
 */
export const parseData = rawData => {
  const data = rawData.githubData.data
  const repositories = data.user.repositories.edges.map(edge =>
    parseReadme(parseName(edge.node))
  )
  return { repositories }
}

/**
 * Get an array of image urls from markdown text (usually a README)
 * @param {String} s The markdown text as a string
 * @return {Array<String>} An array of image urls
 */
export const getImagesFromMarkdown = s => {
  // notice the 4 capturing groups of this regular expression
  const regex = /(!\[.*?\]\()(.+?)(\))/g
  const imageUrls = []
  let match
  // we get the urls from the 3rd captured group
  while ((match = regex.exec(s))) {
    imageUrls.push(match[2])
  }
  return imageUrls
}

/**
 * Parse the name inside an object by cleaning it
 * @param {Object} o object input
 * return {Object}
 */
export const parseName = o =>
  o.name ? Object.assign({}, o, { name: o.name.replace(/-/g, " ") }) : o

/**
 * Parse the readme inside an object and add imageUrls to it if possible
 * @param {Object} o object input
 * return {Object}
 */
export const parseReadme = o =>
  o.readme
    ? Object.assign({}, o, {
        readme: {
          text: <ReactMarkdown source={o.readme.text} />,
          // getImagesFromMarkdown will always return at least an empty array.
          // Therefore, we attempt to get the first image
          imageUrl: getImagesFromMarkdown(o.readme.text)[0],
        },
      })
    : o
