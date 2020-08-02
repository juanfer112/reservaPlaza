import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { HoursColumn } from "./hoursColumn";
import "../../styles/home.scss";
import { NewDay } from "./newDay";
import {
	format,
	addHours,
	subHours,
	addMonths,
	startOfWeek,
	endOfDay,
	addDays,
	subDays,
	addWeeks,
	subWeeks,
	startOfDay,
	isFirstDayOfMonth,
	startOfMonth,
	getDaysInMonth
} from "date-fns";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const ResumeReserve = n => {
	const { actions, store } = useContext(Context);
	var position = n.style;
	console.log(position);
	var adminScheduler = [];
	var currentDay = store.currentDay;
	var night = !store.night ? " d-none" : "";
	const [show, setShow] = useState(false);
	function toggle() {
		setShow(!show);
	}

	const dayofweek = () => {
		var dayNumber = format(currentDay, "d");
		var month = format(currentDay, "LL").toString();
		console.log(startOfMonth(currentDay));
		var dayAndMonth = dayNumber + "/" + month;
		var dayNameIndex = format(currentDay, "i").toString();
		const arrayDayNames = ["Lunes ", "Martes ", "Miercoles ", "Jueves ", "Viernes ", "Sabado ", "Domingo "];
		console.log("days:", arrayDayNames[dayNameIndex - 1] + dayAndMonth);
		return arrayDayNames[dayNameIndex - 1];
	};

	const arrayDay = ["Lunes ", "Martes ", "Miercoles ", "Jueves ", "Viernes ", "Sabado ", "Domingo "];

	const weekdays = arrayDay.map(day => {
		return (
			<td key={day} className="week-day">
				{day}
			</td>
		);
	});

	var blanks = [];
	for (let i = 0; i < format(currentDay, "i") - 1; i++) {
		blanks.push(<td className="empty-slot">{""}</td>);
	}
	console.log(blanks, format(currentDay, "i"));

	var daysInMonth = [];
	for (let d = 1; d <= getDaysInMonth(currentDay); d++) {
		let className = d == format(currentDay, "d") ? "days current-day" : "days";
		daysInMonth.push(
			<td key={d} className={className}>
				<span>{d}</span>
			</td>
		);
	}

	var totalSlots = [...blanks, ...daysInMonth];
	var cells = [];
	var rows = [];

	totalSlots.forEach((row, i) => {
		console.log(totalSlots);
		if (i % 7 != 0) {
			cells.push(row);
			console.log(cells);
		} else {
			let insertRow = cells.slice();
			rows.push(insertRow);
			cells = [];
			cells.push(row);
		}
		if (i == totalSlots.length - 1) {
			let insertRow = cells.slice();
			rows.push(insertRow);
		}
	});

	var trElems = rows.map((d, i) => {
		return <tr key={i * 80}>{d}</tr>;
	});

	return (
		<>
			<div className="calendar-container">
				<table className="calendar">
					<thead>
						<tr className="calendar-header" />
					</thead>
					<tbody>
						<tr>{weekdays}</tr>
						{trElems}
					</tbody>
				</table>
			</div>
		</>
	);
};
