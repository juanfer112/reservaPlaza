import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { format, addHours, subHours, subDays } from "date-fns";
import { Table, Modal, ModalBody, ModalFooter } from "reactstrap";

export const AdminBalance = n => {
	const { actions, store } = useContext(Context);
	const [show, setShow] = useState(false);
	let adminScheduler = [];
	let currentDay = n.day;
	let scheduleSpaceIDToChange = store.scheduleToChange["date"] ? store.scheduleToChange["space_id"] : "";
	let scheduleDateToChange = store.scheduleToChange["date"]
		? format(subHours(new Date(store.scheduleToChange["date"]), 2), "yyyy-MM-dd")
		: "";
	let scheduleDateHourToChange = store.scheduleToChange["date"]
		? format(subHours(new Date(store.scheduleToChange["date"]), 2), "HH:mm")
		: "";
	let hoursOptions = [];

	for (let hour = 0; hour < 24; hour++) {
		let value = hour < 10 ? (value = "0" + hour.toString() + ":00") : (value = hour.toString() + ":00");
		hoursOptions.push(
			<option key={hour} value={value}>
				{value}
			</option>
		);
	}

	for (let hour = 0; hour < 25; hour++) {
		let holderSpacesHours = [];
		let titleHour = hour < 11 ? `0${hour - 1}:00` : `${hour - 1}:00`;

		for (let currentSpace = 0; currentSpace < store.spaces.length; currentSpace++) {
			let spaceID = store.spaces[currentSpace]["id"];
			let id = format(subHours(currentDay, 1), "yyyy-MM-dd HH:mm:ss").toString();
			let className = actions.reservedDate(id, spaceID);
			if (hour == 0 && currentSpace == 0) {
				holderSpacesHours.push(
					<>
						<th className="px-2 thFirst bg-white" />
						<th className="px-2 text-center thSpace bg-white">{store.spaces[currentSpace]["name"]}</th>
					</>
				);
			} else if (hour == 0) {
				holderSpacesHours.push(
					<th className="px-2 text-center thSpace bg-white">{store.spaces[currentSpace]["name"]}</th>
				);
			} else if (currentSpace == 0) {
				holderSpacesHours.push(
					<>
						<th className="px-2 text-center tHours bg-white">{titleHour}</th>
						<td
							onClick={e => {
								if (className == " reserved" || className == " self-reserved") {
									setShow(true),
										actions.selectScheduleToChange(e.target.id, store.spaces[currentSpace]["id"]);
								}
							}}
							className={"px-2 text-center" + className + " text-white font-weight-bold"}
							id={id}>
							{store.spaces[currentSpace]["schedules"].map(schedule => {
								if (id == format(subHours(new Date(schedule["date"]), 2), "yyyy-MM-dd HH:mm:ss")) {
									return schedule["enterprise_name"];
								}
							})}
						</td>
					</>
				);
			} else {
				holderSpacesHours.push(
					<td
						onClick={e => {
							if (className == " reserved" || className == " self-reserved") {
								setShow(true),
									actions.selectScheduleToChange(e.target.id, store.spaces[currentSpace]["id"]);
							}
						}}
						className={"px-2 text-center" + className + " text-white font-weight-bold"}
						id={id}>
						{store.spaces[currentSpace]["schedules"].map(schedule => {
							if (id == format(subHours(new Date(schedule["date"]), 2), "yyyy-MM-dd HH:mm:ss")) {
								return schedule["enterprise_name"];
							}
						})}
					</td>
				);
			}
		}
		adminScheduler.push(<tr>{holderSpacesHours}</tr>);
		currentDay = addHours(currentDay, 1);
	}

	return (
		<>
			<div className="title text-center font-weight-bold mx-5">
				{actions.transformDay(subDays(currentDay, 1))}
			</div>
			<div className="row mb-5 mr-0">
				<div className="container-fluid container-balance mx-5">
					<Table responsive striped bordered hover variant="dark">
						{adminScheduler}
					</Table>
				</div>
			</div>
			{store.scheduleToChange["date"] ? (
				<Modal className="modalChange" isOpen={show} toggle={() => setShow(!show)}>
					<ModalBody>
						{store.scheduleToChange != {} ? (
							<ul className="list-group">
								<li className="d-flex justify-content-center py-2">
									<h3 className="text-center">{store.scheduleToChange["enterprise_name"]}</h3>
								</li>
								<li className="d-flex row list-group-item text-left text-capitalize">
									<h3 className="col-2">Salas:</h3>
									<select
										className="col-9"
										defaultValue={scheduleSpaceIDToChange}
										onChange={e => (scheduleSpaceIDToChange = e.target.value)}>
										{store.spaces.map(space => {
											return (
												<option key={space["id"]} value={space["id"]}>
													{space["name"]}
												</option>
											);
										})}
									</select>
								</li>
								<li className="d-flex row list-group-item text-left text-capitalize">
									<h3 className="col-2">Fecha:</h3>
									<input
										onChange={e => {
											scheduleDateToChange = e.target.value;
										}}
										className="col-6"
										defaultValue={scheduleDateToChange}
										type="date"
										onKeyDown={e => e.preventDefault()}
									/>
									<h3 className="col-1 ml-3">H:</h3>
									<select
										className="col-2"
										defaultValue={scheduleDateHourToChange}
										onChange={e => (scheduleDateHourToChange = e.target.value)}>
										{hoursOptions}
									</select>
								</li>
							</ul>
						) : (
							""
						)}
					</ModalBody>
					<ModalFooter className="m-auto">
						<button
							className="btn btn-confirm text-white"
							onClick={() => {
								if (
									parseInt(scheduleSpaceIDToChange) == store.scheduleToChange["space_id"] &&
									scheduleDateToChange + " " + scheduleDateHourToChange ==
										format(
											subHours(new Date(store.scheduleToChange["date"]), 2),
											"yyyy-MM-dd HH:mm"
										)
								) {
									setShow(false);
								} else {
									actions.changeSchedule(
										scheduleSpaceIDToChange,
										scheduleDateToChange,
										scheduleDateHourToChange
									);
									setShow(false);
								}
							}}>
							Confirmar
						</button>
						<button
							className="btn btn-close text-white"
							onClick={() => {
								setShow(false);
							}}>
							Cancelar
						</button>
					</ModalFooter>
				</Modal>
			) : (
				""
			)}
		</>
	);
};
