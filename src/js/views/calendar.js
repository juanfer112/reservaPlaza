import React, { useState, useContext, useReducer } from "react";
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
				<button className="btn btn-block btn-success btnDropdown">Ver espacios</button>

				<ButtonDropdown className="btnDropdown" isOpen={dropdownOpen} toggle={toggle}>
					<DropdownToggle className="btnDropdown" caret="lg" color="success">
						Espacio a utilizar
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
				<input className="btnDropdown" placeholder="Mes en curso" />
				<input className="btnDropdown" placeholder="Horas contratadas" />
				<input className="btnDropdown" placeholder="Horas aplicadas" />
			</div>
			<div className="d-flex justify-content-around w-100">
				<i
					className="fa fa-arrow-circle-left mb-2"
					aria-hidden="true"
					onClick={() => actions.changeWeek("before")}
				/>
				<a onClick={() => actions.changeNight()}>BLA BLA BLA 24H</a>
				<i
					className="fa fa-arrow-circle-right mb-2"
					aria-hidden="true"
					onClick={() => actions.changeWeek("after")}
				/>
			</div>

			<Scheduler />
			<div className="row justify-content-center fixed-bottom">
				<button className="btn btn-success confirm p-0 mb-5" onClick={() => actions.postSchedules()}>
					Finalizar
				</button>
			</div>
		</div>
	);
};
