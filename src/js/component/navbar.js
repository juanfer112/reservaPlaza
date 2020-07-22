import React from "react";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar bg-white justify-content-between">
			<Link to={"/"}>BACK!</Link>
			<img className="logo" src="https://dkitchenincubator.com/wp-content/uploads/2020/01/cocinero-1.png" />

			<h1 className="scheduler-title">B-Chicken</h1>
			<img
				className="perfil"
				src="https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg"
			/>
		</nav>
	);
};
