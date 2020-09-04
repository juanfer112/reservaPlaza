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
	var xxx = arrayMonthsNames[showMonth];

	/*traductor de meses de ingles a español de los meses renderizados*/

	const monthsTranslator = n => {
		return arrayMonthsNames[n - 1];
	};

	const month = (letter = "M") => {
		return monthsTranslator(format(currentDay, letter));
	};
	/*Seteo de meses en listado*/
	const setMonths = (e, month) => {
		let monthNo = arrayMonthsNames.indexOf(e.target.value);
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
	const selectMonthList = arrayMonthsNames.map((month, index) => {
		return (
			<option
				key={index * 33}
				value={month}
				className="option-month"
				onClick={e => {
					console.log(e.target.value);
				}}>
				{month}
			</option>
		);
	});

	const fechas = store.reservedByMonth.map((reservadas, item) => {
		return reservadas;
	});

	return (
		<>
<<<<<<< HEAD
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
=======
			<div className="wrapper-datapicker">
				<div className="flip-container-left">
					<div className="flipper">
						<div className="front front-left">
							<h2>Hoy</h2>
							<h1>{format(currentDay, "d")}</h1>
							<h2>Viernes</h2>
						</div>
					</div>
				</div>
				<div className="flip-container-right">
					<div className="flipper">
						<div className="front front-right">
							<div className="container-date-picker">
								<button
									type="button"
									className="btn btn-prev"
									onClick={e => {
										prevMonth(e, showMonth);
									}}>
									&lt;
								</button>
								<select
									className="select-month"
									value={arrayMonthsNames[showMonth]}
									onChange={e => {
										setMonths(e);
									}}>
									{selectMonthList}
								</select>
>>>>>>> 08deced07b7ca48057978e693b78a59d85204980
								<input
									className="edit-year"
									type="text"
									placeholder="year"
									onChange={e => {
										setYear(e);
									}}
									value={showYear}
								/>
								<button
									type="button"
									className="btn btn-next"
									onClick={e => {
										postMonth(e, showMonth);
									}}>
									&gt;
								</button>
							</div>
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
						</div>
					</div>

					<ResumeModal
						showModalCallback={showModalCallback}
						show={show}
						dates={dates}
						updatedDate={updatedDate}
					/>
				</div>
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
