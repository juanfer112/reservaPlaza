import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const HoursColumn = () => {
	const { actions, store } = useContext(Context);
	var array = [];
	var night = !store.night ? " d-none" : "";
	for (let hours = 0; hours < 25; hours++) {
		let header = "HORAS";
		if (hours == 0) {
			array.push(
				<div key={hours} className="titleH text-center py-1">
					{header}
				</div>
			);
		} else {
			var time = hours < 11 ? `0${hours - 1}:00` : `${hours - 1}:00`;
			var name = hours < 7 ? "hours text-center" + night : "hours text-center";
			array.push(
				<div key={hours} className={name}>
					<p>{time}</p>
				</div>
			);
		}
	}
	return array;
};
