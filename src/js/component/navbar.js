import React from "react";
import "../../styles/home.scss";

export const Navbar = () => {
	return (
		<>
			<header>
				<div className="logo">
					<img src="https://dkitchenincubator.com/wp-content/uploads/2020/01/cocinero-1.png" alt="logo" />
				</div>
				<div>
					<h1>SISTEMA DE RESERVA</h1>
				</div>
				<div className="photProfile">
					<img
						src="https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg"
						alt="profile"
					/>
				</div>
			</header>
			<hr />
		</>
	);
};
