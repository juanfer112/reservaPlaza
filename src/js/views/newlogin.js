import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/login.scss";

export const NewLogin = () => {
	const { actions, store } = useContext(Context);
	var [user, setUser] = useState("");

	return (
		<div className="login-background">
			<div className="container">
				<div className="row">
					<div className="col-md-2">1</div>
					<div className="col-md-8">
						<div className="row first-row">
							<div className="col-md-6">
								<ul>
									<a href="#" className="log-in">
										Sign in
									</a>
									<a href="#">Sign up</a>
								</ul>
								<label className="label control-label">Usuario</label>
								<input
									type="email"
									className="form-control"
									name="user"
									placeholder="correo electronico"
								/>
								<label className="label control-label">Contraseña</label>
								<input
									type="password"
									className="form-control"
									name="password"
									placeholder="Contraseña"
								/>
							</div>
							<div className="col-md-6">2</div>
						</div>
					</div>
					<div className="col-md-2">3</div>
					<Link to={"/"}>BACK!</Link>
				</div>
			</div>
		</div>
	);
};
