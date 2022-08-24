import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import Alert from "./Alert";

function Login({ login, isAuthenticated }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { email, password } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password);
    };
    // if (isAuthenticated) {
    //     return <Navigate to="/register" />;
    // }

    return (
        <div>
            <div className="aboutContant"></div>
            <div className="container">
                <Alert />
                <div className="row text-center">
                    <div className="text-center">
                        <h3 className="signInTitle">SIGN IN</h3>
                    </div>
                    <form className="form py-3" onSubmit={(e) => onSubmit(e)}>
                        <div className="form-group m-3">
                            <input
                                type="email"
                                className="loginInput"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className="form-group m-3">
                            <input
                                type="password"
                                className="loginInput"
                                placeholder="Password"
                                name="password"
                                minLength="6"
                                value={password}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div>
                            <button type="submit" className="loginUserBtn">
                                Login
                            </button>
                        </div>
                        <Link to="/forgot-password" className="login-forget-password">
                            <p className="forgot-password-paragraph">Forget Password</p>
                        </Link>
                    </form>
                    <p>
                        Don't have an account?
                        <Link to="/register" className="linkSignUp p-2">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
