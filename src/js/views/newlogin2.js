import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/login2.scss";

export const NewLogin2 = () => {
	const { actions, store } = useContext(Context);
	var [user, setUser] = useState("");

	return (
		<div className="login-background">
			<div className="container">
				<div className="row">
					<div className="col-md-2">{""}</div>
					<div className="col-md-8">
						<div className="row">
							<div className="col-md-6 col-lg-6 ">
								<img />
							</div>
							<div className="col-sm-12 col-md-6">
								<ul>
									<a href="#" className="log-in">
										Log in
									</a>
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
								<input type="checkbox" />
								<small>Remenber me</small>
								<a href="#">
									<div className="btn btn-info">Haz click</div>
								</a>
								<p className="text-center">Olvido su contraseña?</p>
							</div>

							<div className="col-md-6" />
						</div>
					</div>
					<div className="col-md-2">{""}</div>
				</div>
			</div>
		</div>
	);
};
