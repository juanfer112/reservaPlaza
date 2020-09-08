import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { actions } = useContext(Context);
	return (
		<nav className="navbar row">
			<h1 className="scheduler-title title-font base-green col-xl-4 offset-xl-4 col-9 text-center">D-Kitchen</h1>
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
