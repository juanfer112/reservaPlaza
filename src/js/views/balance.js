import React, { useState, useContext, useEffect, useRef } from "react";
import { addDays, subDays, startOfDay, format } from "date-fns";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar";
import { AdminBalance } from "../component/adminBalance";
import { Link } from "react-router-dom";

export const Balance = () => {
	const { store, actions } = useContext(Context);
	const arrayDays = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
	const listRefs = store.week.map((ref, index) => {
		return useRef(index);
	});
	const executeScroll = myRef => window.scrollTo(0, myRef.current.offsetTop);
	return (
		<>
			<Navbar />
			<div className="d-flex justify-content-between mt-3">
				<i
					className="fa fa-arrow-left mx-3 mb-1"
					aria-hidden="true"
					onClick={() => actions.changeWeekOrDay("beforeWeek")}
				/>
				<i
					className="fa fa-arrow-right mx-3 mb-1"
					aria-hidden="true"
					onClick={() => actions.changeWeekOrDay("afterWeek")}
				/>
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
			<button className="fixed-bottom btn-md m-5 ml-auto btn-secondary" onClick={() => window.scrollTo(0, 0)}>
				CIAO
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
