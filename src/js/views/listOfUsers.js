import React, { useState, useContext } from "react";
import { addDays, subDays, startOfDay, format } from "date-fns";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar";
import { CreateOrEditUser } from "../component/createOrEditUser";
import { Link } from "react-router-dom";

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
			<Link to={"/balance"}>BALANCE!</Link>
			<div className="container-userList mx-5">
				<CreateOrEditUser show={show} enterprise={enterprise} toggleModalCallback={toggleModalCallback} />
				<table className="table table-responsive table-bordered table-striped">
					<thead>
						<tr className="w-100">
							<th className="px-5 text-center align-middle" scope="col">
								Nombre
							</th>
							<th className="px-5 text-center align-middle" scope="col">
								Horas restantes
							</th>
							<th className="px-5 text-center align-middle" scope="col">
								Horas contratadas
							</th>
							<th className="px-5 text-center align-middle" scope="col">
								Número de teléfono
							</th>
							<th className="px-5 text-center align-middle" scope="col">
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
