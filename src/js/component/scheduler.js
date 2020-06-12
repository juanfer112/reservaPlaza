import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Day } from "./day";

import "../../styles/home.scss";

export const Scheduler = () => {
	const week = ["Horas", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
	var array = [];
	for (let hours = 0; hours < 24; hours++) {
		let time = "";
		let time2 = "";
		if (hours < 10) {
			time = `0${hours}:00`;
		} else {
			time = `${hours}:00`;
		}
		if (hours + 1 < 10) {
			time2 = `0${hours + 1}:00`;
		} else {
			time2 = `${hours + 1}:00`;
		}
		array.push(<Day hours={[time + "-" + (time2 !== "24:00" ? time2 : "00:00")]} />);
	}
	return (
		<div>
			<Day hours={week} bold={"true"} /> {array}
		</div>
	);
};
