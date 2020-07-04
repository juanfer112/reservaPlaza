import React from "react";
import "../../styles/home.scss";

export const Navbar = () => {
	return (
		<>
			<header>
				<div>
					<img
						className="logo"
						src="https://dkitchenincubator.com/wp-content/uploads/2020/01/cocinero-1.png"
					/>
				</div>
				<div className="my-auto">
					<h1>SISTEMA DE RESERVA</h1>
				</div>
				<div>
					<img
						className="logo-perfil"
						src="https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg"
					/>
				</div>
			</header>
			<hr />
		</>
	);
};
