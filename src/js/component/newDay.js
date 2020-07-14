import React, { useContext } from "react";
import { Context } from "../store/appContext";
import {
	compareAsc,
	format,
	getDay,
	startOfWeek,
	getISOWeek,
	endOfDay,
	isLastDayOfMonth,
	addDays,
	addHours,
	subHours
} from "date-fns";
import "../../styles/home.scss";

export const NewDay = n => {
	const { actions, store } = useContext(Context);
	var day = n.day;
	var holder = [];

	for (let x = 0; x < 25; x++) {
		if (x == 0) {
			holder.push(
				<div key={x} className="title text-center font-weight-bold">
					{actions.transformDay(day)}
				</div>
			);
		} else {
			const id = format(day, "yyyy-MM-dd HH:mm:ss").toString();
			holder.push(
				<div
					className={"cell" + actions.reservedDate(id)}
					key={x}
					id={id}
					onClick={e => {
						if (e.target.className != "cell bg-danger") actions.addToSchedules(id);
						e.target.className += " bg-success";
					}}
				/>
			);
			day = addHours(day, 1);
		}
	}

	return <div className="day col  p-0">{holder}</div>;
};
