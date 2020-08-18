import React, { useState, useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import cucina from "../../../assets/cucina.jpg";
import barra from "../../../assets/barra.jpg";
export const SpacesModal = () => {
	const { store, actions } = useContext(Context);
	const [show, setShow] = useState(false);

	return (
		<>
			<i
				className="fa fa-info-circle pt-1 pr-2"
				onClick={event => {
					setShow(!show), event.stopPropagation();
				}}
			/>
			<Modal className="modal-lg" backdrop="false" isOpen={show} toggle={() => setShow(!show)}>
				<ModalBody>
					<h2 className="text-center">Informacion de salas</h2>
					{store.spaces.map((space, index) => {
						let src = space.spacetype_id == 1 ? barra : cucina;
						if (index % 2 == 0) {
							return (
								<div className="row d-flex py-4 border-top" key={index}>
									<img className="col-3 img-space" src={src} />
									<div className="col-9 align-self-center ">
										<h4>{space.name}</h4>
										<p className="text-break">{space.description}</p>
									</div>
								</div>
							);
						} else {
							return (
								<div className="row d-flex py-4 border-top" key={index}>
									<div className="col-9 align-self-center text-right">
										<h4>{space.name}</h4>
										<p className="text-break">{space.description}</p>
									</div>
									<img className="col-3 img-space" src={src} />
								</div>
							);
						}
					})}
				</ModalBody>
				<ModalFooter className="m-auto">
					<Button color="secondary" onClick={() => setShow(!show)}>
						Cerrar
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};
