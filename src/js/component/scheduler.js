import React from "react";
import { NewDay } from "./newDay";

import "../../styles/home.scss";

export const Scheduler = () => {
	const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
	var array = [];
	for (let hours = 0; hours < 25; hours++) {
		let header = "HORAS";
		let time = "";
		let time2 = "";

		if (hours == 0) {
			array.push(<div className="titleH text-center font-weight-bold">{header}</div>);
		} else {
			hours > 0 && hours < 11 ? (time = `0${hours - 1}:00`) : (time = `${hours - 1}:00`);

			hours < 10 ? (time2 = `0${hours}:00`) : (time2 = `${hours}:00`);

			array.push(
				<div className="hours text-center">
					<p>{[time + "-" + (time2 !== "24:00" ? time2 : "00:00")]}</p>
				</div>
			);
		}
	}
	return (
		<div className="row rowSched justify-content-center flex-nowrap">
			<div className=" day col p-0">{array}</div>
			{days.map((item, index) => {
				return <NewDay key={index} day={item} />;
			})}
		</div>
	);
};
