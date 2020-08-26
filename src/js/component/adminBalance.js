import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { format, addHours, subHours, subDays } from "date-fns";
import { Table, Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const AdminBalance = n => {
	const { actions, store } = useContext(Context);
	var adminScheduler = [];
	var currentDay = n.day;
	var night = !store.night ? " d-none" : "";
	var scheduleSpaceIDToChange;
	var scheduleDateToChange;
	var scheduleDateHourToChange;

	const [show, setShow] = useState(false);
	var hoursOptions = [];

	for (let hour = 0; hour < 24; hour++) {
		let value = hour < 10 ? (value = "0" + hour.toString() + ":00") : (value = hour.toString() + ":00");
		hoursOptions.push(
			<option key={hour} value={value}>
				{value}
			</option>
		);
	}

	for (let hour = 0; hour < 25; hour++) {
		var holderSpacesHours = [];
		var titleHour = hour < 11 ? `0${hour - 1}:00` : `${hour - 1}:00`;

		for (let currentSpace = 0; currentSpace < store.spaces.length; currentSpace++) {
			let spaceID = store.spaces[currentSpace]["id"];
			let id = format(subHours(currentDay, 1), "yyyy-MM-dd HH:mm:ss").toString();
			let className = actions.reservedDate(id, spaceID) + " text-white font-weight-bold";
			if (hour == 0 && currentSpace == 0) {
				holderSpacesHours.push(
					<>
						<th className="px-5 thFirst bg-white" />
						<th className="px-5 text-center thSpace bg-white">{store.spaces[currentSpace]["name"]}</th>
					</>
				);
			} else if (hour == 0) {
				holderSpacesHours.push(
					<th className="px-5 text-center thSpace bg-white">{store.spaces[currentSpace]["name"]}</th>
				);
			} else if (currentSpace == 0) {
				holderSpacesHours.push(
					<>
						<th className="px-5 text-center tHours bg-white">{titleHour}</th>
						<td
							onClick={e => {
								if (className == " reserved") {
									setShow(!show),
										actions.selectScheduleToChange(e.target.id, store.spaces[currentSpace]["id"]);
								}
							}}
							className={"px-2 text-center" + className}
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
							if (className == " reserved") {
								setShow(!show),
									actions.selectScheduleToChange(e.target.id, store.spaces[currentSpace]["id"]);
							}
						}}
						className={"px-2 text-center" + className}
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
		adminScheduler.push(<tr className={hour > 0 && hour < 9 ? night : ""}>{holderSpacesHours}</tr>);
		currentDay = addHours(currentDay, 1);
	}

	return (
		<>
			<div className="d-flex fixed justify-content-center p-2 my-2 bg-white w-100">
				<p>
					{" "}
					Pincha
					<i className="text-primary" onClick={() => actions.changeNight()}>
						{" "}
						aqui{" "}
					</i>
					para ver todas las horas!
				</p>
			</div>
			<div ref={n.ref} className="title text-center font-weight-bold mx-5">
				{actions.transformDay(subDays(currentDay, 1))}
			</div>
			<div className="row mb-5">
				<div className="container-fluid container-balance mx-5">
					<Table responsive striped bordered hover variant="dark">
						{adminScheduler}
					</Table>
				</div>
			</div>
			<Modal className="modalChange" backdrop="false" isOpen={show} toggle={() => setShow(!show)}>
				<ModalBody>
					{store.scheduleToChange ? (
						<ul className="list-group">
							<li className="d-flex justify-content-center py-2">
								<h3 className="text-center">{store.scheduleToChange["enterprise_name"]}</h3>
							</li>
							<li className="d-flex row list-group-item text-left text-capitalize">
								<h3 className="col-2">Salas:</h3>
								<select onChange={e => (scheduleSpaceIDToChange = e.target.value)} className="col-9">
									{store.spaces.map(space => {
										if (store.scheduleToChange["space_id"] == space["id"]) {
											return (
												<option selected key={space["id"]} value={space["id"]}>
													{space["name"]}
												</option>
											);
										} else {
											return (
												<option key={space["id"]} value={space["id"]}>
													{space["name"]}
												</option>
											);
										}
									})}
								</select>
							</li>
							<li className="d-flex row list-group-item text-left text-capitalize">
								<h3 className="col-2">Fecha:</h3>
								<input
									onChange={e => (scheduleDateToChange = e.target.value)}
									className="col-6"
									type="date"
									onKeyDown={e => e.preventDefault()}
								/>
								<h3 className="col-1 ml-3">H:</h3>
								<select onChange={e => (scheduleDateHourToChange = e.target.value)} className="col-2">
									{hoursOptions}
								</select>
							</li>
						</ul>
					) : (
						""
					)}
				</ModalBody>
				<ModalFooter className="m-auto">
					<Button
						className="btn-confirm"
						onClick={
							store.scheduleToChange
								? () => {
										actions.changeSchedule(
											scheduleSpaceIDToChange,
											scheduleDateToChange,
											scheduleDateHourToChange
										);
										actions.changeSchedulePUT();
								  }
								: ""
						}>
						Confirmar
					</Button>
					<Button
						className="btn-close"
						onClick={() => {
							setShow(!show);
						}}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};
