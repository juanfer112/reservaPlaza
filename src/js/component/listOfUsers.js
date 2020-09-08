import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { CreateOrEditUser } from "../component/createOrEditUser";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

export const ListOfUsers = () => {
	const { store, actions } = useContext(Context);
	const [show, setShow] = useState(false);
	const [enterprise, setEdit] = useState(null);
	const [deleteUser, setDeleteUser] = useState(false);
	const userList = [];
	store.enterprises.map((user, index) => {
		if (user.is_active == true) {
			userList.push(user);
		}
	});
	const toggleModalCallback = hideOrShow => {
		setShow(hideOrShow);
	};
	const cleanEnterprise = () => {
		setEdit({});
	};
	return (
		<>
			<div className="container-userList mx-xl-5 mt-5">
				<CreateOrEditUser
					show={show}
					enterprise={enterprise}
					cleanEnterprise={cleanEnterprise}
					toggleModalCallback={toggleModalCallback}
				/>
				<table className="table table-responsive table-bordered table-striped">
					<thead>
						<tr>
							<th className="px-2 align-middle" scope="col">
								<p className="align-middle mb-0">Nombre</p>
							</th>
							<th className="px-2 align-middle" scope="col">
								<p className="align-middle mb-0">Horas contratadas</p>
							</th>
							<th className="px-2 align-middle" scope="col">
								<p className="align-middle mb-0">Horas restantes</p>
							</th>
							<th className="px-2 align-middle" scope="col">
								<p className="align-middle mb-0">Número de teléfono</p>
							</th>
							<th className="px-2 align-middle" scope="col">
								<p className="align-middle mb-0">Email</p>
							</th>
						</tr>
					</thead>
					<tbody>
						{userList.map((user, index) => {
							if (user.is_active == true)
								return (
									<tr key={user + index}>
										<th
											scope="row"
											className={index % 2 != 0 ? "d-flex mb-0" : "d-flex mb-0 thOdd"}>
											<p className="p-0 m-0 userName">{user["name"] + " " + user["last_name"]}</p>
											<div className="ml-auto">
												<i
													className="fas fa-pencil-alt p-0"
													onClick={() => {
														setEdit(user);
														setShow(true);
													}}
												/>
												<i
													className="fas fa-trash-alt p-0 ml-3"
													onClick={() => {
														setEdit(user);
														setDeleteUser(true);
													}}
												/>
											</div>
										</th>
										<td>{user["tot_hours"]}</td>
										<td>{user["current_hours"]}</td>
										<td className="text-nowrap">{user["phone"]}</td>
										<td className="text-nowrap">{user["email"]}</td>
									</tr>
								);
						})}
					</tbody>
				</table>
				<Modal isOpen={deleteUser} toggle={() => setDeleteUser(!deleteUser)}>
					<ModalBody className="text-center">
						<h1>
							Eliminar definitivamente el usuario{" "}
							{enterprise ? enterprise.name + " " + enterprise.last_name : ""} ?
						</h1>
					</ModalBody>
					<ModalFooter className="m-auto">
						<button
							className="btn btn-confirm text-white"
							onClick={() => {
								actions.softDelete(enterprise.id);
								setDeleteUser(false);
							}}>
							Confirmar
						</button>
						<button
							className="btn btn-close text-white"
							onClick={() => {
								setDeleteUser(false);
							}}>
							Cancelar
						</button>
					</ModalFooter>
				</Modal>
			</div>
		</>
	);
};
