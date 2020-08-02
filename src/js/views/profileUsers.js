import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Profile } from "../component/profile";
import { Navbar } from "../component/navbar";
import { ResumeReserve } from "../component/resumeReserve";
import "../../styles/home.scss";

export const ProfileUsers = () => {
	return (
		<div>
			<div>
				<Navbar />
			</div>
			<div>
				<Profile />
			</div>
			<div>
				<ResumeReserve />
			</div>
		</div>
	);
};
