import React, { useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { format, subHours } from "date-fns";
import { Modal, ModalBody, ModalFooter, Form } from "reactstrap";

export const ResumeModal = props => {
	const { store, actions } = useContext(Context);
	var arrayHours = [];

	const reservedSpaceAndHours = store.reservedByMonth.map((reserves, i) => {
		if (format(new Date(props.dates), "d") == format(new Date(reserves["date"]), "d")) {
			arrayHours.push(reserves["date"]);
			return (
				<tr key={i}>
					<td className="text-center p-1">{reserves["space_name"]}</td>
					<td className="text-center p-1">{format(subHours(new Date(reserves["date"]), 2), "hh:mm aaaa")}</td>
				</tr>
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
							<tbody>{reservedSpaceAndHours}</tbody>
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
