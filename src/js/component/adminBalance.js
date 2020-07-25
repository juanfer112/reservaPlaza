import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { HoursColumn } from "./hoursColumn";
import "../../styles/home.scss";
import { NewDay } from "./newDay";
import { format, startOfDay, addHours, subHours } from "date-fns";

export const AdminBalance = () => {
	const { actions, store } = useContext(Context);
	var holderAdminScheduler = [];
	var day = startOfDay(new Date());

	for (let hour = 0; hour < 25; hour++) {
		var holderSpacesHours = [];
		var thHours = hour < 11 ? `0${hour - 1}:00` : `${hour - 1}:00`;

		for (let space = 0; space < store.spaces.length; space++) {
			let spaceID = store.spaces[space]["id"];
			let id = format(subHours(day, 1), "yyyy-MM-dd HH:mm:ss").toString();
			let className = actions.reservedDate(id, spaceID);
			if (hour == 0 && space == 0) {
				holderSpacesHours.push(
					<>
						<th />
						<th>{store.spaces[space]["name"]}</th>
					</>
				);
			} else if (hour == 0) {
				holderSpacesHours.push(<th>{store.spaces[space]["name"]}</th>);
			} else if (space == 0) {
				holderSpacesHours.push(
					<>
						<th>{thHours}</th>
						<td className={className} id={id}>
							{id}
						</td>
					</>
				);
			} else {
				holderSpacesHours.push(<td className={className} id={id} />);
			}
		}
		holderAdminScheduler.push(<tr>{holderSpacesHours}</tr>);
		day = addHours(day, 1);
	}
	return (
		<div className="container mt-5">
			<table className="table table-bordered">{holderAdminScheduler}</table>
		</div>
	);
};
