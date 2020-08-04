import Document, {Head, Main, NextScript} from "next/document";
// styled-jsx included in Next.js by default
import React from "react";
import {getSessionFromServer, getUserScript} from "../lib/auth";

class MyDocument extends Document {
    static getInitialProps = ctx => {
        const user = getSessionFromServer(ctx.req);

        // Render app and page and get the context of the page with collected side effects.
        const page = ctx.renderPage(Component => {
            return props => {
                return <Component {...props} />;
            };
        });

        return {
            ...user,
            ...page
        };
    };

    render() {
        const { user = {}} = this.props;

        return (
            <html lang="en" dir="ltr">
            <Head>
                {/* You can use the head tag, just not for setting <title> as it leads to unexpected behavior */}
                <meta charSet="utf-8"/>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />

                <meta
                    name="description"
                    content="A social media site built with Next.js"
                />
            </Head>
            <body>
            <Main/>
            <script dangerouslySetInnerHTML={{__html: getUserScript(user)}}/>
            <NextScript/>
            </body>
            </html>
        );
    }
}

export default MyDocument;
