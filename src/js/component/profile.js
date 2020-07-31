import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/home.scss";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const sortStringKeys = (a, b) => (a[4] < b[0] ? 1 : -1);
	var newArray = [];

	var obj = Object.values(store.user).map((items, index) => {
		console.log(items);
		return <div key={index}>{items}</div>;
	});
	console.log(obj);

	return (
		<div className="container mt-5">
			<div className="row justify-content">
				<img
					src="https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg"
					className="avatarProfile float-left rounded-circle mr-2 shadow"
				/>

				<div className="col-sm-10 col-md-6 shadow">
					<div className="row justify-content">
						{Object.keys(store.user)
							.sort(sortStringKeys)
							.map((element, index) => {
								if (element == "email" || element == "phone" || element == "name") {
									return (
										<div className="col-sm-12 col-md-6 " key={index}>
											{element}:{store.user[element]}
										</div>
									);
								} else if (element == "tot_hours" || element == "cif") {
									return (
										<div className="col-sm-12 col-md-6 " key={index}>
											{element}:{store.user[element]}
										</div>
									);
								} else if (element == "brands") {
									Object.values(store.user[element]).map((brand, index) => {
										let array = [];
										newArray += array.concat(brand["name"], " ");
									});
									return (
										<div className="col-sm-12 " key={index}>
											{element}:{newArray}
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
