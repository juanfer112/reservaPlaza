import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/home.scss";

export const Day = () => {
	const array = [];
	for (let hours = 0; hours < 24; hours++) {
		array.push(hours);
	}
	return (
		<div>
			{array.map((item, index) => {
				return <div className="hours border bg-danger text-center" key={index} />;
			})}
		</div>
	);
};
