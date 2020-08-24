import React, { useState, useContext } from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Context } from "../store/appContext";
import { Link, Redirect } from "react-router-dom";
import "../../styles/home.scss";
import { Scheduler } from "../component/scheduler";
import { Navbar } from "../component/navbar";
import { ConfirModal } from "../component/confirModal";
import { SpacesModal } from "../component/spacesModal";

export const Calendar = () => {
	const { store, actions } = useContext(Context);
	const [dropdownOpen, setOpen] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);

	return (
		<>
			{store.token != null && store.admin ? (
				<>
					<Redirect to="/listOfUsers" />
				</>
			) : (
				<div className="container-fluid p-0">
					<Navbar />
					<div className="list-group-horizontal my-4 align-items-center">
						<ButtonDropdown className="btnDropdown ml-5" isOpen={dropdownOpen} toggle={toggle}>
							<DropdownToggle className="btnDropdown" color caret="xs">
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
						<p className="availableHours mr-auto ml-4">
							{store.user != undefined ? (
								<p>
									Hola <span className="title-font base-green">{store.user["name"]}</span>, le quedan{" "}
									{store.user["current_hours"]} horas
								</p>
							) : (
								"loading..."
							)}
						</p>
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
					<div className="month-navigate d-flex align-items-center justify-content-around">
						<h5>{actions.currentMonth()}</h5>
						<div />
						<div>
							<i
								className="fa fa-angle-left base-green"
								onClick={() => {
									actions.changeWeekOrDay("beforeWeek");
								}}
							/>
							<i
								className="fa fa-angle-right base-green ml-3"
								onClick={() => {
									actions.changeWeekOrDay("afterWeek");
								}}
							/>
						</div>
					</div>
					<Scheduler />
					<ConfirModal />
				</div>
			)}
		</>
	);
};
