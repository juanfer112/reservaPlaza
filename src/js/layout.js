import React from "react";
import getState from "../js/store/flux.js";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { UserView } from "./views/userView";
import { AdminView } from "./views/adminView";
import { Login } from "./views/login";
import { Calendar } from "./component/calendar";
import injectContext from "./store/appContext";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Context } from "../js/store/appContext";

export const Layout = () => {
	const { actions, store } = useContext(Context);
	const basename = process.env.BASENAME || "";

	return (
		<div className="h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Switch>
						<Route exact path="/" component={Login} />

						<Route path="/reserva" component={UserView} />
						<Route path="/adminView" component={AdminView} />
						<Route render={() => <h1>Not found!</h1>} />
					</Switch>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
