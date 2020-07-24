import React, { useState, useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const ConfirModal = () => {
	const { store, actions } = useContext(Context);
	const [show, setShow] = useState(false);
	function toggle() {
		setShow(!show);
	}

	return (
		<>
			<button className="confirm fixed-bottom btn btn-success pb-5" onClick={() => setShow(!show)}>
				Finalizar
			</button>
			<Modal backdrop="false" isOpen={show} toggle={() => setShow(!show)}>
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
				<ModalFooter className="m-auto">
					<Button
						color="primary"
						onClick={() => {
							actions.postSchedules();
							setShow(!show);
						}}>
						Confirmar
					</Button>
					<Button color="secondary" onClick={() => setShow(!show)}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};
