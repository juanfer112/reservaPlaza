import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { HoursColumn } from "./hoursColumn";
import "../../styles/home.scss";
import { NewDay } from "./newDay";
import { format, startOfDay, addHours, subHours } from "date-fns";

export const AdminBalance = () => {
	const { actions, store } = useContext(Context);
	var adminScheduler = [];
	var currentDay = startOfDay(new Date());

	for (let hour = 0; hour < 25; hour++) {
		var holderSpacesHours = [];
		var titleHour = hour < 11 ? `0${hour - 1}:00` : `${hour - 1}:00`;

		for (let currentSpace = 0; currentSpace < store.spaces.length; currentSpace++) {
			let spaceID = store.spaces[currentSpace]["id"];
			let id = format(subHours(currentDay, 1), "yyyy-MM-dd HH:mm:ss").toString();
			let className = actions.reservedDate(id, spaceID);
			if (hour == 0 && currentSpace == 0) {
				holderSpacesHours.push(
					<>
						<th />
						<th>{store.spaces[currentSpace]["name"]}</th>
					</>
				);
			} else if (hour == 0) {
				holderSpacesHours.push(<th>{store.spaces[currentSpace]["name"]}</th>);
			} else if (currentSpace == 0) {
				holderSpacesHours.push(
					<>
						<th>{titleHour}</th>
						<td className={className} id={id}>
							{id}
						</td>
					</>
				);
			} else {
				holderSpacesHours.push(<td className={className} id={id} />);
			}
		}
		adminScheduler.push(<tr>{holderSpacesHours}</tr>);
		currentDay = addHours(currentDay, 1);
	}
	return (
		<div className="container mt-5">
			<table className="table table-bordered">{adminScheduler}</table>
		</div>
	);
};
