import React from "react";
import { NewDay } from "./newDay";

import "../../styles/home.scss";

export const Scheduler = () => {
	const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
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
		array.push(<div className="cell">{[time + "-" + (time2 !== "24:00" ? time2 : "00:00")]} </div>);
	}
	return (
		<div className="row justify-content-center">
			<div className="col">{array}</div>
			{days.map((item, index) => {
				return <NewDay key={index} day={item} />;
			})}
		</div>
	);
};
