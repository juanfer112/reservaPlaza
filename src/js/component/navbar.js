import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
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
		<nav className="navbar bg-white">
			<div className="d-flex align-items-center">
				<Link to={"/login"}>
					<img
						className="logo"
						src="https://dkitchenincubator.com/wp-content/uploads/2020/01/cocinero-1.png"
					/>
				</Link>
				<h1 className="scheduler-title">B-Chicken</h1>
			</div>

			<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle caret="md" color="d-none">
					<img
						className="perfil"
						src="https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg"
					/>
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
