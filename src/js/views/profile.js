import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Calendar } from "../component/calendar";

import "../../styles/home.scss";

export const Profile = () => {
	const { actions, store } = useContext(Context);
	var [hours, setHours] = useState(0);
	const [program, setProgram] = useState(false);

	return !store.userHolder.admin ? (
		<div>
			{Object.keys(store.userHolder).map((item, index) => {
				if (item !== "logo" && item !== "admin") {
					return (
						<>
							<h1>{item}</h1>
							<p>{store.userHolder[item]}</p>
						</>
					);
				} else if (item === "logo" && item !== "admin") {
					return (
						<>
							<h1>{item}</h1>
							<img src={store.userHolder[item]} />
						</>
					);
				}
			})}
			{store.master ? (
				<>
					<button onClick={() => actions.addHours(20, store.userHolder.user)}>+20</button>
					<button onClick={() => actions.addHours(80, store.userHolder.user)}>+80</button>
					<button onClick={() => actions.addHours(120, store.userHolder.user)}>+120</button>
					<input
						type="number"
						placeholder="Añadir horas"
						onChange={e => setHours((hours = e.target.value))}
					/>
					<button onClick={() => actions.addHours(parseInt(hours), store.userHolder.user)}>Add</button>
				</>
			) : (
				<></>
			)}
		</div>
	) : (
		<div>
			{!program ? (
				<>
					<button onClick={() => setProgram(true)}>Programa Semanale</button>
					<ul>
						{store.partners.map(item => {
							if (!item.admin) {
								return (
									<Link to={"/profile/" + item.user.toLowerCase()}>
										<li onClick={() => actions.setUserHolder(item.user, item.password)}>
											{item.user}
										</li>
									</Link>
								);
							}
						})}
					</ul>
				</>
			) : (
				<div>
					<button onClick={() => setProgram(false)}>Lista Clientes</button>
					<Calendar />
				</div>
			)}
		</div>
	);
};
