import React, { useState, useContext, useReducer } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/home.scss";

export const Calendar = () => {
	return (
		<div className="container">
			<div className="row border mt-5">
				<div className="col border text-center">Horarios</div>
				<div className="col border text-center">Lunes</div>
				<div className="col border text-center">Martes</div>
				<div className="col border text-center">Miercoles</div>
				<div className="col border text-center">Jueves</div>
				<div className="col border text-center">Viernes</div>
				<div className="col border text-center">Sabado</div>
				<div className="col border text-center">Domingo</div>
			</div>
			<div className="row border">
				<div className="col border text-center" />
				<div className="col border text-center">
					<div className="row">
						<div className="col border">1</div>
						<div className="col border">2</div>
						<div className="col border">3</div>
					</div>
				</div>
				<div className="col border text-center">
					<div className="row">
						<div className="col border">1</div>
						<div className="col border">2</div>
						<div className="col border">3</div>
					</div>
				</div>
				<div className="col border text-center">
					<div className="row">
						<div className="col border">1</div>
						<div className="col border">2</div>
						<div className="col border">3</div>
					</div>
				</div>
				<div className="col border text-center">
					<div className="row">
						<div className="col border">1</div>
						<div className="col border">2</div>
						<div className="col border">3</div>
					</div>
				</div>
				<div className="col border text-center">
					<div className="row">
						<div className="col border">1</div>
						<div className="col border">2</div>
						<div className="col border">3</div>
					</div>
				</div>
				<div className="col border text-center">
					<div className="row">
						<div className="col border">1</div>
						<div className="col border">2</div>
						<div className="col border">3</div>
					</div>
				</div>
				<div className="col border text-center">
					<div className="row">
						<div className="col border">1</div>
						<div className="col border">2</div>
						<div className="col border">3</div>
					</div>
				</div>
			</div>
			{/* -------- */}
			<div className="row">
				<div className="col border text-center">
					<div className="row">
						<div className="col border">00-01</div>
					</div>
				</div>
				<div className="col border text-center">
					<div className="row">
						<div className="col border" />
						<div className="col border" />
						<div className="col border" />
					</div>
				</div>
				<div className="col border text-center">
					<div className="row">
						<div className="col border" />
						<div className="col border" />
						<div className="col border" />
					</div>
				</div>
				<div className="col border text-center">
					<div className="row">
						<div className="col border" />
						<div className="col border" />
						<div className="col border" />
					</div>
				</div>
				<div className="col border text-center">
					<div className="row">
						<div className="col border" />
						<div className="col border" />
						<div className="col border" />
					</div>
				</div>
				<div className="col border text-center">
					<div className="row">
						<div className="col border" />
						<div className="col border" />
						<div className="col border" />
					</div>
				</div>
				<div className="col border text-center">
					<div className="row">
						<div className="col border" />
						<div className="col border" />
						<div className="col border" />
					</div>
				</div>
				<div className="col border text-center">
					<div className="row">
						<div className="col border" />
						<div className="col border" />
						<div className="col border" />
					</div>
				</div>
			</div>
		</div>
	);
};
