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
	getDaysInMonth,
	getMonth
} from "date-fns";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const MonthNav = n => {
	const { actions, store } = useContext(Context);
	var position = n.style;
	console.log(position);
	var adminScheduler = [];
	var currentDay = store.currentDay;
	console.log(format(startOfMonth(currentDay), "i"));
	var night = !store.night ? " d-none" : "";
	const [showMonth, showMonthpopup] = useState(false);
	const [show, setShow] = useState(false);
	function toggle() {
		setShow(!show);
	}
	const month = letter => {
		return format(currentDay, letter);
	};
	const arrayMonthsNames = [
		"Enero ",
		"Febrero ",
		"Marzo ",
		"Abril ",
		"Mayo ",
		"Junio ",
		"Julio ",
		"Agosto ",
		"Septiembre ",
		"Octubre ",
		"Noviembre ",
		"Diciembre "
	];

	const monthsTranslator = n => {
		return arrayMonthsNames[n - 1];
	};

	const selectMonthList = () => {
		let popup = arrayMonthsNames.map(month => {
			return (
				<div key={month}>
					<a href="#">{month}</a>
				</div>
			);
		});
		return <div className="month-popup">{popup}</div>;
	};

	return (
		<>
			<span className="label-month" onClick={e => showMonthpopup(!showMonth)}>
				{monthsTranslator(month("M"))}

				{showMonth ? <>{selectMonthList()}</> : <>nada</>}
			</span>
		</>
	);
};
