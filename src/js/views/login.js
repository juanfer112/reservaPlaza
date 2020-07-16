import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/home.scss";

export const Login = () => {
	const { actions, store } = useContext(Context);
	var [user, setUser] = useState("");
	var [password, setPassword] = useState("");
	var [forgot, setForgot] = useState(false);
	var [mail, setMail] = useState("");

	useEffect(
		() => {
			actions.checkUser(user, password);
		},
		[user, password]
	);

	return (
		<div className="container d-flex justify-content-center">
			<div className="rowLogin">
				<div className="col-6 col-md-4 mt-4 text-center">
					<h1 className="text-center mb-5">LOG IN</h1>
					{!forgot ? (
						<div className="card card-body my-3 p-5">
							<div className=" input-group">
								<input className="form-control" type="text" placeholder="USUARIO" />
							</div>
							<div className="input-group my-2">
								<input className="form-control" type="password" placeholder="CONTRASEÑA" />
							</div>
							<a
								onClick={() => {
									setForgot(true);
								}}>
								¿Olvido su contraseña?
							</a>
							<div className="text-center mt-4">
								{store.validation ? (
									<Link to={"/profile/" + user.toLowerCase()}>
										<button type="button" className="btn btn-primary mx-auto ">
											Login
										</button>
									</Link>
								) : (
									<button
										type="button"
										className="btn btn-primary mx-auto "
										onClick={() => alert("Revisa tu usuario o contraseña")}>
										Login
									</button>
								)}
							</div>
						</div>
					) : (
						<>
							<input className="form-control " type="email" placeholder="Correo electronico" />
							<button type="button" className="btn btn-primary mx-auto my-5">
								Restablecer
							</button>
						</>
					)}
				</div>
			</div>
			<Link to={"/"}>BACK!</Link>
		</div>
	);
};
