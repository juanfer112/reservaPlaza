import React, { useState, useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import cocina from "../../../assets/cocina.jpeg";
import barra from "../../../assets/barra.jpeg";
import formacion from "../../../assets/formacion.jpeg";

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
				<ModalHeader toggle={() => setShow(!show)}>
					<h2 className="text-center title-font base-green">Informacion de salas</h2>
				</ModalHeader>
				<ModalBody className="py-0">
					{store.spaces.map((space, index) => {
						let src = "";
						if (space.spacetype_id == 2) {
							src = cocina;
						} else if (space.spacetype_id == 1) {
							src = barra;
						} else if (space.spacetype_id == 3) {
							src = formacion;
						}
						if (index % 2 == 0) {
							return (
								<div className="py-2 border-bottom" key={index}>
									<h4 className="mx-5 font-weight-bold">{space.name}</h4>
									<div className="row align-self-center">
										<img className="col-3 img-space pr-0" src={src} />
										<p className="col-9 text-break align-middle">{space.description}</p>
									</div>
								</div>
							);
						} else {
							return (
								<div className="py-2 border-bottom bg-odd" key={index}>
									<h4 className="mx-5 text-right font-weight-bold">{space.name}</h4>
									<div className="row d-flex align-self-center text-right">
										<p className="col-9 text-break align-middle">{space.description}</p>
										<img className="col-3 img-space pl-0" src={src} />
									</div>
								</div>
							);
						}
					})}
				</ModalBody>
				<ModalFooter className="m-auto border-0">
					<Button className="btn-close" onClick={() => setShow(!show)}>
						Cerrar
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};
