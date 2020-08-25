import React, { useState, useContext, useEffect, useRef } from "react";
import { addDays, subDays, startOfDay, format, addWeeks, subWeeks } from "date-fns";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar";
import { AdminBalance } from "../component/adminBalance";
import { Link } from "react-router-dom";

export const Balance = () => {
	const { store, actions } = useContext(Context);
	const arrayDays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
	const listRefs = store.week.map((ref, index) => {
		return useRef(index);
	});
	const executeScroll = myRef => window.scrollTo(0, myRef.current.offsetTop);

	return (
		<>
			<Navbar />
			<Link to={"/listOfUsers/:theid"}>USER LIST!</Link>
			<div className="d-flex justify-content-between mt-3">
				<div className="d-flex">
					<i
						className="fa fa-arrow-left mx-3 mb-1"
						aria-hidden="true"
						onClick={() => actions.changeWeekOrDay("beforeWeek")}
					/>
					<p>{store.week ? format(subWeeks(store.week[0], 1), "dd-MM") : ""}</p>
				</div>
				<div className="d-flex">
					<p>{store.week ? format(addWeeks(store.week[0], 1), "dd-MM") : ""}</p>
					<i
						className="fa fa-arrow-right mx-3 mb-1"
						aria-hidden="true"
						onClick={() => actions.changeWeekOrDay("afterWeek")}
					/>
				</div>
			</div>
			<div className="btn-toolbar m-3">
				{store.week.map((week, index) => {
					return (
						<button
							type="button"
							className="btn btn-md btn-secondary border"
							key={week}
							onClick={() => executeScroll(listRefs[index])}>
							{arrayDays[index]}
						</button>
					);
				})}
			</div>
			<button className="fixed-bottom btn btn-md btn-secondary btn-up" onClick={() => window.scrollTo(0, 0)}>
				UP
			</button>
			{store.week.map((item, index) => {
				return (
					<div key={item} ref={listRefs[index]}>
						<AdminBalance day={item} />
					</div>
				);
			})}
		</>
	);
};
