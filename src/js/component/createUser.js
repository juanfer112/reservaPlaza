import React, { useState, useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Button, Modal, ModalBody, ModalFooter, Form } from "reactstrap";
import FormControl from "reactstrap";

export const CreateUser = editEnterprise => {
	const { store, actions } = useContext(Context);

	const [show, setShow] = useState(false);
	const [edit, setEdit] = useState(editEnterprise.edit);
	const newEnterprise = {};

	useEffect(
		() => {
			setEdit(editEnterprise.edit);
		},
		[editEnterprise.edit]
	);
	useEffect(
		() => {
			setShow(editEnterprise.show);
		},
		[edit]
	);
	return (
		<>
			<button
				className="font-weight-bold btn btn-success p-3 mt-4"
				onClick={() => {
					setEdit(false);
					setShow(!show);
				}}>
				Nuevo Usuario
			</button>
			<Modal isOpen={show} toggle={() => setShow(!show)}>
				<ModalBody>
					<form id="nameform">
						{edit == false ? <h2 className="text-center">Alta nuevo usuario</h2> : <h2>Edicion usuario</h2>}
						<div className="form-group">
							<input
								required
								type="text"
								name="name"
								className="form-control"
								placeholder="Nombre de usuario"
								defaultValue={edit != false ? edit.name : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="text"
								name="last_name"
								className="form-control"
								placeholder="Apellido"
								defaultValue={edit != false ? edit.last_name : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="email"
								name="email"
								className="form-control"
								placeholder="Correo Electronico"
								defaultValue={edit != false ? edit.email : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="text"
								name="password"
								className="form-control"
								placeholder="Contraseña"
								defaultValue={edit != false ? edit.password : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="text"
								name="cif"
								className="form-control"
								placeholder="CIF"
								defaultValue={edit != false ? edit.cif : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="tel"
								name="phone"
								className="form-control"
								placeholder="Teléfono"
								defaultValue={edit != false ? edit.phone : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="number"
								name="tot_hours"
								className="form-control"
								placeholder="Horas contratadas"
								defaultValue={edit != false ? edit.tot_hours : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="number"
								name="current_hours"
								className="form-control"
								placeholder="Horas restantes"
								defaultValue={edit != false ? edit.current_hours : ""}
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
					<Button
						color="secondary"
						onClick={() => {
							setShow(false);
						}}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>
			{/* <Modal isOpen={edit} toggle={() => setEdit(!edit)}>
				<h1>CIAO</h1>
			</Modal> */}
		</>
	);
};
