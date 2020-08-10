import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { MonthNav } from "./monthNav";
import { format, startOfMonth, getDaysInMonth, getMonth, getYear } from "date-fns";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const ResumeReserve = n => {
	const { actions, store } = useContext(Context);
	const dataMonthPickerdate = n.dataMonthPickerdate;
	const selectedMonth = n.showMonth;
	const selectedYear = n.showYear;
	const updatedDate = n.updatedDate;
	const currentDay = store.currentDay;
	const currentMonth = n.currentMonth;

	/*renderizado de los dias de la semana*/
	const arrayDay = ["Lunes ", "Martes ", "Miercoles ", "Jueves ", "Viernes ", "Sabado ", "Domingo "];
	const weekdays = arrayDay.map(day => {
		return (
			<td key={day} className="week-day">
				{day}
			</td>
		);
	});

	/*Generar espacios libres si */
	var blanks = [];
	for (let i = 0; i < format(startOfMonth(updatedDate), "i") - 1; i++) {
		blanks.push(
			<td key={i * 20} className="empty-slot">
				{""}
			</td>
		);
	}

	var daysInMonth = [];
	for (let d = 1; d <= getDaysInMonth(updatedDate); d++) {
		let className =
			d == format(currentDay, "d") && selectedMonth == currentMonth && selectedYear == getYear(currentDay)
				? "days current-day"
				: "days";

		daysInMonth.push(
			<td
				key={d}
				className={className}
				onClick={() => {
					console.log("d:", d, "formatday:", format(currentDay, "d"), "className:", className);
					console.log(
						"selectedMonth:",
						selectedMonth,
						"getMonth:",
						getMonth(currentDay, "M"),
						"className:",
						className
					);
					console.log(
						"selectedYear:",
						selectedYear,
						"getYear:",
						getYear(currentDay),
						"className:",
						className
					);
				}}>
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
