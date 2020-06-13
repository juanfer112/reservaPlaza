import React, { useState, useContext, useReducer } from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";
import { Scheduler } from "../component/scheduler";
import { Navbar } from "../component/navbar";

export const Calendar = () => {
	const [dropdownOpen, setOpen] = useState(false);

	const toggle = () => setOpen(!dropdownOpen);
	return (
		<div className="scheduler pt-3">
			<Navbar />
			<div className="main">
				<div className="btngroup">
					<button type="button" className="btn btn-success  btnDropdown">
						Ver espacios
					</button>

					<ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className="btnDropdown">
						<DropdownToggle caret size="sm" color="success">
							Espacio a utilizar
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem>Cocina</DropdownItem>
							<DropdownItem>Barra</DropdownItem>
							<DropdownItem>Formación</DropdownItem>
						</DropdownMenu>
					</ButtonDropdown>

					<div>
						<textarea className="form-control " rows="1">
							Mes en curso
						</textarea>
					</div>
					<div>
						<textarea className="form-control " rows="1">
							Hs contratadas
						</textarea>
					</div>
					<div>
						<textarea className="form-control " rows="1" id="comment">
							horas aplicadas
						</textarea>
					</div>
				</div>

				<Scheduler />
			</div>
			<div className="btngroup2 mb-5">
				<button type="button" className="btn btn-success mx-3">
					Finalizar
				</button>
				<button type="button" className="btn btn-success mx-3">
					Reservar otro espacio
				</button>
			</div>
		</div>
	);
};
