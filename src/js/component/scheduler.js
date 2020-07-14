import React, { useState, useContext, useReducer } from "react";
import { NewDay } from "./newDay";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const Scheduler = () => {
	const { store, actions } = useContext(Context);

	var array = [];
	for (let hours = 0; hours < 25; hours++) {
		let header = "HORAS";
		let time = "";
		let time2 = "";

		if (hours == 0) {
			array.push(
				<div key={hours} className="titleH text-center font-weight-bold">
					{header}
				</div>
			);
		} else {
			hours > 0 && hours < 11 ? (time = `0${hours - 1}`) : (time = `${hours - 1}`);

			hours < 10 ? (time2 = `0${hours}`) : (time2 = `${hours}`);

			array.push(
				<div key={hours} className="hours text-center">
					<p>{[time + "-" + (time2 !== "24:00" ? time2 : "00:00")]}</p>
				</div>
			);
		}
	}
	return (
		<div className="row rowSched justify-content-center flex-nowrap">
			<div className="day col p-0">{array}</div>
			{store.week.map((item, index) => {
				return <NewDay key={index} day={item} />;
			})}
		</div>
	);
};
