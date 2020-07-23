import React, { useState, useContext, useReducer } from "react";
import { NewDay } from "./newDay";
import { Context } from "../store/appContext";
import { HoursColumn } from "./hoursColumn";
import "../../styles/home.scss";

export const Scheduler = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="rowSched">
			<div className="day col p-0">
				<HoursColumn />
			</div>
			{store.week.map((item, index) => {
				return <NewDay key={index} day={item} />;
			})}
		</div>
	);
};
