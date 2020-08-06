import React from "react";
import Header from "./Header";
import {Container} from "reactstrap";

function Layout({auth={}, title, children, token=null}) {
    return (
        <>
            <Header auth={auth} token={token} />
            <Container>
                {children}
            </Container>
        </>
    )
}

export default Layout;