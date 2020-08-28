import React, { useState, useContext } from "react";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { ListOfUsers } from "../component/listOfUsers";
import { Balance } from "../component/balance";

export const AdminView = () => {
	const [view, setView] = useState(<ListOfUsers />);
	return (
		<>
			<Navbar />
			<ul className="nav nav-tabs mt-2 d-flex justify-content-center" role="tablist">
				<li
					role="tab"
					className={
						view.type.name == "ListOfUsers"
							? "nav-item nav-link active base-green font-weight-bold"
							: "nav-item nav-link base-green font-weight-bold"
					}
					onClick={() => {
						setView(<ListOfUsers />);
					}}>
					Lista de los usuarios
				</li>
				<li
					role="tab"
					className={
						view.type.name == "Balance"
							? "nav-item nav-link active base-green font-weight-bold"
							: "nav-item nav-link base-green font-weight-bold"
					}
					onClick={() => {
						setView(<Balance />);
					}}>
					Balance
				</li>
			</ul>
			{view}
		</>
	);
};
