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
	var adminScheduler = [];
	var currentDay = store.currentDay;
	console.log(format(startOfMonth(currentDay), "d"));
	var night = !store.night ? " d-none" : "";
	const [show, setShow] = useState(false);
	function toggle() {
		setShow(!show);
	}

	const dayofweek = () => {
		var dayNumber = format(currentDay, "d");
		var month = format(currentDay, "LL").toString();
		console.log("month:", month);
		var dayAndMonth = dayNumber + "/" + month;
		var dayNameIndex = format(currentDay, "i").toString();
		const arrayDayNames = ["Lunes ", "Martes ", "Miercoles ", "Jueves ", "Viernes ", "Sabado ", "Domingo "];
		console.log("days:", arrayDayNames[dayNameIndex - 1] + dayAndMonth);
		return arrayDayNames[dayNameIndex - 1];
	};

	const arrayDay = ["Lunes ", "Martes ", "Miercoles ", "Jueves ", "Viernes ", "Sabado ", "Domingo "];

	const weekofday = arrayDay.map(day => {
		return (
			<td key={day} className="week-day">
				{day}
			</td>
		);
	});

	var blanks = [];
	for (let i = 0; i < format(startOfMonth(currentDay), "d"); i++) {
		blanks.push(<td className="empty-slot">{""}</td>);
	}

	var daysInMonth = [];
	for (let d = 1; d <= getDaysInMonth(currentDay); d++) {
		let className = d == format(currentDay, "d") ? "day current-day" : "day";
		daysInMonth.push(
			<td key={d} className={className}>
				<span>{d}</span>
			</td>
		);
	}

	var totalSlots = [...blanks, ...daysInMonth];
	var rows = [];
	var cells = [];

	totalSlots.forEach((row, i) => {
		if (i % 7 != 0) {
			cells.push(row);
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
						<tr className="calendar-header">1</tr>
					</thead>
					<tbody>
						<tr>{weekofday}</tr>
						{trElems}
					</tbody>
				</table>
			</div>
		</>
	);
};
