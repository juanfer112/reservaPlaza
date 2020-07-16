import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { HoursColumn } from "./hoursColumn";
import "../../styles/home.scss";

export const AdminBalance = () => {
	return (
		<div className="row rowSched justify-content-center flex-nowrap">
			<div className="day col p-0">
				<HoursColumn />
			</div>
		</div>
	);
};
