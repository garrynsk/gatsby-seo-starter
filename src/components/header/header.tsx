import * as React from "react"
import styled from "styled-components"
import Typography from "material-ui/Typography"
import plane from "./img/Flying_Herk_in_the_Clouds.svg"
import Navigation from "../navigationTop/navigationTop"

const Plane = styled.img`
  position: fixed;
  z-index: -1;
  opacity: 0.6;
  width: 15%;
  left:5%;
  top:10%;

  @media (max-width: 1200px) {
    width: 20%;
  }

  @media (max-width: 1000px) {
    display: none;
  }
`

const Header = styled.div`
  width: 100%;
  height: 30%;
  grid-area: header;
  color: #0b6623;
  text-align: right;
`

const Title = styled(Typography)`
  
`
const ResizesTitle = styled.div`
  z-index: 1;
  padding-top: 10%;
  padding-bottom: 10%;
  font-size: 150%;
  padding-right: 5%;
  
  @media (max-width: 700px) {
    padding-top: 15%;
    font-size: 80%;
  }

`

const BlogLink = styled.a``


export default ({ title, blogLink }) => (
  <Header>
    <Plane src="./img/Flying_Herk_in_the_Clouds.svg" />

    <Title variant="title" color="primary" gutterBottom>
      <BlogLink href={blogLink}>
        <ResizesTitle>{title}</ResizesTitle>
      </BlogLink>
    </Title>
    <Navigation/>
  </Header>
)
