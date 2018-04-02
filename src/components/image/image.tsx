import * as React from "react"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { theme } from "../../theme"
import Img from "gatsby-image"

const ImageBorder = styled.div`

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

    box-shadow: ${(props) => props.theme.shadow.smallGrey};

`

export default ({featuredImage}) =>  (
    <ThemeProvider theme={theme}>
        <ImageBorder>
            <Image
                className="image"
                alt={featuredImage.name}
                sizes={featuredImage.childImageSharp.sizes}
            />
        </ImageBorder>
    </ThemeProvider>
)

