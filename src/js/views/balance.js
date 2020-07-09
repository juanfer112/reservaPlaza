import React, { useState, useContext, useReducer } from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar";
import { AdminBalance } from "../component/adminBalance";

export const Balance = () => {
	return (
		<>
			<Navbar />
			<AdminBalance />
		</>
	);
};
