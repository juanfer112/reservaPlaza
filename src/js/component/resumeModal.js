import React, { useState, useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Button, Modal, ModalBody, ModalFooter, Form } from "reactstrap";
import FormControl from "reactstrap";

export const ResumeModal = props => {
	const { store, actions } = useContext(Context);

	const [enterprise, setEnterprise] = useState(props.enterprise);
	const newEnterprise = {};
	const enterpriseToPUT = {};

	return (
		<>
			<Modal isOpen={props.show} toggle={() => props.showModalCallback(false)}>
				<ModalBody>ModalBody</ModalBody>
				<ModalFooter className="m-auto">
					<Button
						color="secondary"
						onClick={() => {
							props.showModalCallback(false);
						}}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};
