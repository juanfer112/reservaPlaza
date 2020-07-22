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
			<div className="list-group-horizontal my-4">
				<ButtonDropdown className="btnDropdown ml-5" isOpen={dropdownOpen} toggle={toggle}>
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
				<p className="mr-auto ml-4">
					{"Te quedan " + (store.user != undefined ? store.user["tot_hours"] : "loading...") + " horas!"}
				</p>
			</div>
			<div className="d-flex align-items-center justify-content-between w-100">
				<div className="d-flex">
					<i
						className="fa fa-arrow-left ml-3 mb-1"
						aria-hidden="true"
						onClick={() => actions.changeWeek("before")}
					/>
					<p className="ml-2">semana anterior</p>
				</div>
				<h3 className="mb-0">{actions.currentMonth()}</h3>
				<div className="d-flex">
					<p className="mr-2">semana siguiente</p>
					<i
						className="fa fa-arrow-right mr-3 mb-1"
						aria-hidden="true"
						onClick={() => actions.changeWeek("after")}
					/>
				</div>
			</div>

			<Scheduler />

			<div className="footer row bg-white py-3">
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
