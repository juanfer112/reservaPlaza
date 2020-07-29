import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { HoursColumn } from "./hoursColumn";
import "../../styles/home.scss";
import { NewDay } from "./newDay";
import { format, addHours, subHours } from "date-fns";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const AdminBalance = n => {
	const { actions, store } = useContext(Context);
	var adminScheduler = [];
	var currentDay = n.day;
	var night = !store.night ? " d-none" : "";
	const [show, setShow] = useState(false);
	function toggle() {
		setShow(!show);
	}

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
							onClick={e => {
								if (className == " reserved") {
									setShow(!show), actions.changeSchedule(e.target.id);
								}
							}}
							className={"px-0 text-center" + className}
							id={store.spaces[currentSpace]["id"] + " " + id}>
							{store.spaces[currentSpace]["schedules"].map(i => {
								if (id == format(subHours(new Date(i["date"]), 2), "yyyy-MM-dd HH:mm:ss")) {
									return i["enterprise_name"];
								}
							})}
						</td>
					</>
				);
			} else {
				holderSpacesHours.push(
					<td
						onClick={e => {
							if (className == " reserved") {
								setShow(!show), actions.changeSchedule(e.target.id);
							}
						}}
						className={"px-0 text-center" + className}
						id={store.spaces[currentSpace]["id"] + " " + id}>
						{store.spaces[currentSpace]["schedules"].map(i => {
							if (id == format(subHours(new Date(i["date"]), 2), "yyyy-Mp M-dd HH:mm:ss")) {
								return i["enterprise_name"];
							}
						})}
					</td>
				);
			}
		}
		adminScheduler.push(<tr className={hour > 0 && hour < 9 ? night : ""}>{holderSpacesHours}</tr>);
		currentDay = addHours(currentDay, 1);
	}
	return (
		<>
			<table className="table table-bordered">{adminScheduler}</table>
			<Modal backdrop="false" isOpen={show} toggle={() => setShow(!show)}>
				{store.confirModal ? (
					<ModalBody>
						<h2 className="text-center">Quieres confirmar las siguientes reservas?</h2>
						<ul className="text-center list-group">
							{store.schedules.map((date, index) => {
								return (
									<li className="list-group-item border-0 p-0" key={index}>
										<h4>{date.date}</h4>
									</li>
								);
							})}
						</ul>
					</ModalBody>
				) : (
					<ModalBody>
						<h1>No tienes suficientes horas disponibles! (PHONE NUMBER)</h1>
					</ModalBody>
				)}
				<ModalFooter className="m-auto">
					<Button
						color="primary"
						onClick={() => {
							actions.postSchedules();
							setShow(!show);
						}}>
						Confirmar
					</Button>
					<Button color="secondary" onClick={() => setShow(!show)}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};
