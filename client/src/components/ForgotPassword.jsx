import React from "react";

function ForgotPassword() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 m-auto text-center">
                        <p className="forgot-password-text">Forgot Password</p>
                    </div>
                    <div className="col-md-10 m-auto text-center">
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            className="forgot-password-input"
                        />
                    </div>
                    <div className="col-md-10 m-auto text-center">
                        <button className="forgot-password-btn">Send OTP</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ForgotPassword;
