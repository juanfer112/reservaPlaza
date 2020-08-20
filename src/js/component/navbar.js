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
			text: "My Profile"
		},
		{
			text: "email"
		},
		{
			text: "Log Out"
		}
	];

	return (
		<nav className="navbar">
			<Link className="mx-auto" to={"/login"}>
				<h1 className="scheduler-title">B-Chicken</h1>
			</Link>

			<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle caret="md" color="d-none">
					<img className="perfil" src={setting} />
				</DropdownToggle>
				<DropdownMenu className="text-center font-weight-bold">
					{settings.map((item, index) => {
						return (
							<DropdownItem
								onClick={e => {
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
