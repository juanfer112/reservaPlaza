import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, Redirect } from "react-router-dom";
import "../../styles/login.scss";

export const Login = () => {
	const { actions, store } = useContext(Context);
	var [user, setUser] = useState("");
	var [password, setPassword] = useState("");
	var [forgot, setForgot] = useState(false);
	var [mail, setMail] = useState("");

	const redirectUser = e => {
		/*	e.preventDefault();*/
		if (store.token != null && store.admin) {
			return (
				<>
					<Redirect to="/reserva" />
				</>
			);
		} else if (store.token != null && !store.admin) {
			return (
				<>
					<Redirect to="/profile" />
				</>
			);
		}
	};

	return (
		<>
			{store.token != null ? (
				<>
					<Redirect to="/reserva" />
				</>
			) : (
				<div className="limiter">
					<div className="container-login100">
						<div className="wrap-login100">
							<form className="login100-form validate-form">
								<span className="login100-pic">
									<img
										src="https://dkitchenincubator.com/wp-content/uploads/2020/02/Logo-DK-con-texto.png"
										alt="IMG"
									/>
								</span>

								<div
									className="wrap-input100 validate-input"
									data-validate="Valid email is required: ex@abc.xyz">
									<input className="input100" type="text" name="email" placeholder="Email" />
									<span className="focus-input100" />
									<span className="symbol-input100">
										<i className="fa fa-envelope fa-icon-login" aria-hidden="true" />
									</span>
								</div>

								<div className="wrap-input100 validate-input" data-validate="Password is required">
									<input className="input100" type="password" name="pass" placeholder="Password" />
									<span className="focus-input100" />
									<span className="symbol-input100">
										<i className="fa fa-lock fa-icon-login" aria-hidden="true" />
									</span>
								</div>

								<div className="container-login100-form-btn">
									<button className="login100-form-btn">Login</button>
								</div>

								<div className="text-center p-t-12">
									<span className="txt1">Olvidó su</span>
									<a className="txt2" href="#">
										{" "}
										Password?
									</a>
								</div>

								<div className="text-center p-t-136">
									<a className="txt2" href="#">
										{" "}
										<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
									</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
