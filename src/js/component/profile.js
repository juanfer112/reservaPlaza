import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/home.scss";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	var newArray = [];

	var obj1 = Object.keys(store.user).map((element, index) => {
		console.log(element);
		if (element == "brands") {
			let array = [];

			Object.values(store.user[element]).map((brand, index) => {
				console.log(brand);
				console.log(brand["name"]);
				newArray += array.concat(brand["name"], " ");
				console.log(newArray);
			});
			return null;
		}
	});
	console.log(obj1);
	var obj = Object.values(store.user).map((items, index) => {
		console.log(items);
		return <div key={index}>{items}</div>;
	});
	console.log(obj);

	return (
		<div className="container">
			<div className="row justify-content">
				<div className="col-sm-10 col-md-6 shadow">
					<img
						src="https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg"
						className="avatarProfile float-left rounded-circle mr-2"
					/>

					<div>
						{Object.keys(store.user).map((element, index) => {
							console.log(element);
							console.log(store.user[element], "store.user[element]");

							if (
								element == "email" ||
								element == "phone" ||
								element == "name" ||
								element == "tot_hours" ||
								element == "cif"
							) {
								return (
									<div key={index}>
										{element}:{store.user[element]}
									</div>
								);
							} else if (element == "brands") {
								return (
									<div key={index}>
										{element}:{newArray}
									</div>
								);
							}
						})}
					</div>

					<div className="row justify-content">
						<div className="col-sm-12 col-md-6">
							<strong>email@gmail.com</strong>
						</div>
						<div className="col-sm-12 col-md-6">
							<strong>CIF</strong>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12 col-md-6">
							<strong>WEB</strong>
						</div>
						<div className="col-sm-12 col-md-6">
							<strong>ADDRES</strong>
						</div>
					</div>
				</div>
			</div>
			PROFILE
		</div>
	);
};
