import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import house from "../../../assets/home.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [dropdownOpen, setOpen] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);

	return (
		<nav className="navbar row">
			<h1 className="scheduler-title title-font base-green col-lg-4 offset-lg-4 col-8 text-center">B-Chicken</h1>
			<Link to={"/"}>
				<i
					className="fas fa-sign-out-alt base-green mr-3"
					onClick={() => {
						actions.logout();
					}}
				/>
			</Link>
		</nav>
	);
};
