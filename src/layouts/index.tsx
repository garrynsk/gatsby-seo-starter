import * as React from "react"
import { Component } from "react"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import Sidebar from "../components/sidebar/sidebar"
import { MuiThemeProvider } from "material-ui/styles"
import styled from "styled-components"
import withRoot from "../withRoot"
import "./normalize.css"
import "./code-highlight-scala.css"
import "./layout.css"
import "./spinner.css"
import { withPrefix } from 'gatsby-link'

const Content = styled.div`

  grid-area: content;
  margin-bottom: 5%;

`

const Default = styled.div`
  display: grid;
  grid-template-columns: 20% 10% 70%;
  grid-template-areas: "header header header" "sidebar gap content" "footer footer footer";
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

class Index extends React.Component {

  constructor({ children, data }) {
    super({ children, data })
    this.state = {
      metaData: data.site.siteMetadata,
      children: children,
      onScreen: false,
      loading: true,
    }
  }

  mountHojar = () => {
    const script = document.createElement("script")
    script.innerHTML = 
         ` (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:834359,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
      
    script.defer = true
    script.async = true
    script.type = "text/javascript"
    document.body.appendChild(script)
  }

  componentDidMount = () => {
    window.addEventListener("scroll", () => this.handleScroll(this.isOnScreen))
   //this.mountHojar()
    this.setState({
      loading: false,
    })
  }

  isOnScreen = element => {
    const bounds = element.getBoundingClientRect()
    const y = bounds.y
    const bottom = window.innerHeight - bounds.bottom
    this.setState({
      onScreen: y + bounds.height / 2 > 0 && bottom + bounds.height / 2 > 0,
    })
  }

  handleScroll = func => {
    const els = document.getElementsByClassName("image")
    Array.prototype.forEach.call(els, element => {
      func(element)
      if (this.state.onScreen === true) {
        element.classList.remove("blur")
      } else {
        element.classList.add("blur")
      }
    })
  }

  render() {
    const { metaData, children, onScreen, loading } = this.state

    return (
        <div>
          {loading ? <div className="loading">Loading&#8230;</div>
            :
          <Default>
            
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N6CD8NJ"
            height="0" width="0" style={{display: "none", visibility: "hidden"}}></iframe></noscript>

            <Header title = {metaData.siteTitle} blogLink = {metaData.siteUrl} />
            <Sidebar
              algoliaAppId={metaData.algoliaAppId}
              algoliaApiKey={metaData.algoliaApiKey}
            />
            <Content>{children()}</Content>
            <Footer socialLinks={metaData.socialLinks} /> 
          </Default>  }
        </div>
    )
  }
}

export default withRoot(Index)


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
