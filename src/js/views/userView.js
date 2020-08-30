import React, { useState, useContext } from "react";
import "../../styles/home.scss";
import { Link, Redirect } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { ProfileUsers } from "../component/profileUsers";
import { Calendar } from "../component/calendar";
import { Context } from "../store/appContext";

export const UserView = () => {
	const [view, setView] = useState(<Calendar />);
	const { store, actions } = useContext(Context);

	let is_admin = store.user["is_admin"] == true ? true : false;

	if (sessionStorage["access_token"] != "null" && is_admin == true) {
		return <Redirect to="/adminView" />;
	} else if (
		sessionStorage["access_token"] == "null" ||
		sessionStorage["access_token"] == undefined ||
		is_admin == undefined
	) {
		return <Redirect to="/" />;
	} else if (sessionStorage["access_token"] != "null" && is_admin == false) {
		return (
			<>
				<Navbar />
				<ul className="nav nav-tabs mt-2 d-flex justify-content-center" role="tablist">
					<li
						role="tab"
						className={
							view.type.name == "Calendar"
								? "nav-item nav-link active base-green font-weight-bold"
								: "nav-item nav-link base-green font-weight-bold"
						}
						onClick={() => {
							setView(<Calendar />);
						}}>
						Sistema reserva
					</li>
					<li
						role="tab"
						className={
							view.type.name == "ProfileUsers"
								? "nav-item nav-link active base-green font-weight-bold"
								: "nav-item nav-link base-green font-weight-bold"
						}
						onClick={() => {
							setView(<ProfileUsers />);
						}}>
						Perfil usuario
					</li>
				</ul>
				{view}
			</>
		);
	}
};
