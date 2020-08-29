import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/home.scss";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	/*función para modificar y asignar posiciones de las keys cuando realizo un mapeo de elementos*/
	const sortStringKeys = (a, b) => (a[4] < b[0] ? 1 : -1);
	/*--------------------------------------------------------------------------------------------*/
	var newArray = [];
	console.log(Object.keys(store.user));

	return (
		<div className="container pr-0 mt-3 mb-3">
			<div className="row justify-content">
				<div className="col-sm-10 col-md-8 p-0 shadow">
					<div className="contact-card-container card">
						<div className="card-content">
							<div className="background-holder" />

							<div className="card-header row ">
								<label>Nombre :</label> <span>{store.user.name}</span>
							</div>
							<div className="row">
								<div className="profile-picture col-3">
									<img
										src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png"
										alt=""
									/>
								</div>
								<ul className="personal-information col-9">
									<li>
										<label>CIF:</label> <span>{store.user.cif}</span>
									</li>
									<li>
										<label>Horas contratadas :</label> <span>{store.user.tot_hours}</span>
									</li>
									<li>
										<label>Phone :</label> <span>{store.user.phone}</span>
									</li>
									<li>
										<label>Email :</label> <span>{store.user.email}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
