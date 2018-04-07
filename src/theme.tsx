import styled from "styled-components"
import * as React from "react"
import Link from "gatsby-link"

export const theme = {
    typography: {
        // Use the system font over Roboto.
        fontFamily: "CutiveMono",
        fontSize: "1.2em",
        mobileFontSize: "0.9em",
        lineHeight: "1.5em",
        mobileLineHeight: "1.4em",
        titleFontFamily:  "ShareTechMono",
        display1: {
          fontFamily:  "ShareTechMono",
          textTransform: "capitalize",
        },
    
        display2: {
          fontFamily:  "ShareTechMono",
          textTransform: "capitalize",
        },
    
        display3: {
          fontFamily:  "ShareTechMono",
          textTransform: "capitalize",
        },
    
        display4: {
          fontFamily:   "ShareTechMono",
          textTransform: "capitalize",
        },
    
        headline: {
          fontFamily:  "ShareTechMono",
        },

    
        subheading: {
          fontFamily:  "ShareTechMono",
        },
    
        caption: {
          fontFamily:   "ShareTechMono",
          fontSize: "18px",
        },
      },

    palette:{
        background: "#fff",
        primary: {
            light: "#0b6623",
            main: "#F50057",
            dark: "#000",
            // contrastText: will be calculated to contast with palette.primary.main
          },
        secondary: {
            light: "#888",
            main: "#7500B9",
            // dark: will be calculated from palette.secondary.main,
            // contrastText: "#FFF",
        },
    },
    grid: {
        footer: {
            height: "50px",
        },
        header: {
            height: "30%",
        },
        paddingRight: "60px",
        paddingLeft: "20px",

    },
    screen: {
        px500: "500px",
        px700: "700px",
        px1000: "1000px",
        px1200: "1200px",
        px1500: "1500px",

    },
    shadow: {
        smallGrey: "5px 5px 13px #000;",

    },
}


export const LocalLink = styled.a`
    color: ${(props) => props.theme.palette.primary.dark};
    :hover{
        color:  ${(props) => props.theme.palette.primary.main};
    }
`

export const GBLink = ({className, children, to}) => (
    <Link to = {to} className={className}>{children}</Link>

)

export const GatsbyLink = styled(GBLink)``

export const Title = styled.div`
    
    font-size: 2em;
    font-family: ${(props) => props.theme.typography.titleFontFamily};
    
    color: ${(props) => props.theme.palette.primary.dark};
    text-transform: capitalize;

    @media (max-width: ${(props) =>  props.theme.screen.px1000}) {
        font-size: 1.2em;
        line-height: 1.3em;
    }
`

export const BlogTitle = Title.extend`
  font-size: 2em;


`

export const PostTitle = Title.extend`
    font-size: 2em;

`

export const Date = styled.div`
    font-size: 1.2em;
    font-style: italic;
    font-family: ${(props) => props.theme.typography.fontFamily};


    color: ${(props) => props.theme.palette.secondary.light};
    padding-top: 6px;
    padding-bottom: 2px;

    @media (max-width: 1000px) {
        font-size: 0.8em;
        line-height: 1em;
    }
`

export const Tag =  styled.span`

    font-size: 1em;
    font-family: ${(props) => props.theme.typography.fontFamily};

    color: ${(props) => props.theme.palette.primary.main};
    :hover{
        color: ${(props) => props.theme.palette.primary.main};
    }

    @media (max-width: ${(props) =>  props.theme.screen.px1000}) {
        font-size: 0.6em;
    }
`

export const CasualText = styled.div`

    font-size: ${(props) => props.theme.typography.fontSize};
    font-family: ${(props) => props.theme.typography.fontFamily};

    color: ${(props) => props.theme.palette.primary.dark};
    
    line-height: ${(props) => props.theme.typography.lineHeight};

    @media (max-width: ${(props) =>  props.theme.screen.px1000}) {
        font-size: ${(props) => props.theme.typography.mobileFontSize};
        line-height: ${(props) => props.theme.typography.mobileLineHeight};
    }
`
