import React from "react";

import "../../styles/home.scss";

export const NewDay = n => {
	var holder = [];
	for (let x = 0; x < 25; x++) {
		if (x == 0) {
			holder.push(<div className="title text-center font-weight-bold">{n.day}</div>);
		} else {
			holder.push(<div className="cell" />);
		}
	}

	return <div className="day col  p-0">{holder}</div>;
};
