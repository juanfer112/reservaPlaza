import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link, Redirect } from "react-router-dom";
import { Profile } from "./profile";
import { Navbar } from "./navbar";
import { ResumeReserve } from "./resumeReserve";
import { MonthNav } from "./monthNav";
import "../../styles/home.scss";
import { ResumeModal } from "./resumeModal";

export const ProfileUsers = () => {
	const { store, actions } = useContext(Context);

	const style = {
		position: "relative",
		margin: "50px auto"
	};

	return (
		<div>
			<div className="container pr-0 mt-3 mb-3 px-2">
				<Profile />
			</div>
			<div className="px-2">
				<MonthNav style={style} />
			</div>
		</div>
	);
};
