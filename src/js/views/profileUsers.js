import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Profile } from "../component/profile";

import { Navbar } from "../component/navbar";
import { ResumeReserve } from "../component/resumeReserve";
import { MonthNav } from "../component/monthNav";
import "../../styles/home.scss";
import { ResumeModal } from "../component/resumeModal";

export const ProfileUsers = () => {
	const { store, actions } = useContext(Context);

	console.log("reserva2:", store.reserved);
	const style = {
		position: "relative",
		margin: "50px auto"
	};

	return (
		<div>
			<div>
				<Navbar />
			</div>
			<div>
				<Profile />
				<Link to={"/reserva/:theid"}>RESERVA!</Link>
			</div>
			<div>
				<MonthNav style={style} />
			</div>
			<div className="legend">
				<div className="legend-details">
					Dias reservados :<span className="legend-green">{""}</span>
				</div>
				<div className="legend-details">
					Día actual :<span className="legend-blue">{""}</span>
				</div>
			</div>
		</div>
	);
};
