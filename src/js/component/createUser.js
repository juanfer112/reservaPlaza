import React, { useState, useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Button, Modal, ModalBody, ModalFooter, Form } from "reactstrap";
import FormControl from "reactstrap";

export const CreateUser = props => {
	const { store, actions } = useContext(Context);

	const [enterprise, setEnterprise] = useState(props.enterprise);
	const newEnterprise = {};
	const enterpriseToPUT = {};

	useEffect(
		() => {
			setEnterprise(props.enterprise);
		},
		[props.enterprise]
	);

	return (
		<>
			<button
				className="font-weight-bold btn btn-success fixed-bottom p-3 m-4"
				onClick={() => {
					setEnterprise(null);
					props.toggleModalCallback(true);
				}}>
				Nuevo Usuario
			</button>
			<Modal isOpen={props.show} toggle={() => props.toggleModalCallback(false)}>
				<ModalBody>
					<form id="nameform">
						{enterprise == null ? (
							<h2 className="text-center">Alta nuevo usuario</h2>
						) : (
							<h2>Edicion usuario</h2>
						)}
						<div className="form-group">
							<input
								required
								type="text"
								name="name"
								className="form-control"
								placeholder="Nombre de usuario"
								defaultValue={enterprise != null ? enterprise.name : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="text"
								name="last_name"
								className="form-control"
								placeholder="Apellido"
								defaultValue={enterprise != null ? enterprise.last_name : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="email"
								name="email"
								className="form-control"
								placeholder="Correo Electronico"
								defaultValue={enterprise != null ? enterprise.email : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="text"
								name="password"
								className="form-control"
								placeholder="Contraseña"
								defaultValue={enterprise != null ? enterprise.password : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="text"
								name="cif"
								className="form-control"
								placeholder="CIF"
								defaultValue={enterprise != null ? enterprise.cif : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="tel"
								name="phone"
								className="form-control"
								placeholder="Teléfono"
								defaultValue={enterprise != null ? enterprise.phone : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="number"
								name="tot_hours"
								className="form-control"
								placeholder="Horas contratadas"
								defaultValue={enterprise != null ? enterprise.tot_hours : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="number"
								name="current_hours"
								className="form-control"
								placeholder="Horas restantes"
								defaultValue={enterprise != null ? enterprise.current_hours : ""}
							/>
						</div>
					</form>
				</ModalBody>
				<ModalFooter className="m-auto">
					<Button
						type="submit"
						form="nameform"
						color="primary"
						onClick={e => {
							e.preventDefault();
							let form = new FormData(document.getElementById("nameform"));
							if (enterprise == null) {
								for (var keyValue of form.entries()) {
									if (keyValue[0] == "current_hours" || keyValue[0] == "tot_hours") {
										newEnterprise[keyValue[0].toString()] = parseInt(keyValue[1]);
									} else {
										newEnterprise[keyValue[0].toString()] = keyValue[1].toString();
									}
								}
								actions.postEnterprises(newEnterprise);
							} else if (enterprise != null) {
								enterpriseToPUT["id"] = enterprise["id"];
								for (var keyValue of form.entries()) {
									if (keyValue[0] == "current_hours" || keyValue[0] == "tot_hours") {
										enterpriseToPUT[keyValue[0].toString()] = parseInt(keyValue[1]);
									} else {
										enterpriseToPUT[keyValue[0].toString()] = keyValue[1].toString();
									}
								}
								actions.changeEnterprisePUT(enterpriseToPUT);
							}
							return false;
						}}>
						Confirmar
					</Button>
					<Button
						color="secondary"
						onClick={() => {
							props.toggleModalCallback(false);
						}}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};
