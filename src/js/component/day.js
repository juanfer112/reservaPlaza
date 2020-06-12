import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../../styles/home.scss";

export const Day = n => {
	const array = [];
	const [color, setColor] = useState("");
	for (let days = 0; days < 8; days++) {
		array.push(days);
	}
	return (
		<div className="week">
			{array.map((item, index) => {
				return (
					<div
						id={n.week[index]}
						className={"days border text-center " + color}
						key={index}
						onClick={e => {
							if (e.target.id === "") {
								e.target.className = "days border text-center bg-success";
							}
						}}>
						{n.week[index]}
					</div>
				);
			})}
		</div>
	);
};

Day.propTypes = {
	n: PropTypes.any
};
