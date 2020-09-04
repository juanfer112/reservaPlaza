import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { MonthNav } from "./monthNav";
import { format, startOfMonth, subHours, getDaysInMonth, getMonth, getYear } from "date-fns";

export const ResumeReserve = n => {
	const { actions, store } = useContext(Context);
	const dataMonthPickerdate = n.dataMonthPickerdate;
	const showMonth = n.showMonth;
	const selectedYear = n.showYear;
	const updatedDate = n.updatedDate;
	const currentDay = n.currentDay;
	const currentMonth = n.currentMonth;
	const fechas = n.fechas;
	useEffect(
		() => {
			actions.pullSchedulerByMonth(updatedDate);
		},
		[showMonth, selectedYear]
	);

	/*renderizado de los dias de la semana*/
	const arrayDay = ["Lunes ", "Martes ", "Miercoles ", "Jueves ", "Viernes ", "Sabado ", "Domingo "];
	const weekdays = arrayDay.map(day => {
		return (
			<div key={day} className="weekday">
				{day}
			</div>
		);
	});

	/*Generar espacios libres si */
	var blanks = [];
	for (let i = 0; i < format(startOfMonth(updatedDate), "i") - 1; i++) {
		blanks.push(
			<div key={i * 20} className="empty-slot">
				{""}
			</div>
		);
	}
	/*-----------------------------------------------------------------------------------------------------*/
	/*Establecer cantidad de dias por mes*/
	var daysInMonth = [];
	var result = [];

	for (let d = 1; d <= getDaysInMonth(updatedDate); d++) {
		let id = new Date(selectedYear, showMonth, d);

		// let className =
		// 	d == format(currentDay, "d") && showMonth == getMonth(currentDay, "M") ? "current-day span-style" : "days";

		const result = fechas.filter(
			fecha =>
				format(subHours(new Date(fecha.date), 2), "yyyy-MM-dd") ===
				format(new Date(selectedYear, showMonth, d), "yyyy-MM-dd")
		);

		if (d != format(currentDay, "d")) {
			let className = result.length > 0 ? "reserved-day day-block" : "day-block";

			daysInMonth.push(
				<div
					id={id}
					key={d}
					className={className}
					onClick={e => {
						actions.pullSchedulerByMonth(id);
						n.showModalCallback(true);
						n.updateDateCallback(id);
					}}>
					{d}
				</div>
			);
		} else {
			let className = result.length > 0 ? "reserved-day day-block" : "day-block";
			let className2 = result.length > 0 && showMonth == getMonth(currentDay, "M") ? "current-day " : "";

			daysInMonth.push(
				<div
					id={id}
					key={d}
					className={className}
					onClick={e => {
						actions.pullSchedulerByMonth(id);
						n.showModalCallback(true);
						n.updateDateCallback(id);
					}}>
					<div className={className2}>{d}</div>
				</div>
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

	var trElems = totalSlots.map((d, i) => {
		return <div key={i * 80}>{d}</div>;
	});
	/*------------------------------------------------------------------------------------------------------------*/
	return (
		<div className="container-day">
			{weekdays}
			{trElems}
		</div>
	);
};
