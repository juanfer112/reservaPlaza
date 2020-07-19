import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/home.scss";

export const Profile = () => {
	return (
		<div className="container">
			<div className="row justify-content">
				<div className="col-sm-10 col-md-6 shadow">
					<img
						src="https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg"
						className="avatarProfile float-left rounded-circle mr-2"
					/>

					<h1>Name</h1>
					<h3>Brands</h3>
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
