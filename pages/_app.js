import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp({Component, pageProps}) {
    const [token, setToken] = React.useState(null);
    React.useEffect(() => {
        setToken(localStorage.getItem('jwt'));
    }, [])
    return (
        <Component {...pageProps} token={token} />
    )
}

MyApp.getInitialProps = async ({Component, ctx}) => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    //Anything returned here can be access by the client
    return {pageProps: pageProps};
}


export default MyApp
