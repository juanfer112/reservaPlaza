import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import setting from "../../../assets/home.png";
import { Link } from "react-router-dom";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [dropdownOpen, setOpen] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);
	const settings = [
		{
			text: (
				<p className="text-dark d-flex justify-content-around align-items-center">
					Perfil
					<i className="fas fa-user" />
				</p>
			)
		},
		{
			text: (
				<p className="text-danger d-flex justify-content-around align-items-center">
					Salir
					<i className="fas fa-sign-out-alt" />
				</p>
			)
		}
	];

	return (
		<nav className="navbar row w-100">
			<h1 className="scheduler-title title-font base-green col-4 offset-4 text-center">B-Chicken</h1>
			<ButtonDropdown className="col-1 offset-3 p-0" isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle className="home-dropDown text-end" caret="md" color="d-none">
					<img className="perfil" src={setting} />
				</DropdownToggle>
				<DropdownMenu className="text-center font-weight-bold">
					{settings.map((item, index) => {
						return (
							<DropdownItem
								onClick={() => {
									actions.logout();
								}}
								key={index}>
								<Link to={"/login"}>{item["text"]}</Link>
							</DropdownItem>
						);
					})}
				</DropdownMenu>
			</ButtonDropdown>
		</nav>
	);
};
