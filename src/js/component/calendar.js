import React, { useState, useContext } from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Scheduler } from "./scheduler";
import { ConfirModal } from "./confirModal";
import { SpacesModal } from "./spacesModal";

export const Calendar = () => {
	const { store, actions } = useContext(Context);
	const [dropdownOpen, setOpen] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);

	return (
		<div className="container-fluid p-0">
			<div className="row my-4 align-items-center">
				<ButtonDropdown
					className="btnDropdown col-1 offset-1 border-0 pl-1"
					isOpen={dropdownOpen}
					toggle={toggle}>
					<DropdownToggle className="btnDropdown pl-1" caret={true}>
						<SpacesModal />
						{store.selectedSpace != undefined ? store.selectedSpace["name"] : "loading..."}
					</DropdownToggle>
					<DropdownMenu className="text-center font-weight-bold">
						{store.spaces.map((space, index) => {
							return (
								<DropdownItem onClick={() => actions.selectedSpace(index)} key={index}>
									{space["name"]}
								</DropdownItem>
							);
						})}
					</DropdownMenu>
				</ButtonDropdown>
				{store.user != undefined && store.user != {} ? (
					<p className="availableHours ml-4">
						Hola <span className="title-font base-green">{store.user["name"]}</span>, le quedan{" "}
						{store.user["current_hours"]} horas
					</p>
				) : (
					"loading..."
				)}
			</div>
			<h4 className="text-center">
				{" "}
				Servicio 24H disponible, pincha
				<i className="text-primary" onClick={() => actions.changeNight()}>
					{" "}
					aqui{" "}
				</i>
				para reservar horas de noche
			</h4>
			<div className="month-navigate row">
				<h5 className="col-3 offset-1">{actions.currentMonth()}</h5>
				<div className="col-2 offset-5 p-0 d-flex">
					<div
						className="navSchedulerDays"
						onClick={() => {
							actions.changeWeekOrDay("beforeWeek");
						}}>
						<i className="fa fa-angle-left base-green" />
					</div>
					<div className="navSchedulerDays mx-1" onClick={() => actions.goToCurrentDay()}>
						Hoy
					</div>
					<div
						className="navSchedulerDays"
						onClick={() => {
							actions.changeWeekOrDay("afterWeek");
						}}>
						<i className="fa fa-angle-right base-green" />
					</div>
				</div>
			</div>
			<Scheduler />
			<ConfirModal />
		</div>
	);
};
