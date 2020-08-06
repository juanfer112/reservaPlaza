import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { MonthNav } from "./monthNav";
import {
	format,
	addMonths,
	startOfWeek,
	startOfDay,
	isFirstDayOfMonth,
	startOfMonth,
	getDaysInMonth,
	getMonth
} from "date-fns";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const ResumeReserve = n => {
	const { actions, store } = useContext(Context);
	const dataMonthPickerdate = n.dataMonthPickerdate;
	const updatedDate = n.updatedDate;
	const currentDay = store.currentDay;
	const currentMonth = getMonth(currentDay, "M");
	const selectedMonth = getMonth(dataMonthPickerdate, "M");
	console.log("newupdate:", updatedDate);
	const arrayDay = ["Lunes ", "Martes ", "Miercoles ", "Jueves ", "Viernes ", "Sabado ", "Domingo "];

	const weekdays = arrayDay.map(day => {
		return (
			<td key={day} className="week-day">
				{day}
			</td>
		);
	});

	var blanks = [];
	for (let i = 0; i < format(startOfMonth(dataMonthPickerdate), "i") - 1; i++) {
		console.log("formatstartofmonth:", startOfMonth(updatedDate));
		blanks.push(
			<td key={i * 20} className="empty-slot">
				{""}
			</td>
		);
	}

	var daysInMonth = [];
	for (let d = 1; d <= getDaysInMonth(dataMonthPickerdate); d++) {
		let className =
			d == format(currentDay, "d") && selectedMonth == getMonth(currentDay, "M") ? "days current-day" : "days";
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
		<tbody>
			<tr>{weekdays}</tr>
			{trElems}
		</tbody>
	);
};
