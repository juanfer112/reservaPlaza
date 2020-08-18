import React, { useState, useContext } from "react";
import { addDays, subDays, startOfDay, format } from "date-fns";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar";
import { CreateOrEditUser } from "../component/createOrEditUser";

export const ListOfUsers = () => {
	const { store, actions } = useContext(Context);
	const [show, setShow] = useState(false);
	const [enterprise, setEdit] = useState(null);

	const toggleModalCallback = hideOrShow => {
		setShow(hideOrShow);
	};

	return (
		<>
			<Navbar />
			<div className="container container-userList">
				<CreateOrEditUser show={show} enterprise={enterprise} toggleModalCallback={toggleModalCallback} />
				<table className="table mr-auto table-responsive table-bordered table-striped">
					<thead>
						<tr>
							<th className="text-center align-middle text-secondary" scope="col">
								Nombre
							</th>
							<th className="text-center align-middle text-secondary" scope="col">
								Horas restantes
							</th>
							<th className="text-center align-middle text-secondary" scope="col">
								Horas contratadas
							</th>
							<th className="text-center align-middle text-secondary" scope="col">
								Número de teléfono
							</th>
							<th className="text-center align-middle text-secondary" scope="col">
								Email
							</th>
						</tr>
					</thead>
					<tbody>
						{store.enterprises.map((user, index) => {
							return (
								<tr key={user + index}>
									<th scope="row">
										<u
											onClick={() => {
												setEdit(user);
												setShow(true);
											}}>
											{user["name"]}
										</u>
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
			</div>
		</>
	);
};
