import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { MonthNav } from "./monthNav";
import { format, startOfMonth, subHours, getDaysInMonth, getMonth, getYear } from "date-fns";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const ResumeReserve = n => {
	const { actions, store } = useContext(Context);
	const dataMonthPickerdate = n.dataMonthPickerdate;
	const selectedMonth = n.showMonth;
	const selectedYear = n.showYear;
	const updatedDate = n.updatedDate;
	const currentDay = store.currentDay;
	const currentMonth = n.currentMonth;
	const fechas = n.fechas;

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
	/*-----------------------------------------------------------------------------------------------------*/
	/*Establecer cantidad de dias por mes*/
	var daysInMonth = [];
	var result = [];

	for (let d = 1; d <= getDaysInMonth(updatedDate); d++) {
		let id = format(new Date(selectedYear, selectedMonth, d), "yyyy-MM-dd HH:mm:ss");

		let className =
			d == format(currentDay, "d") && selectedMonth == getMonth(currentDay, "M") ? "days current-day" : "days";

		const result = fechas.filter(
			fecha =>
				format(subHours(new Date(fecha.date), 2), "yyyy-MM-dd") ===
				format(new Date(selectedYear, selectedMonth, d), "yyyy-MM-dd")
		);

		if (d != format(currentDay, "d")) {
			let className = result.length > 0 ? "reserved-day days" : "days";

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
		} else {
			let className = result.length > 0 ? "current-day days" : "days";

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
