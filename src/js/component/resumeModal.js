import React, { useState, useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { format, startOfMonth, getDaysInMonth, getMonth, getYear } from "date-fns";
import { Modal, ModalBody, ModalFooter, Form } from "reactstrap";

export const ResumeModal = props => {
	const { store, actions } = useContext(Context);
	var arrayHours = [];
	var arraySpace = [];

	const reservedHours = store.reservedByMonth.map((hours, i) => {
		if (format(new Date(props.dataPickerdate), "d") == format(new Date(hours["date"]), "d")) {
			arrayHours.push(hours["date"]);
			return (
				<li className="list-group-item border-0 p-0" key={hours + i}>
					<h4>{format(new Date(hours["date"]), "hh:mm aaaa")}</h4>
				</li>
			);
		}
	});
	const reservedSpace = store.reservedByMonth.map((space, i) => {
		if (format(new Date(props.dataPickerdate), "d") == format(new Date(space["date"]), "d")) {
			console.log("hours:", space);
			arraySpace.push(space["space_name"]);
			return (
				<li className="list-group-item border-0 p-0" key={space + i}>
					<h4>{arraySpace}</h4>
				</li>
			);
		}
	});

	return (
		<>
			<Modal isOpen={props.show} toggle={() => props.showModalCallback(false)}>
				{arrayHours.length > 0 ? (
					<ModalBody>
						<table className="table mr-auto table-responsive table-bordered table-striped">
							<thead>
								<tr>
									<th className="text-center align-middle text-secondary" scope="col">
										Salas seleccionadas
									</th>
									<th className="text-center align-middle text-secondary" scope="col">
										Horario seleccionado
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{reservedSpace}</td>
									<td>{reservedHours}</td>
								</tr>
							</tbody>
						</table>
					</ModalBody>
				) : (
					<ModalBody>
						<ul className="text-center list-group">No hay horas reservadas</ul>
					</ModalBody>
				)}

				<ModalFooter className="m-auto">
					<button
						className="btn btn-close text-white"
						onClick={() => {
							props.showModalCallback(false);
						}}>
						Cancelar
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
};
