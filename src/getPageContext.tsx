import { SheetsRegistry } from "jss"
import { createMuiTheme, createGenerateClassName } from "material-ui/styles"

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
      root: {
        marginBottom: "1px",
      },
    },
    MuiTextField: {
      underlineStyle: {
        color: "primary",
      },
    },
  },
  typography: {
    // Use the system font over Roboto.
    fontFamily: "CutiveMono",
    fontSize: 20,

    display1: {
      fontFamily: "ShareTechMono",
      textTransform: "capitalize",
    },

    display2: {
      fontFamily: "ShareTechMono",
      textTransform: "capitalize",
    },

    display3: {
      fontFamily: "ShareTechMono",
      textTransform: "capitalize",
    },

    display4: {
      fontFamily: "ShareTechMono",
      textTransform: "capitalize",
    },

    headline: {
      fontFamily: "ShareTechMono",
    },

    title: {
      fontFamily: "ShareTechMono",
    },

    subheading: {
      fontFamily: "ShareTechMono",
    },

    caption: {
      fontFamily: "ShareTechMono",
      fontSize: "18px",
    },
  },
  palette: {
    background: {
      default: "#fff",
    },

    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#F50057",
       dark: "#000",
      // contrastText: will be calculated to contast with palette.primary.main
    },
    secondary: {
      //light: "#FFF",
      main: "#F50057",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#FFF",
    },
    // error: will us the default color
  },
})

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  }
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext()
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext()
  }

  return global.__INIT_MATERIAL_UI__
}
