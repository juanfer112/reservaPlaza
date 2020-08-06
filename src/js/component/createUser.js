import React, { useState, useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Button, Modal, ModalBody, ModalFooter, Form } from "reactstrap";
import FormControl from "reactstrap";
export const CreateUser = () => {
	const { store, actions } = useContext(Context);
	const [show, setShow] = useState(false);

	const newEnterprise = {};
	return (
		<>
			<button className="font-weight-bold btn btn-success p-3 mt-4" onClick={() => setShow(!show)}>
				Nuevo Usuario
			</button>
			<Modal backdrop="false" isOpen={show} toggle={() => setShow(!show)}>
				<ModalBody>
					<form id="nameform">
						<h2 className="text-center">Alta nuevo usuario</h2>
						<div className="form-group">
							<input
								required
								type="text"
								name="name"
								className="form-control"
								placeholder="Nombre de usuario"
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="text"
								name="last_name"
								className="form-control"
								placeholder="Apellido"
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="email"
								name="email"
								className="form-control"
								placeholder="Correo Electronico"
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="text"
								name="password"
								className="form-control"
								placeholder="Contraseña"
							/>
						</div>
						<div className="form-group">
							<input required type="text" name="cif" className="form-control" placeholder="CIF" />
						</div>
						<div className="form-group">
							<input required type="tel" name="phone" className="form-control" placeholder="Teléfono" />
						</div>
						<div className="form-group">
							<input
								required
								type="number"
								name="tot_hours"
								className="form-control"
								placeholder="Horas contratadas"
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="number"
								name="current_hours"
								className="form-control"
								placeholder="Horas restantes"
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
							for (var keyValue of form.entries()) {
								if (keyValue[0] == "current_hours" || keyValue[0] == "tot_hours") {
									newEnterprise[keyValue[0].toString()] = parseInt(keyValue[1]);
								} else {
									newEnterprise[keyValue[0].toString()] = keyValue[1].toString();
								}
							}

							actions.postEnterprises(newEnterprise);

							return false;
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
