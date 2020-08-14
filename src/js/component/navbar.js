import React from "react";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import home from "../../../assets/home.png";
export const Navbar = () => {
	return (
		<nav className="navbar">
			<h1 className="scheduler-title ml-auto">B-Chicken</h1>
			<Link to={"/"} className="ml-auto">
				<img className="perfil" src={home} />
			</Link>
		</nav>
	);
};
