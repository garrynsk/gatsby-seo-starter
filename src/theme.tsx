import styled from "styled-components"

export const theme = {
    typography: {
        // Use the system font over Roboto.
        fontFamily: "Cutive Mono, monospace",
        fontSize: 20,
     
        display1: {
          fontFamily: "Share Tech Mono, monospace",
          textTransform: "capitalize",
        },
    
        display2: {
          fontFamily: "Share Tech Mono, monospace",
          textTransform: "capitalize",
        },
    
        display3: {
          fontFamily: "Share Tech Mono, monospace",
          textTransform: "capitalize",
        },
    
        display4: {
          fontFamily: "Share Tech Mono, monospace",
          textTransform: "capitalize",
        },
    
        headline: {
          fontFamily: "Share Tech Mono, monospace",
        },
    
        title: {
          fontFamily: "Share Tech Mono, monospace",
        },
    
        subheading: {
          fontFamily: "Share Tech Mono, monospace",
        },
    
        caption: {
          fontFamily: "Share Tech Mono, monospace",
          fontSize: "18px",
        },
      },
    palette:{
        background: "#fff",
        primary: {
            // light: will be calculated from palette.primary.main,
            main: "#F50057",
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contast with palette.primary.main
          },
          secondary: {
            // light: "#",
            main: "#7500B9",
            // dark: will be calculated from palette.secondary.main,
            // contrastText: "#FFF",
          },
    },
    grid: {
        footer: {
            height: "50px",

        }

    }
}
