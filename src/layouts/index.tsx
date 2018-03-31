import * as React from "react"
import {Component} from "react"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import Sidebar from "../components/sidebar/sidebar"
import Helmet from "react-helmet"
import { MuiThemeProvider } from 'material-ui/styles'
import styled from "styled-components"
import Typography from 'material-ui/Typography';
import CssBaseline from 'material-ui/CssBaseline';
import getPageContext from '../getPageContext.js';
import "./index.css"

const Content = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  grid-area: content;
  margin-bottom: 50vh;
`

const Default = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-areas: "header  header" "sidebar content" "footer  footer";
  transform: translateY(10);
  animation: default 0.5s both;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 3fr;
    grid-template-areas: "header  header" "content content" "sidebar sidebar" "footer footer";
  }

  @keyframes default {
    from {
        filter: blur(20px);
    }
    to {
        filter: blur(0px);
    }
  }

`

export default class Index extends React.Component {
  pageContext: null 

    constructor({ children, data }) {
      super({ children, data} )
      this.state = {
        metaData: data.site.siteMetadata,
        children: children,
        onScreen: false,
      }
    }

    componentWillMount = () => {
      this.pageContext = this.pageContext || getPageContext();
    }

    componentDidMount = () => {
      window.addEventListener('scroll', () => this.handleScroll(this.isOnScreen));

      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }
  
    isOnScreen = (element) => {
      const bounds = element.getBoundingClientRect()
      const y = bounds.y
      const bottom = window.innerHeight - bounds.bottom
      this.setState({onScreen: y + bounds.height / 2 > 0 && bottom + bounds.height / 2 > 0})
    }

    handleScroll = (func) => {
      const els = document.getElementsByClassName("image")
      Array.prototype.forEach.call(els, (element) => {
        func(element)
        if (this.state.onScreen === true) {
          element.classList.remove("blur")
        } else {
          element.classList.add("blur")
        }
      })
    }

    render() {
      const {metaData, children, onScreen} = this.state;

      return (
        <MuiThemeProvider
        theme={this.pageContext.theme}
        sheetsManager={this.pageContext.sheetsManager}
      ><div>
        {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Default>
          <Header title={metaData.siteTitle} blogLink={metaData.siteUrl} />
          <Sidebar
            algoliaAppId={metaData.algoliaAppId}
            algoliaApiKey={metaData.algoliaApiKey}
          />
          <Content>{children()}</Content>
  
          <Footer socialLinks={metaData.socialLinks} />
    
        </Default>
        </div>
       </MuiThemeProvider>
      )
    }
}

export const query = graphql`
  query IndexLayoutQuery {
    site {
      siteMetadata {
        siteUrl
        siteTitle
        userEmail
        userName
        userMoto
        avatar
        year
        algoliaAppId
        algoliaApiKey
        socialLinks {
          label
          url
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          headings {
            depth
            value
          }
          frontmatter {
            title
            tags
            date(formatString: "MMMM DD, YYYY")
            path
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
    }
  }
`
