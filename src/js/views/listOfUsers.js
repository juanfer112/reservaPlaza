import React, { useState, useContext } from "react";
import { addDays, subDays, startOfDay, format } from "date-fns";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar";

export const ListOfUsers = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<Navbar />
			<div className="container">
				<table className="table table-striped">
					<thead>
						<tr>
							<th scope="col">Nombre</th>
							<th scope="col">H contratadas</th>
							<th scope="col">H restantes</th>
							<th scope="col">Número de teléfono</th>
							<th scope="col">Email</th>
						</tr>
					</thead>
					<tbody>
						{store.enterprises.map((user, index) => {
							return (
								<tr key={user}>
									<th scope="row">
										<u>{user["name"]}</u>
									</th>
									<td>{user["tot_hours"]}</td>
									<td>{user["current_hours"]}</td>
									<td>{user["phone"]}</td>
									<td>{user["email"]}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};
