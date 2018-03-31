import * as React from "react"
import styled from "styled-components"
import Typography from 'material-ui/Typography';
import plane from "./img/Flying_Herk_in_the_Clouds.svg"
import flock from "./img/flock-grey.png"

const Plane = styled.img`
  position: fixed;
  margin-top: 30px;
  width: 10%;
  z-index: -1;
  opacity: 0.6;
  width: 15%;

  @media (max-width: 1200px) {
    width: 20%;
  }

  @media (max-width: 1000px) {
    display: none;
  }

`

const Header = styled.div`
  width: 100%;
  height: 25vh;
  grid-area: header;
  color: #0B6623;
`

const Title = styled(Typography) `
   
`
const ResizesTitle = styled.div `
  z-index: 1;
  padding-top: 5vh;
  padding-left: 3vw;
  font-size: 150%;

  @media (max-height: 700px) {
    font-size: 80%;
  }
`

const BlogLink = styled.a`

`

const Flock = styled.img`
  z-index: -1;
  position: relative;
  float: right;
  opacity: 0.6;
  margin-top: -25vh;

  @media (max-width: 1400px) {
    display: none;
  }

  @media (max-height: 760px) {
    display: none;
  }
`

export default ({ title, blogLink }) => (
  <Header >
    <Plane src="./img/Flying_Herk_in_the_Clouds.svg" />
    
    <Title variant="title" color = "primary" gutterBottom>
      <BlogLink href={blogLink}>
        <ResizesTitle>{title}</ResizesTitle>      
      </BlogLink>
    </Title>
    

    <Flock src="./img/flock-grey.png" alt="flock" />
  </Header>
)
