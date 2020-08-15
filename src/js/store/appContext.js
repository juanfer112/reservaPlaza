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

		useEffect(
			() => {
				if (state.store.token != null) {
					state.actions.pullEnterprises();
					state.actions.pullScheduler();
					state.actions.cellID(new Date());
					state.actions.pullSpaces();
				}
			},
			[state.store.token]
		);

		useEffect(
			() => {
				if (state.store.token != null) {
					state.actions.pullScheduler();
				}
			},
			[state.store.currentDay]
		);
		useEffect(() => {
			if (state.store.token != null) {
				state.actions.pullSchedulerByMonth(state.store.currentDay);
			}
		}, []);

		useEffect(
			() => {
				if (state.store.schedules.length > state.store.user.current_hours) {
					state.store.confirModal = false;
				} else {
					state.store.confirModal = true;
				}
			},
			[state.store.schedules]
		);

		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
