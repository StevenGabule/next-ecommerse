import React, {useEffect, createContext} from "react";
import Layout from "../layouts/Master";
import {Card, CardBody, CardImg} from "reactstrap";
import {authInitialProps} from "../lib/auth";


export default function Home({auth={}, userId, products, token}) {
    return (
        <Layout auth={auth} token={token}>
            <h4>All Products</h4>
            <div className="row row-cols-1 row-cols-md-4">
                {products.map(({name, avatar, price}, i) => (
                    <div className={'col mb-4'} key={i}>
                        <Card>
                            <CardImg top width={'100%'} src={avatar} alt={name}/>
                            <CardBody>
                                <h4>{name}</h4>
                                <p>Price: {price}</p>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

/*export async function getStaticProps() {
    const {data} = await axios.get('http://127.0.0.1:8000/api/products');
    return {
        props: {...data}
    }
}*/

Home.getInitialProps = authInitialProps();


