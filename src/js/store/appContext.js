import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			if (sessionStorage["access_token"] != "null" && sessionStorage["access_token"] != undefined) {
				state.actions.isLogged(sessionStorage["access_token"]);
			}
		}, []);

		useEffect(
			() => {
				if (sessionStorage["access_token"] != "null" && sessionStorage["access_token"] != undefined) {
					state.actions.pullScheduler();
					state.actions.cellID(new Date());
					state.actions.pullSpaces();
				}
			},
			[sessionStorage["access_token"]]
		);

		useEffect(
			() => {
				if (state.store.user["is_admin"] == true) {
					state.actions.pullEnterprises();
				}
			},
			[state.store.user, sessionStorage["access_token"]]
		);

		useEffect(
			() => {
				if (sessionStorage["access_token"] != "null" && sessionStorage["access_token"] != undefined) {
					state.actions.pullScheduler();
				}
			},
			[state.store.currentDay]
		);
		useEffect(() => {
			if (sessionStorage["access_token"] != "null" && sessionStorage["access_token"] != undefined) {
				state.actions.pullSchedulerByMonth(state.store.currentDay);
			}
		}, []);

		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
