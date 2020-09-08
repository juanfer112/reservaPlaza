import React, { useContext, useRef } from "react";
import { format, addWeeks, subWeeks } from "date-fns";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { AdminBalance } from "../component/adminBalance";

export const Balance = () => {
	const { store, actions } = useContext(Context);
	const arrayDays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
	const listRefs = store.week.map((ref, index) => {
		return useRef(index);
	});
	const executeScroll = myRef => window.scrollTo(0, myRef.current.offsetTop);

	return (
		<>
			<div className="row mt-2 mx-xl-5 mx-2 justify-content-between">
				<div className="btn-toolbar my-xl-3 p-0">
					{store.week.map((week, index) => {
						return (
							<button
								className="btn btn-md font-weight-bold mx-1 mt-1"
								key={week}
								onClick={() => executeScroll(listRefs[index])}>
								{arrayDays[index]}
							</button>
						);
					})}
				</div>
				<div className="d-flex align-items-end mb-xl-2 mt-2 px-0">
					<div
						className="d-flex navSchedulerDays newWeek justify-content-center pt-1"
						onClick={() => {
							actions.changeWeek("beforeWeek");
						}}>
						<p className="font-weight-bold">
							<i className="fa fa-angle-left mr-2 pt-1" aria-hidden="true" />
							{store.week ? format(subWeeks(store.week[0], 1), "dd- MM") : ""}
						</p>
					</div>
					<div
						className="navSchedulerDays current-week newWeek pt-1 mx-2 "
						onClick={() => actions.goToCurrentDay()}>
						<p className="font-weight-bold">Semana corriente</p>
					</div>
					<div
						className="d-flex navSchedulerDays newWeek justify-content-center pt-1"
						onClick={() => {
							actions.changeWeek("afterWeek");
						}}>
						<p className="font-weight-bold">
							{store.week ? format(addWeeks(store.week[0], 1), "dd- MM") : ""}
							<i className="fa fa-angle-right  ml-2 pt-1" aria-hidden="true" />
						</p>
					</div>
				</div>
			</div>
			<button className="btn-new-user fixed-bottom m-5 ml-auto" onClick={() => window.scrollTo(0, 0)}>
				<i className="fa fa-arrow-up" />
			</button>
			{store.week.map((item, index) => {
				return (
					<div key={item} ref={listRefs[index]} className="mx-xl-5">
						<AdminBalance day={item} />
					</div>
				);
			})}
		</>
	);
};
