import * as React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { withTheme } from 'material-ui/styles';

const Underline = styled.div`
    padding-bottom: 10%;
    :after {
        content: '\00a0';
        background:
        radial-gradient(at 50% 0,  blue 0%,  
            ${(props) => props.theme.palette.primary.main} 50%, transparent 75%);
        background-size: 100% 2px;
        float:left;
        width:100%;
    }   
`


const Image = styled(Img)`
        box-shadow: 5px 5px 13px #000;

    `

const StyledUnderline = withTheme()(Underline)
export default ({featuredImage}) => {

    return (
    <StyledUnderline>
        <Image
          className="image"
          alt={featuredImage.name}
          sizes={featuredImage.childImageSharp.sizes}
        />
    </StyledUnderline>

)
}
