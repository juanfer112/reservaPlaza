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
	var week = store.week;
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
	for (let d = 0; d < startOfMonth(currentDay); d++) {
		blanks.push(<td className="empty-slot">{d}</td>);
	}

	var daysInMonth = [];
	for (let d = 0; d < getDaysInMonth(currentDay); d++) {
		daysInMonth.push(<td className="empty-slot">{d}</td>);
	}
	console.log("daysInMonth:", daysInMonth);
	console.log(startOfMonth(currentDay));

	return (
		<>
			<div className="calendar-container">
				<table className="calendar">
					<thead>
						<tr className="calendar-header">1</tr>
					</thead>
					<tbody>
						<tr>{weekofday}</tr>
					</tbody>
				</table>
			</div>
			<Button
				onClick={() => {
					dayofweek();
				}}>
				presiona
			</Button>
		</>
	);
};
