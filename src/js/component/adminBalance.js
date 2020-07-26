import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { HoursColumn } from "./hoursColumn";
import "../../styles/home.scss";
import { NewDay } from "./newDay";
import { format, startOfDay, addHours, subHours } from "date-fns";

export const AdminBalance = n => {
	const { actions, store } = useContext(Context);
	var adminScheduler = [];
	var currentDay = n.day;
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
						<th className="px-0 text-center">{store.spaces[currentSpace]["name"]}</th>
					</>
				);
			} else if (hour == 0) {
				holderSpacesHours.push(<th className="px-0 text-center">{store.spaces[currentSpace]["name"]}</th>);
			} else if (currentSpace == 0) {
				holderSpacesHours.push(
					<>
						<th className="px-0 text-center">{titleHour}</th>
						<td
							className={"px-0 text-center " + className}
							id={store.spaces[currentSpace]["id"] + " " + id}>
							{store.spaces[currentSpace]["schedules"].map(i => {
								if (id == format(subHours(new Date(i["date"]), 2), "yyyy-MM-dd HH:mm:ss")) {
									return i["enterprise_id"];
								}
							})}
						</td>
					</>
				);
			} else {
				holderSpacesHours.push(
					<td className={"px-0 text-center " + className} id={store.spaces[currentSpace]["id"] + " " + id}>
						{store.spaces[currentSpace]["schedules"].map(i => {
							if (id == format(subHours(new Date(i["date"]), 2), "yyyy-MM-dd HH:mm:ss")) {
								return i["enterprise_id"];
							}
						})}
					</td>
				);
			}
		}
		adminScheduler.push(<tr>{holderSpacesHours}</tr>);
		currentDay = addHours(currentDay, 1);
	}
	return <table className="table table-bordered">{adminScheduler}</table>;
};
