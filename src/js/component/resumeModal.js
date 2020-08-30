import React, { useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { format, subHours } from "date-fns";
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
					<h4>{format(subHours(new Date(hours["date"]), 2), "hh:mm aaaa")}</h4>
				</li>
			);
		}
	});
	const reservedSpace = store.reservedByMonth.map((space, i) => {
		if (format(new Date(props.dataPickerdate), "d") == format(new Date(space["date"]), "d")) {
			return (
				<li className="list-group-item border-0 p-0" key={space + i}>
					<h4>{space["space_name"]}</h4>
				</li>
			);
		}
	});

	return (
		<>
			<Modal
				isOpen={props.show}
				toggle={() => {
					props.showModalCallback(false);
				}}>
				{arrayHours.length > 0 ? (
					<ModalBody>
						<table className="table mr-auto table-responsive table-bordered table-striped">
							<thead>
								<tr>
									<th className="text-center align-middle text-secondary" scope="col">
										Salas reservada
									</th>
									<th className="text-center align-middle text-secondary" scope="col">
										Hora de la reserva
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
