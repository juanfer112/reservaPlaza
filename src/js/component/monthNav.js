import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { ResumeReserve } from "./resumeReserve";
import { ResumeModal } from "../component/resumeModal";
import { format, addMonths, getYear, getDaysInMonth, getMonth, setMonth, set } from "date-fns";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const MonthNav = () => {
	const { actions, store } = useContext(Context);
	const currentDay = store.currentDay;
	const currentMonth = getMonth(currentDay, "M");
	const [showMonth, setMonthDatapicker] = useState(currentMonth);
	const [showYear, setYearDatapicker] = useState(getYear(currentDay));
	const [showListMonth, showMonthpopup] = useState(false);
	const [dates, setDates] = useState(currentDay);
	const [show, setShow] = useState(false);
	const updatedDate = set(currentDay, { year: showYear, month: showMonth, date: format(currentDay, "d") });
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
	/*seteo de año en la cabecera*/
	const setYear = e => {
		setYearDatapicker(getYear(new Date(e.target.value, showMonth, format(currentDay, "d"))));
	};
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
										setYear(e);
									}}
									value={showYear}
								/>
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
					/>
					<ResumeModal
						showModalCallback={showModalCallback}
						show={show}
						dataPickerdate={dates}
						updatedDate={updatedDate}
					/>
				</table>
			</div>
		</>
	);
};
