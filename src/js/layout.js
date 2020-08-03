import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { ProfileUsers } from "./views/profileUsers";
import { Login } from "./views/login";
import { Calendar } from "./views/calendar";
import { Balance } from "./views/balance";
import { ListOfUsers } from "./views/listOfUsers";
import injectContext from "./store/appContext";
import { Link } from "react-router-dom";

//create your first component
export const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Switch>
						<Route exact path="/">
							<>
								<Link to={"/login"}>LOGIN!</Link>
								<Link to={"/reserva"}>RESERVA!</Link>
								<Link to={"/balance"}>BALANCE!</Link>
								<Link to={"/listOfUsers"}>USER LIST!</Link>
							</>
						</Route>
						<Route path="/profile/:theid" component={ProfileUsers} />
						<Route path="/login" component={Login} />
						<Route path="/reserva" component={Calendar} />
						<Route path="/balance" component={Balance} />
						<Route path="/listOfUsers" component={ListOfUsers} />
						<Route render={() => <h1>Not found!</h1>} />
					</Switch>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
