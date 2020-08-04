import React, {useState} from "react";
import Layout from "../layouts/Master";
import {Card, CardBody, FormGroup} from "reactstrap";
import {useRouter} from 'next/router'
import {signInUser} from "../lib/auth";

const INITIAL_VALUE = {
    email: '',
    password: '',
}

function Login() {
    const [user, setUser] = useState(INITIAL_VALUE);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    function handleChange(e) {
        const {name, value} = e.target;
        setUser(prevState => ({...prevState, [name]: value}));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const payload = {...user};
        signInUser(payload).then(_ => {
            router.push('/');
        }).catch(err => console.error(err))
        /* await axios.post('http://127.0.0.1:8000/api/login', user, {
             headers: {
                 ContentType: 'application/json',
                 Accept: 'application/json'
             }
         }).then(({data}) => {
             saveUserData(data)
             router.push('/');
             setLoading(false);
         }).catch(e => {
             console.error(e)
             setLoading(false);
         })*/
    }

    return (
        <Layout>
            <Card style={{width: '60%', margin: 'auto', textAlign: 'center', marginTop: '10%'}}>
                <CardBody>
                    <form onSubmit={handleSubmit} className="form-signin">
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <FormGroup>
                            <label htmlFor="inputEmail" className="sr-only">Email address</label>
                            <input type="email" id="inputEmail"
                                   className="form-control"
                                   name='email'
                                   value={user.email}
                                   onChange={handleChange}
                                   placeholder="Email address" required
                                   autoFocus/>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password"
                                   id="inputPassword"
                                   onChange={handleChange}
                                   name={'password'}
                                   className="form-control"
                                   placeholder="Password"
                                   required/>
                        </FormGroup>
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">
                            {loading ? 'signing...' : 'Sign in'}
                        </button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
                    </form>
                </CardBody>
            </Card>
        </Layout>
    )
}

export default Login