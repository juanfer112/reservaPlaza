import React, { useState, useContext } from "react";
import "../../styles/home.scss";
import { Link, Redirect } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { ProfileUsers } from "../component/profileUsers";
import { Calendar } from "../component/calendar";

export const UserView = () => {
	const [view, setView] = useState(<Calendar />);
	if (sessionStorage["access_token"] != "null" && sessionStorage["access_user"] == "true") {
		return <Redirect to="/adminView" />;
	} else if (sessionStorage["access_token"] == "null" || sessionStorage["access_token"] == undefined) {
		return <Redirect to="/" />;
	} else if (sessionStorage["access_token"] != "null" && sessionStorage["access_user"] == "false") {
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
