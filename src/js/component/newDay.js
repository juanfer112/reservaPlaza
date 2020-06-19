import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const NewDay = n => {
	const { actions, store } = useContext(Context);
	var holder = [];
	for (let x = 0; x < 25; x++) {
		if (x == 0) {
			holder.push(<div className="title text-center font-weight-bold">{n.day}</div>);
		} else {
			const id = n.day + " " + x;
			actions.reserved(id);
			holder.push(
				<div
					className="cell"
					id={id}
					onClick={e => {
						console.log(e.target.id);
					}}
				/>
			);
		}
	}

	return <div className="day col  p-0">{holder}</div>;
};
