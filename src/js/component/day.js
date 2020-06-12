import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../../styles/home.scss";

export const Day = n => {
	const array = [];
	for (let days = 0; days < 8; days++) {
		array.push(days);
	}

	return (
		<div>
			{array.map((item, index) => {
				return (
					<div className="days border bg-danger text-center" key={index}>
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
