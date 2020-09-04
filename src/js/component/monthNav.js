import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { ResumeReserve } from "./resumeReserve";
import { ResumeModal } from "../component/resumeModal";
import { format, startOfDay, getYear, getDaysInMonth, getMonth, setMonth, set } from "date-fns";

export const MonthNav = () => {
	const { actions, store } = useContext(Context);
	const currentDay = startOfDay(new Date());
	const currentMonth = getMonth(currentDay, "M");
	const [showMonth, setMonthDatapicker] = useState(currentMonth);
	const [showYear, setYearDatapicker] = useState(getYear(currentDay));
	const [showListMonth, showMonthpopup] = useState(false);
	const [dates, setDates] = useState(currentDay);
	const [show, setShow] = useState(false);
	const updatedDate = set(currentDay, {
		year: showYear,
		month: showMonth,
		date: format(currentDay, "d")
	});
	const updateDateCallback = id => {
		setDates(id);
	};
	const showModalCallback = visibility => {
		setShow(visibility);
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
	/*traductor de meses de ingles a español de los meses renderizados*/

	const monthsTranslator = n => {
		return arrayMonthsNames[n - 1];
	};

	const month = (letter = "M") => {
		return monthsTranslator(format(currentDay, letter));
	};
	/*Seteo de meses en listado*/
	const setMonths = (e, month) => {
		let monthNo = arrayMonthsNames.indexOf(month);
		setMonthDatapicker(monthNo);
	};
	const prevMonth = (e, month) => {
		let monthNo = month - 1;
		if (monthNo < 0) {
			let newYear = showYear - 1;
			setMonthDatapicker(11);
			setYearDatapicker(newYear);
		} else {
			setMonthDatapicker(monthNo);
		}
	};

	const postMonth = (e, month) => {
		let monthNo = month + 1;
		if (monthNo > 11) {
			let newYear = showYear + 1;
			setMonthDatapicker(0);
			setYearDatapicker(newYear);
		} else {
			setMonthDatapicker(monthNo);
		}
	};
	const setYear = e => {
		setYearDatapicker(getYear(new Date(e.target.value, showMonth, format(currentDay, "d"))));
	};
	/*seteo de año en la cabecera*/

	/*Seleccion de mes del año en lista menu*/
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
	const fechas = store.reservedByMonth.map((reservadas, item) => {
		return reservadas;
	});

	return (
		<>
			<div className="calendar-container mx-5">
				<table className="calendar">
					<thead>
						<tr className="calendar-header">
							<td colSpan="5">
								<span className="label-month span-style" onClick={() => showMonthpopup(!showListMonth)}>
									{arrayMonthsNames[showMonth]}
									{"  "}

									<>{showListMonth ? <>{selectMonthList()}</> : <>{}</>}</>
								</span>
								<input
									className="editor-year"
									type="number"
									placeholder="year"
									onChange={e => {
										setYear(e);
									}}
									value={showYear}
								/>
							</td>
							<td colSpan="2">
								<div className="fc-button-group">
									<button
										type="button"
										className="fc-prev-button fc-button fc-state-default fc-corner-left"
										onClick={e => {
											prevMonth(e, showMonth);
										}}>
										<i className="fa fa-angle-left base-green" />
									</button>
									<button
										type="button"
										className="fc-next-button fc-button fc-state-default fc-corner-right"
										onClick={e => {
											postMonth(e, showMonth);
										}}>
										<i className="fa fa-angle-right base-green" />
									</button>
								</div>
							</td>
						</tr>
					</thead>
					<ResumeReserve
						currentMonth={currentMonth}
						showModalCallback={showModalCallback}
						updateDateCallback={updateDateCallback}
						updatedDate={updatedDate}
						showMonth={showMonth}
						showYear={showYear}
						fechas={fechas}
						currentDay={currentDay}
					/>
					<ResumeModal
						showModalCallback={showModalCallback}
						show={show}
						dates={dates}
						updatedDate={updatedDate}
					/>
				</table>
			</div>
			<div className="legend">
				<div className="legend-details">
					Dias reservados <span className="legend-reserved span-style">{""}</span>
				</div>
				<div className="legend-details">
					Día actual <span className="legend-blue span-style">{""}</span>
				</div>
			</div>
		</>
	);
};
