import React, { useState, useContext } from "react";
import { addDays, subDays, startOfDay, format } from "date-fns";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar";
import { AdminBalance } from "../component/adminBalance";

export const Balance = () => {
	const { store, actions } = useContext(Context);
	var currentDay = store.currentDay;
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

			{store.week.map(item => {
				return <AdminBalance key={item} day={item} />;
			})}
		</>
	);
};
