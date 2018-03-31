import * as React from 'react';
import {
    renderToString
} from 'react-dom/server';
import {
    JssProvider
} from 'react-jss';
import * as getPageContext from './src/getPageContext';
import {
    ServerStyleSheet,
    StyleSheetManager
  } from 'styled-components'
  
export default ({
    bodyComponent,
    replaceBodyHTMLString,
    setHeadComponents
}) => {
    // Get the context of the page to collected side effects.
    const pageContext = getPageContext();
    const sheet = new ServerStyleSheet()

    const bodyHTML = renderToString( <
        JssProvider registry = {
            pageContext.sheetsRegistry
        }
        generateClassName = {
            pageContext.generateClassName
        } ><StyleSheetManager sheet = {
            sheet.instance
        } >
        {
            React.cloneElement(bodyComponent, {
                pageContext,
            })
        } < /StyleSheetManager></JssProvider>,
    );


    replaceBodyHTMLString(bodyHTML);
    setHeadComponents(
        [ <
            style
            type = "text/css"
            id = "server-side-jss"
            key = "server-side-jss"
            dangerouslySetInnerHTML = {
                {
                    __html: pageContext.sheetsRegistry.toString()
                }
            }
            />,
            sheet.getStyleElement({
                compact: process.NODE_ENV === 'production',
            }),
        ]);
};
