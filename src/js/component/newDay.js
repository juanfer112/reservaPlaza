import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { format, addHours } from "date-fns";
import "../../styles/home.scss";

export const NewDay = n => {
	const { actions, store } = useContext(Context);
	var day = n.day;
	var holder = [];
	var night = !store.night ? " d-none" : "";

	for (let x = 0; x < 25; x++) {
		if (x == 0) {
			holder.push(
				<div key={x} className="title text-center">
					{actions.transformDay(day)}
				</div>
			);
		} else {
			const id = format(day, "yyyy-MM-dd HH:mm:ss").toString();
			var className = x < 7 ? "cell" + night + actions.reservedDate(id) : "cell" + actions.reservedDate(id);
			holder.push(
				<div
					className={className}
					key={x}
					id={id}
					onClick={e => {
						if (e.target.className != "cell reserved" && e.target.className != "cell self-reserved") {
							if (e.target.className == "cell") {
								actions.addSchedules(id);
								console.log("id:", id);
								e.target.className += " select-green";
							} else {
								e.target.className = "cell";
								actions.removeSchedules(id);
							}
						}
					}}
				/>
			);
			day = addHours(day, 1);
		}
	}

	return <div className="day col p-0">{holder}</div>;
};
