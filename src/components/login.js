import React from "react"
import { Link } from "react-router";
const Login = () => {
    return (
        <>
            <h1>Login</h1>
            <Link to={'/'}>
                <button>Home</button>
            </Link>
        </>
    )
}

export default Login;