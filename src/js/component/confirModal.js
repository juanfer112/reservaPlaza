import React, { useState, useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

export const ConfirModal = () => {
	const { store, actions } = useContext(Context);
	const [show, setShow] = useState(false);

	return (
		<>
			<button className="fixed-bottom btn btn-success pb-5 confirm" onClick={() => setShow(!show)}>
				Reservar
			</button>
			<Modal backdrop="false" isOpen={show} toggle={() => setShow(!show)}>
				{store.confirModal ? (
					<ModalBody>
						<h2 className="text-center">Quieres confirmar las siguientes reservas?</h2>
						<ul className="text-center list-group">
							{store.schedules.map((date, index) => {
								return (
									<li className="list-group-item border-0 p-0" key={index}>
										<h4>{date.date}</h4>
									</li>
								);
							})}
						</ul>
					</ModalBody>
				) : (
					<ModalBody>
						<h1>No tienes suficientes horas disponibles! (PHONE NUMBER)</h1>
					</ModalBody>
				)}
				<ModalFooter className="m-auto">
					<button
						className="btn btn-confirm text-white"
						onClick={() => {
							actions.postSchedules();
							setShow(!show);
						}}>
						Confirmar
					</button>
					<button className="btn btn-close text-white" onClick={() => setShow(!show)}>
						Cancelar
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
};
