import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Profile } from "../component/profile";
import { Navbar } from "../component/navbar";
import "../../styles/home.scss";

export const ProfileUsers = () => {
	return (
		<div>
			<Navbar />
			<div>
				<Profile />
			</div>
		</div>
	);
};
