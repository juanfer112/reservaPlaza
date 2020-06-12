import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Day } from "./day";

import "../../styles/home.scss";

export const Scheduler = () => {
	var week = ["Horas", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
	var array = [];
	for (let hours = 0; hours < 24; hours++) {
		array.push(<Day week={[hours + "-" + (hours + 1)]} />);
	}
	return (
		<div>
			<Day week={week} /> {array};
		</div>
	);
};
