import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Day } from "./day";

import "../../styles/home.scss";

export const Scheduler = () => {
	var days = [];
	for (let day = 0; day < 7; day++) {
		days.push(<Day />);
	}
	return <div className="week">{days}</div>;
};
