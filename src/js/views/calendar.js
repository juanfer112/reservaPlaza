import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";
import { Scheduler } from "../component/scheduler";

export const Calendar = () => {
	return (
		<div className="scheduler">
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
			<div className="btngroup">
				<button type="button" className="btn btn-success mb-5">
					Ver espacios
				</button>

				<div className="dropdown mb-5">
					<button
						type="button"
						className="btn btn-success dropdown-toggle "
						data-toggle="dropdown"
						onClick={() => {
							const dropdown = ["cocina", "sin cocina", "formacion"];
							<ul className="dropdown-menu" id="dropdown">
								{dropdown.map((items, index) => {
									console.log(items);
									return <li key={index}>{items}</li>;
								})}
							</ul>;
						}}>
						Dropdown button
					</button>
				</div>

				<div>
					<textarea className="form-control mb-5" rows="1" id="comment">
						Mes en curso
					</textarea>
				</div>
				<div>
					<textarea className="form-control mb-5" rows="1" id="comment">
						Hs contratadas
					</textarea>
				</div>
				<div>
					<textarea className="form-control mb-5" rows="1" id="comment">
						horas aplicadas
					</textarea>
				</div>
			</div>
			<div className="scheduler">
				<Scheduler />
			</div>
			<div className="btngroup2">
				<button type="button" className="btn btn-success mx-3">
					Finalizar
				</button>
				<button type="button" className="btn btn-success mx-3">
					Reservar otro espacio
				</button>
			</div>
		</div>
	);
};
