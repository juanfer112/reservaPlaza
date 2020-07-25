import React, { useState, useContext } from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";
import { Scheduler } from "../component/scheduler";
import { Navbar } from "../component/navbar";
import { ConfirModal } from "../component/confirModal";

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
				<p className="availableHours mr-auto ml-4">
					{(store.user != undefined ? store.user["tot_hours"] : "loading...") + "/H restantes"}
				</p>
			</div>
			<p className="nightHours ml-4">
				<p>
					Servicio 24H disponible, pincha
					<i className="text-primary" onClick={() => actions.changeNight()}>
						{" "}
						aqui{" "}
					</i>
					para reservar horas de noche
				</p>
			</p>
			<div className="d-flex align-items-center justify-content-between w-100">
				<div className="d-flex">
					<i
						className="fa fa-arrow-left ml-3 mb-1"
						aria-hidden="true"
						onClick={() => actions.changeWeekOrDay("beforeWeek")}
					/>
				</div>
				<div className="d-flex">
					<i
						className="fa fa-arrow-right mr-3 mb-1"
						aria-hidden="true"
						onClick={() => actions.changeWeekOrDay("afterWeek")}
					/>
				</div>
			</div>

			<Scheduler />
			<ConfirModal />
		</div>
	);
};
