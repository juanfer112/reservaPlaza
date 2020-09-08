import React, { useContext, useReducer } from "react";
import { NewDay } from "./newDay";
import { Context } from "../store/appContext";
import { HoursColumn } from "./hoursColumn";
import "../../styles/home.scss";

export const Scheduler = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="rowSched">
			<div className="day col offset-xl-1 p-0">
				<HoursColumn />
			</div>
			{store.week.map(item => {
				return <NewDay key={item} day={item} />;
			})}
			<div className="row m-0 mt-3">
				<div className="legend-details offset-xl-1">
					Tus reservas <span className="legend-reserved span-style">{""}</span>
				</div>
				<div className="legend-details">
					Disponible <span className="legend-white span-style">{""}</span>
				</div>
				<div className="legend-details">
					Seleccionado <span className="legend-green span-style">{""}</span>
				</div>
				<div className="legend-details">
					No disponible <span className="legend-grey span-style">{""}</span>
				</div>
			</div>
		</div>
	);
};
