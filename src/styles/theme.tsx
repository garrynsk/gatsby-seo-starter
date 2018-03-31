import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import * as React from "react"

export default createMuiTheme({
  overrides: {

    MuiMenuItem: {
      root: {

        marginBottom: "1px",
      },
    },
  },
    typography: {
      // Use the system font over Roboto.
        fontFamily: 'Cutive Mono, monospace',
        fontSize: 20,

        display1: {
            fontFamily: 'Share Tech Mono, monospace',
            textTransform: "capitalize",
        }, 
        
        display2: {
            fontFamily: 'Share Tech Mono, monospace',
            textTransform: "capitalize",
        }, 
        
        display3: {
            fontFamily: 'Share Tech Mono, monospace',
            textTransform: "capitalize",
        },
        
        display4: {
            fontFamily: 'Share Tech Mono, monospace',
            textTransform: "capitalize",
        },
        
        headline: {
            fontFamily: 'Share Tech Mono, monospace',
        }, 
        
        title: {
            fontFamily: 'Share Tech Mono, monospace',
        },

        subheading: {
            fontFamily: 'Share Tech Mono, monospace',
        },

        caption: {
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: "18px",
        },
      },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#0B6623',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#333',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will us the default color
  },
});
