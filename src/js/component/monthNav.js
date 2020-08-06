import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { ResumeReserve } from "./resumeReserve";
import {
	format,
	addMonths,
	startOfDay,
	isFirstDayOfMonth,
	startOfMonth,
	getDaysInMonth,
	getMonth,
	setMonth,
	getYear,
	addYears,
	set
} from "date-fns";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const MonthNav = () => {
	const { actions, store } = useContext(Context);
	const currentDay = store.currentDay;
	console.log("currentDay:", format(currentDay, "d"));
	const currentMonth = getMonth(currentDay, "M");
	const [showMonth, setMonthDatapicker] = useState(currentMonth);
	const [showYear, setYearDatapicker] = useState(getYear(currentDay));
	console.log("showYear:", showYear);

	const [showListMonth, showMonthpopup] = useState(false);
	const [dataMonthPickerdate, setDataMonthPickerdate] = useState(currentDay);
	const [show, setShow] = useState(false);
	var updatedDate = set(currentDay, { year: showYear, month: showMonth, date: format(currentDay, "d") });

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
	const month = (letter = "M") => {
		return monthsTranslator(format(currentDay, letter));
	};

	const setMonths = (e, month) => {
		let monthNo = arrayMonthsNames.indexOf(month);
		let resultcurrentmonth = getMonth(currentDay, "M");

		setMonthDatapicker(monthNo);
		setDataMonthPickerdate(addMonths(updatedDate, monthNo - resultcurrentmonth));
	};

	const setYear = e => {
		console.log(e.target.value);

		setYearDatapicker(getYear(new Date(e.target.value, 7, 6)));
	};

	const selectMonthList = () => {
		let popup = arrayMonthsNames.map(month => {
			return (
				<div key={month}>
					<a
						href="#"
						onClick={e => {
							setMonths(e, month);
						}}>
						{month}
					</a>
				</div>
			);
		});
		return <div className="month-popup">{popup}</div>;
	};

	return (
		<>
			<div className="calendar-container">
				<table className="calendar">
					<thead>
						<tr className="calendar-header">
							<td colSpan="5">
								<span className="label-month" onClick={e => showMonthpopup(!showListMonth)}>
									{arrayMonthsNames[showMonth]}
									{"  "}

									<>{showListMonth ? <>{selectMonthList()}</> : <>{}</>}</>
								</span>
								<input
									defaultValue={getYear(currentDay)}
									className="editor-year"
									type="number"
									placeholder="year"
									onChange={e => {
										console.log(e.target.value);
										setYear(e);
									}}
									value={showYear}
								/>
							</td>
						</tr>
					</thead>
					<ResumeReserve
						dataMonthPickerdate={dataMonthPickerdate}
						currentMonth={currentMonth}
						updatedDate={updatedDate}
					/>
				</table>
			</div>
		</>
	);
};
