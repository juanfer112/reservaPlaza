import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import house from "../../../assets/home.png";
import { Link } from "react-router-dom";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [dropdownOpen, setOpen] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);

	return (
		<nav className="navbar row">
			<h1 className="scheduler-title title-font base-green col-lg-4 offset-lg-4 col-8 text-center">B-Chicken</h1>
			<ButtonDropdown className="col-lg-1 offset-lg-3 col-2" isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle className="home-dropDown" caret="md" color="d-none">
					<img className="perfil" src={house} />
				</DropdownToggle>
				<DropdownMenu className="text-center font-weight-bold">
					<Link to={"/profile"}>
						<DropdownItem>
							<p className="text-dark d-flex justify-content-around align-items-center m-0">
								Perfil
								<i className="fas fa-user" />
							</p>
						</DropdownItem>
					</Link>
					<Link to={"/"}>
						<DropdownItem
							onClick={() => {
								actions.logout();
							}}>
							<p className="text-danger d-flex justify-content-around align-items-center m-0">
								Salir
								<i className="fas fa-sign-out-alt" />
							</p>
						</DropdownItem>
					</Link>
				</DropdownMenu>
			</ButtonDropdown>
		</nav>
	);
};
