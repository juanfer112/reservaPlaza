import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { UserView } from "./views/userView";
import { AdminView } from "./views/adminView";
import { Login } from "./views/login";
import injectContext from "./store/appContext";

export const Layout = () => {
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
