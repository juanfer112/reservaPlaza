import React, { useState, useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Modal, ModalBody, ModalFooter, Form } from "reactstrap";
import FormControl from "reactstrap";
import { array } from "prop-types";

export const CreateOrEditUser = props => {
	const { store, actions } = useContext(Context);
	const [enterprise, setEnterprise] = useState(props.enterprise);
	const [error, setError] = useState([]);
	const newEnterprise = {};

	useEffect(
		() => {
			setEnterprise(props.enterprise);
		},
		[props.enterprise]
	);

	const regexEmail = new RegExp(
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);

	const validateInputs = e => {
		const arrayError = [];
		if (enterprise && enterprise.id) {
			newEnterprise["id"] = enterprise.id;
		}
		Array.prototype.forEach.call(e.target.form.elements, (element, index) => {
			let name = element.name;
			if (name == "name") {
				if (element.value.length > 4 && element.value.length < 80) {
					newEnterprise["name"] = element.value;
				} else {
					arrayError.push("El nombre es invalido");
					element.value = "";

					element.className += " invalid";
					element.placeholder = "El nombre es invalido";
				}
			}
			if (name == "last_name") {
				if (element.value.length > 4 && element.value.length < 80) {
					newEnterprise["last_name"] = element.value;
				} else {
					arrayError.push("El apellido es invalido");
					element.value = "";
					element.className += " invalid";
					element.placeholder = "El apellido es invalido";
				}
			}
			if (name == "email") {
				if (element.value.length < 80 && regexEmail.test(String(element.value).toLowerCase())) {
					newEnterprise["email"] = element.value;
				} else {
					arrayError.push("El correo es invalido");
					element.value = "";
					element.className += " invalid";
					element.placeholder = "El correo es invalido";
				}
			}
			if (name == "password") {
				if (element.value.length > 8 && element.value.length < 80) {
					newEnterprise["password"] = element.value;
				} else {
					arrayError.push("La contrasseña es invalida");
					element.value = "";
					element.className += " invalid";
					element.placeholder = "La contrasseña es invalida";
				}
			}
			if (name == "cif") {
				if (element.value.length == 9) {
					newEnterprise["cif"] = element.value;
				} else {
					arrayError.push("El cif es invalido");
					element.value = "";
					element.className += " invalid";
					element.placeholder = "El cif es invalido";
				}
			}
			if (name == "phone") {
				if (element.value.length >= 9) {
					newEnterprise["phone"] = element.value;
				} else {
					arrayError.push("El numero de telefono es invalido");
					element.value = "";
					element.className += " invalid";
					element.placeholder = "El numero de telefono es invalido";
				}
			}
			if (name == "tot_hours") {
				if (element.value.length > 0 && element.value >= 0 && typeof parseInt(element.value) == "number") {
					newEnterprise["tot_hours"] = element.value;
				} else {
					arrayError.push("Utilizar un numero mayor o igual a 0");
					element.value = "";
					element.className += " invalid";
					element.placeholder = "Utilizar un numero mayor o igual a 0";
				}
			}
			if (name == "current_hours") {
				if (element.value.length > 0 && element.value >= 0 && typeof parseInt(element.value) == "number") {
					newEnterprise["current_hours"] = element.value;
				} else {
					arrayError.push("Utilizar un numero mayor o igual a 0");
					element.value = "";
					element.className += " invalid";
					element.placeholder = "Utilizar un numero mayor o igual a 0";
				}
			}
		});

		setError(arrayError);
		return arrayError.length === 0;
	};

	return (
		<>
			<button
				className="btn-new-user fixed-bottom m-5 ml-auto"
				onClick={() => {
					setEnterprise(null);
					props.toggleModalCallback(true);
				}}>
				<i className="fas fa-plus" />
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
								defaultValue={enterprise ? enterprise.name : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="text"
								name="last_name"
								className="form-control"
								placeholder="Apellido"
								defaultValue={enterprise ? enterprise.last_name : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="email"
								name="email"
								className="form-control"
								placeholder="Correo Electronico"
								defaultValue={enterprise ? enterprise.email : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="text"
								name="password"
								className="form-control"
								placeholder="Contraseña"
								defaultValue={enterprise ? enterprise.password : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="text"
								name="cif"
								className="form-control"
								placeholder="CIF"
								defaultValue={enterprise ? enterprise.cif : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="tel"
								name="phone"
								className="form-control"
								placeholder="Teléfono"
								defaultValue={enterprise ? enterprise.phone : ""}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="number"
								name="tot_hours"
								className="form-control"
								placeholder="Horas contratadas"
								defaultValue={enterprise ? enterprise.tot_hours : "0"}
							/>
						</div>
						<div className="form-group">
							<input
								required
								type="number"
								name="current_hours"
								className="form-control"
								placeholder="Horas restantes"
								defaultValue={enterprise ? enterprise.current_hours : "0"}
							/>
						</div>
					</form>
				</ModalBody>
				<ModalFooter className="m-auto">
					<button
						type="submit"
						form="nameform"
						className="btn btn-confirm text-white"
						onClick={e => {
							e.preventDefault();
							if (validateInputs(e)) {
								if (enterprise && enterprise.id) {
									actions.changeEnterprisePUT(newEnterprise);
								} else {
									actions.postEnterprises(newEnterprise);
								}
								props.toggleModalCallback(false);
							}
						}}>
						Confirmar
					</button>
					<button
						className="btn btn-close text-white"
						onClick={() => {
							setError([]);
							props.toggleModalCallback(false);
						}}>
						Cancelar
					</button>
				</ModalFooter>
			</Modal>
		</>
	);
};
