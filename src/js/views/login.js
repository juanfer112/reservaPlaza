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

	return (
		<>
			{store.token != null ? (
				<>
					<Redirect to="/reserva" />
				</>
			) : (
				<div className="justify-content-center">
					<div className="text-center mt-3">
						<p>
							<img
								className="form-img w-5 mt-5"
								src="https://dkitchenincubator.com/wp-content/uploads/2020/02/Logo-DK-con-texto.png"
							/>
						</p>

						<div className="container d-flex justify-content-center mx-auto">
							<form>
								<div className="rowLogin">
									<div className="col-4 col-md-4 mt-4 text-center">
										{!forgot ? (
											<div className="card card-body my-3 p-5">
												<div className=" input-group">
													<input
														required
														className="form-control"
														name="email"
														aria-describedby="emailHelp"
														type="email"
														placeholder="USUARIO"
														onChange={e => setUser((user = e.target.value))}
													/>
												</div>
												<div className="input-group my-2">
													<input
														required
														className="form-control"
														type="password"
														placeholder="CONTRASEÑA"
														onChange={e => setPassword((password = e.target.value))}
													/>
												</div>
												<a
													className="forgotPasword"
													onClick={() => {
														setForgot(true);
													}}>
													¿Olvido su contraseña?
												</a>
												<div className="text-center mt-4">
													<button
														type="submit"
														className="btn btn-primary mx-auto "
														onClick={e => {
															e.preventDefault();
															actions.checkUser(user, password);
														}}>
														Login
													</button>
												</div>
											</div>
										) : (
											<>
												<input
													className="form-control "
													type="email"
													placeholder="Correo electronico"
												/>
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
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
