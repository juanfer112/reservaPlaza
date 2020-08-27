import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, Redirect } from "react-router-dom";
import "../../styles/home.scss";

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
					{!forgot ? (
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
										<input
											required
											className="input100"
											type="email"
											name="email"
											placeholder="Email"
											aria-describedby="emailHelp"
											onChange={e => setUser((user = e.target.value))}
										/>
										<span className="focus-input100" />
										<span className="symbol-input100">
											<i className="fa fa-envelope fa-icon-login" aria-hidden="true" />
										</span>
									</div>

									<div className="wrap-input100 validate-input" data-validate="Password is required">
										<input
											required
											className="input100"
											type="password"
											name="pass"
											placeholder="Contraseña"
											onChange={e => setPassword((password = e.target.value))}
										/>
										<span className="focus-input100" />
										<span className="symbol-input100">
											<i className="fa fa-lock fa-icon-login" aria-hidden="true" />
										</span>
									</div>

									<div className="container-login100-form-btn">
										<button
											className="login100-form-btn"
											type="submit"
											onClick={e => {
												e.preventDefault();
												actions.checkUser(user, password);
											}}>
											Login
										</button>
									</div>

									<div className="text-center p-t-12">
										<a
											className="txt-pass"
											href="#"
											onClick={() => {
												setForgot(true);
											}}>
											Olvidó su Password?
										</a>
									</div>
								</form>
							</div>
						</div>
					) : (
						<>
							<input className="form-control " type="email" placeholder="Correo electronico" />
							<button
								type="button"
								className="btn btn-primary mx-auto my-5"
								onClick={() => {
									setForgot(false);
								}}>
								Restablecer
							</button>
						</>
					)}
					)
				</div>
			)}
		</>
	);
};
