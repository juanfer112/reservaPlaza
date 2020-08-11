import React, { useState, useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { format, startOfMonth, getDaysInMonth, getMonth, getYear } from "date-fns";
import { Button, Modal, ModalBody, ModalFooter, Form } from "reactstrap";
import FormControl from "reactstrap";

export const ResumeModal = props => {
	const { store, actions } = useContext(Context);

	const reservedHours = store.reserved.map((hours, i) => {
		if (format(new Date(props.dataPickerdate), "d") == format(new Date(hours["date"]), "d"))
			return <div key={hours + i}>{format(new Date(hours["date"]), "hh:mm aaaa")}</div>;
	});

	return (
		<>
			<Modal isOpen={props.show} toggle={() => props.showModalCallback(false)}>
				<ModalBody>{reservedHours}</ModalBody>
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
