import React, { useState, useContext } from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Context } from "../store/appContext";
import { Redirect } from "react-router-dom";
import "../../styles/home.scss";
import { Scheduler } from "../component/scheduler";
import { Navbar } from "../component/navbar";
import { ConfirModal } from "../component/confirModal";
import { SpacesModal } from "../component/spacesModal";

export const Calendar = () => {
	const { store, actions } = useContext(Context);
	const [dropdownOpen, setOpen] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);

	if (
		sessionStorage["access_token"] &&
		sessionStorage["access_token"] != "null" &&
		sessionStorage["is_admin"] == "true"
	) {
		return <Redirect to="/adminView" />;
	} else if (
		!sessionStorage["access_token"] ||
		sessionStorage["access_token"] == "null" ||
		sessionStorage["access_token"] == undefined
	) {
		return <Redirect to="/" />;
	} else if (
		sessionStorage["access_token"] &&
		sessionStorage["access_token"] != "null" &&
		sessionStorage["is_admin"] == "false"
	) {
		return (
			<div className="container-fluid p-0">
				<Navbar />
				<div className="row my-4 align-items-center">
					<ButtonDropdown
						className="btnDropdown col-1 offset-1 border-0"
						isOpen={dropdownOpen}
						toggle={toggle}>
						<DropdownToggle className="btnDropdown" caret={true}>
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
					{sessionStorage["is_admin"] ? (
						<p className="col ml-3">
							{"Hola "}
							<span className="title-font base-green">{store.user["name"]}</span>
							{" , le quedan " + store.user["current_hours"] + " horas"}
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
						<div className="navSchedulerDays mx-2" onClick={() => actions.goToCurrentDay()}>
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
	}
};
