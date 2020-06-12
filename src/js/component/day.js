import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../../styles/home.scss";

export const Day = n => {
	const array = [];
	const week = ["Horas", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

	for (let days = 0; days < week.length; days++) {
		array.push(days);
	}
	return (
		<div className="week">
			{array.map((item, index) => {
				return (
					<div
						key={index}
						id={n.hours[index] || n.hours + week[index]}
						style={
							n.bold
								? { background: "white", fontWeight: "bold" }
								: { background: "white", fontWeight: "normal" }
						}
						className="days "
						onClick={e => {
							if (!week.includes(e.target.id) && index !== 0) {
								if (e.target.style.background == "white") {
									e.target.style.background = "rgb(145, 188, 179)";
								} else if (e.target.style.background == "rgb(145, 188, 179)") {
									e.target.style.background = "white";
								}
							}
						}}>
						{n.hours[index]}
					</div>
				);
			})}
		</div>
	);
};

Day.propTypes = {
	n: PropTypes.any,
	bold: PropTypes.any
};
