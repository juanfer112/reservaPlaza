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

	return (
		<div className="row justify-content mt-3 mb-3 mr-0">
			<div className="col-sm-10 col-md-8 p-0 shadow">
				<div className="contact-card-container card">
					<div className="card-content">
						<div className="background-holder" />
						<div className="card-header row ">
							<ul className="mb-0 col-12">
								<li>
									<label>Nombre :</label> <span>{store.user.name}</span>
								</li>
								<li>
									<label>CIF:</label> <span>{store.user.cif}</span>
								</li>
							</ul>
						</div>
						<div className="row">
							<div className="profile-picture col-4">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png"
									alt=""
								/>
							</div>
							<ul className="personal-information col-8">
								<li>
									<label>Horas contratadas :</label> <span>{store.user.tot_hours}</span>
								</li>
								<li>
									<label>Horas disponibles</label>{" "}
									<span className="font-weight-bold">{store.user.current_hours}</span>
								</li>
								<li>
									<label>Phone :</label> <span type="phone">{store.user.phone}</span>
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
	);
};
