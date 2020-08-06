import router from "next/router";
import axios from 'axios';
import Cookie from 'js-cookie';
import {saveUserData} from "./index";

const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";


axios.defaults.headers.common = {
    ContentType: 'application/json',
    Accept: 'application/json'
};

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

export const getUserScript = user => {
    return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)};`;
};

export const getSessionFromServer = req => {
    if (req.user) {
        return {user: req.user};
    }
    return {};
};

export const getSessionFromClient = () => {
    if (typeof window !== "undefined") {
        const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {};
        return {user};
    }
    return {user: {}};
};

const redirectUser = (res, path) => {
    if (res) {
        res.redirect(302, path);
        res.finished = true;
        return {};
    }
    router.replace(path).then(r => console.log(r));
    return {};
};

export const authInitialProps = isProtectedRoute => async ({req, res, query: {userId}}) => {
    const auth = req ? getSessionFromServer(req) : getSessionFromClient();
    const currentPath = req ? req.url : window.location.pathname;
    const user = auth.user;
    const isAnonymous = !user;
    if (isProtectedRoute && isAnonymous && currentPath !== "/register") {
        return redirectUser(res, "/register");
    }
    let token = Cookie.get('token');
    const {data} = await axios.get('/products');
    return {auth, userId, ...data, ...token};
};


export const signUpUser = async user => {
    const {data} = await axios.post('/register', user);
    return data;
};

export const signInUser = async user => {
    const {data} = await axios.post('/login', user);
    saveUserData(data)
    if (typeof window !== "undefined") {
        window[WINDOW_USER_SCRIPT_VARIABLE] = data;
    }
};

export const signOutUser = async () => {
    if (typeof window !== "undefined") {
        window[WINDOW_USER_SCRIPT_VARIABLE] = {};
    }
    await axios.get('/api/logout');
    await router.push('/login');
};

export const getToken = (res, req) => {
    if (req.cookies['jwt']) {
        return req.cookies['jwt']
    }
    return null
}