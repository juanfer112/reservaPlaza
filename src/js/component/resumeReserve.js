import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { MonthNav } from "./monthNav";
import { format, startOfMonth, getDaysInMonth, getMonth, getYear } from "date-fns";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const ResumeReserve = n => {
	const { actions, store } = useContext(Context);
	const dataPickerdate = n.dataPickerdate;
	const currentDay = store.currentDay;
	const currentMonth = getMonth(currentDay, "M");
	const selectedMonth = getMonth(dataPickerdate, "M");
	const selectedYear = getYear(dataPickerdate, "YYYY");

	const arrayDay = ["Lunes ", "Martes ", "Miercoles ", "Jueves ", "Viernes ", "Sabado ", "Domingo "];

	const weekdays = arrayDay.map(day => {
		return (
			<td key={day} className="week-day">
				{day}
			</td>
		);
	});

	var blanks = [];
	for (let i = 0; i < format(startOfMonth(dataPickerdate), "i") - 1; i++) {
		blanks.push(
			<td key={i * 20} className="empty-slot">
				{""}
			</td>
		);
	}
	/*-----------------------------------------------------------------------------------------------------*/
	/*Establecer cantidad de dias por mes*/

	var daysInMonth = [];
	for (let d = 1; d <= getDaysInMonth(dataPickerdate); d++) {
		let id = format(new Date(selectedYear, selectedMonth, d), "yyyy-MM-dd HH:mm:ss");

		let className =
			d == format(currentDay, "d") && selectedMonth == getMonth(currentDay, "M") ? "days current-day" : "days";
		daysInMonth.push(
			<td
				id={id}
				key={d}
				className={className}
				onClick={e => {
					actions.pullSchedulerByMonth(id);
					n.showModalCallback(true);
					n.updateDateCallback(id);
				}}>
				<span>{d}</span>
			</td>
		);
	}
	/*----------------------------------------------------------------------------------------------------------------*/
	/*----------------------------------------------------------------------------------------------------------------*/
	/*generar matriz de dias correspondientes del mes y completado con dias de otros mes */

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
	/*------------------------------------------------------------------------------------------------------------*/
	return (
		<tbody>
			<tr>{weekdays}</tr>
			{trElems}
		</tbody>
	);
};
