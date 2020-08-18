import React, { useState, useContext } from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Context } from "../store/appContext";
import { Link, Redirect } from "react-router-dom";
import "../../styles/home.scss";
import arrowButton from "../../../assets/right.png";
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
				<div className="scheduler">
					<Navbar />
					<Link to={"/profile/:theid"}>PROFILE!</Link>
					<div className="list-group-horizontal my-4">
						<ButtonDropdown className="btnDropdown ml-5" isOpen={dropdownOpen} toggle={toggle}>
							<DropdownToggle className="btnDropdown" caret="lg" color="success">
								<SpacesModal />
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
						<p className="availableHours mr-auto ml-4">
							{(store.user != undefined ? store.user["current_hours"] : "loading...") + "/H restantes"}
						</p>
					</div>
					<p className="nightHours ml-4">
						<p>
							{" "}
							Servicio 24H disponible, pincha
							<i className="text-primary" onClick={() => actions.changeNight()}>
								{" "}
								aqui{" "}
							</i>
							para reservar horas de noche
						</p>
					</p>
					<div className="d-flex align-items-center justify-content-between w-75">
						<img
							className="arrowButtonLeft"
							src={arrowButton}
							onClick={() => {
								actions.changeWeekOrDay("beforeWeek");
							}}
						/>
						<img
							className="arrowButtonRight"
							src={arrowButton}
							onClick={() => {
								actions.changeWeekOrDay("afterWeek");
							}}
						/>
					</div>
					<Scheduler />
					<ConfirModal />
				</div>
			)}
		</>
	);
};
