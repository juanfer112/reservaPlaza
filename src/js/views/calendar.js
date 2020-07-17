import React, { useState, useContext, useReducer, useEffect } from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";
import { Scheduler } from "../component/scheduler";
import { Navbar } from "../component/navbar";

export const Calendar = () => {
	const { store, actions } = useContext(Context);
	const [dropdownOpen, setOpen] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);
	return (
		<div className="scheduler">
			<Navbar />
			<div className="list-group list-group-horizontal">
				<ButtonDropdown className="btnDropdown" isOpen={dropdownOpen} toggle={toggle}>
					<DropdownToggle className="btnDropdown" caret="lg" color="success">
						<i className="fa fa-info-circle pt-1 pr-2" />
						{store.selectedSpace != undefined ? store.selectedSpace["name"] : "loading..."}
					</DropdownToggle>
					<DropdownMenu className="dropD text-center font-weight-bold">
						{store.spaces.map((space, index) => {
							return (
								<DropdownItem onClick={() => actions.selectedSpace(index)} key={index}>
									{space["name"]}
								</DropdownItem>
							);
						})}
					</DropdownMenu>
				</ButtonDropdown>
				<p>{"Te quedan " + (store.user != undefined ? store.user["tot_hours"] : "loading...") + " horas!"}</p>
			</div>
			<div className="d-flex justify-content-between mx-3 w-100">
				<i
					className="fa fa-arrow-left ml-3 mb-1"
					aria-hidden="true"
					onClick={() => actions.changeWeek("before")}>
					semana -1
				</i>
				<i
					className="fa fa-arrow-right mr-3 mb-1"
					aria-hidden="true"
					onClick={() => actions.changeWeek("after")}>
					semana +1
				</i>
			</div>

			<Scheduler />
			<div className="row bg-white fixed-bottom py-3">
				<p className="nightHours ml-4">
					<p>
						Servicio 24H disponible, pinches
						<i className="text-primary" onClick={() => actions.changeNight()}>
							{" "}
							aqui{" "}
						</i>
						para reservar horas de noche
					</p>
				</p>
				<button className="confirm btn btn-success mx-auto pb-5" onClick={() => actions.postSchedules()}>
					Finalizar
				</button>
			</div>
		</div>
	);
};
