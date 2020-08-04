import React, {useState} from "react";
import Layout from "../layouts/Master";
import {Card, CardBody, FormGroup} from "reactstrap";
import axios from "axios";
import { useRouter } from 'next/router'
const INITIAL_VALUE = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
}

function Register() {
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
        await axios.post('http://127.0.0.1:8000/api/register', user, {
            headers: {
                ContentType: 'application/json',
                Accept: 'application/json'
            }
        }).then((res) => {
            console.log(res)
            setLoading(false);
            router.push('/login')
        }).catch(e => {
            console.error(e)
            setLoading(false);
        })
    }

    return  (
        <Layout>
            <Card style={{width: '60%', margin: 'auto', textAlign: 'center', marginTop: '5%'}}>
                <CardBody>
                    <form onSubmit={handleSubmit} className="form-signin">
                        <h1 className="h3 mb-3 font-weight-normal">Free register</h1>
                        <FormGroup>
                            <label htmlFor="inputName" className="sr-only">Name</label>
                            <input type="text" id="inputName"
                                   className="form-control"
                                   name={'name'}
                                   value={user.name}
                                   onChange={handleChange}
                                   placeholder="Name" required
                                   autoFocus/>
                        </FormGroup>
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
                                   className="form-control"
                                   onChange={handleChange}
                                   name={'password'}
                                   placeholder="Password"
                                   required/>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="inputPasswordConfirmation" className="sr-only">Confirm Password</label>
                            <input type="password"
                                   id="inputPasswordConfirmation"
                                   className="form-control"
                                   name={'password_confirmation'}
                                   onChange={handleChange}
                                   placeholder="Confirm Password"
                                   required/>
                        </FormGroup>
                        <button disabled={loading} className="btn btn-lg btn-primary btn-block" type="submit">
                            {loading ? 'Creating...' : 'Create'}
                        </button>
                    </form>
                </CardBody>
            </Card>
        </Layout>
    )
}

export default Register