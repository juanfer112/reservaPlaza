import React, { useState, useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { format, startOfMonth, getDaysInMonth, getMonth, getYear } from "date-fns";
import { Button, Modal, ModalBody, ModalFooter, Form } from "reactstrap";
import FormControl from "reactstrap";

export const ResumeModal = props => {
	const { store, actions } = useContext(Context);
	var arrayHours = [];
	const reservedHours = store.reserved.map((hours, i) => {
		if (format(new Date(props.dataPickerdate), "d") == format(new Date(hours["date"]), "d")) {
			arrayHours.push(hours["date"]);
			return (
				<li className="list-group-item border-0 p-0" key={hours + i}>
					<h4>{format(new Date(hours["date"]), "hh:mm aaaa")}</h4>
				</li>
			);
		}
	});

	return (
		<>
			<Modal isOpen={props.show} toggle={() => props.showModalCallback(false)}>
				{arrayHours.length > 0 ? (
					<ModalBody>
						<ul className="text-center list-group">{reservedHours}</ul>
					</ModalBody>
				) : (
					<ModalBody>
						<ul className="text-center list-group">No hay horas reservadas</ul>
					</ModalBody>
				)}

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
