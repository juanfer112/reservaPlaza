import React, { useState, useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { format } from "date-fns";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

export const ConfirModal = () => {
	const { store, actions } = useContext(Context);
	const [show, setShow] = useState(false);

	return (
		<>
			<button className="fixed-bottom btn btn-success pb-5 confirm" onClick={() => setShow(!show)}>
				Reservar
			</button>
			{store.schedules.length <= store.user.current_hours ? (
				<Modal isOpen={show} toggle={() => setShow(!show)}>
					<ModalBody>
						{store.schedules.length > 0 ? (
							<h2 className="text-center">
								Quieres confirmar las siguientes reservas en {store.selectedSpace.name}?
							</h2>
						) : (
							<h2 className="text-center">No tienes horas seleccionadas</h2>
						)}
						<ul className="text-center list-group">
							{store.schedules.map((date, index) => {
								return (
									<li className="list-group-item border-0 p-0" key={index}>
										<h4>{format(new Date(date.date), "dd-MM-yyyy HH:mm")}</h4>
									</li>
								);
							})}
						</ul>
					</ModalBody>
					<ModalFooter className="m-auto">
						{store.schedules.length <= store.user.current_hours && store.schedules.length > 0 ? (
							<button
								className="btn btn-confirm text-white"
								onClick={() => {
									actions.postSchedules();
									setShow(!show);
								}}>
								Confirmar
							</button>
						) : (
							""
						)}
						<button className="btn btn-close text-white" onClick={() => setShow(!show)}>
							Cancelar
						</button>
					</ModalFooter>
				</Modal>
			) : (
				<Modal isOpen={show} toggle={() => setShow(!show)}>
					<ModalBody>
						<h1>No tienes suficientes horas disponibles!</h1>
						<h2>Llamar al (+34)644940629</h2>
					</ModalBody>
					<ModalFooter className="m-auto">
						<button className="btn btn-close text-white" onClick={() => setShow(!show)}>
							Cancelar
						</button>
					</ModalFooter>
				</Modal>
			)}
		</>
	);
};
