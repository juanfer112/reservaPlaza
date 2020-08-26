import React, { useContext, useReducer } from "react";
import { NewDay } from "./newDay";
import { Context } from "../store/appContext";
import { HoursColumn } from "./hoursColumn";
import "../../styles/home.scss";

export const Scheduler = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="rowSched">
			<div className="day col offset-lg-1 p-0">
				<HoursColumn />
			</div>
			{store.week.map(item => {
				return <NewDay key={item} day={item} />;
			})}
		</div>
	);
};
