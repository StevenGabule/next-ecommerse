import React from "react";
import Header from "./Header";
import {Container} from "reactstrap";

function Layout({title, children}) {
    return (
        <>
            <Header />
            <Container>
                {children}
            </Container>
        </>
    )
}

export default Layout;