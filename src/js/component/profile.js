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
		<div className="container mt-3 mb-3">
			<div className="row justify-content">
				<img
					src="https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg"
					className="avatarProfile float-left rounded-circle mr-2 shadow"
				/>

				<div className="col-sm-10 col-md-8 shadow">
					<div className="row justify-content">
						{Object.keys(store.user)
							.sort(sortStringKeys)
							.map((element, index) => {
								if (element == "name" || element == "phone") {
									return (
										<div className="row justify-content">
											<p className="col-sm-12 col-md-6 mx-2" key={index}>
												{element}:{store.user[element]}
											</p>
										</div>
									);
								} else if (element == "tot_hours" || element == "cif") {
									return (
										<div className="row justify-content">
											<p className="col-sm-12 col-md-6 mx-2 " key={index}>
												{element}:{store.user[element]}
											</p>
										</div>
									);
								} else if (element == "brands") {
									Object.values(store.user[element]).map((brand, index) => {
										let array = [];
										newArray += array.concat(brand["name"], " ");
									});
									return (
										<div className="col-sm-12 text-nowrap " key={index}>
											{element}: {newArray}
										</div>
									);
								}
							})}
					</div>
				</div>
			</div>
		</div>
	);
};
