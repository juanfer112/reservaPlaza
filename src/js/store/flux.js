import { format, startOfWeek, endOfDay, addDays, subHours, addWeeks, subWeeks } from "date-fns";
const getState = ({ getStore, getActions, setStore }) => {
	const url = "https://3000-ebfc5e10-75a2-4403-9edc-4116365f86b5.ws-eu01.gitpod.io";
	return {
		store: {
			user: {},
			week: [],
			schedules: [],
			reserved: [],
			spaces: [],
			night: false
		},

		actions: {
			checkUser: async (email, password) => {
				let response = await fetch(`${url}/login`, {
					method: "POST",
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				});
				let data = await response.json();
				if (typeof data.access_token != "undefined") {
					setStore({ token: data.access_token });
					sessionStorage.setItem("access_token", data.access_token);
				} else {
					return "no se ha generado un token";
				}
			},
			isLogged: async () => {
				const store = getStore();

				if (store.token != "") {
					let response = await fetch(`${url}/protected`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							authorization: "Bearer " + store.token
						}
					});
					let data = await response.json();
				} else {
					JSON.stringify({
						msg: "no hay token"
					});
				}
			},
			logout: () => {
				const store = getStore();
				setStore({ token: null });
				sessionStorage.setItem("access_token", null);
			},

			pullPeoples: async () => {
				let response = await fetch(`${url}/enterprises`);
				let data = await response.json();
				setStore({ user: data[0] });
			},

			pullSpaces: async () => {
				let response = await fetch(`${url}/spaces`);
				let data = await response.json();
				setStore({ spaces: data, selectedSpace: data[0] });
			},

			pullScheduler: async () => {
				let response = await fetch(`${url}/schedules`);
				let data = await response.json();
				setStore({ reserved: data });
			},

			postSchedules: () => {
				const store = getStore();
				if (store.schedules.length > 0) {
					fetch(`${url}/schedules`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(store.schedules)
					});
				}
			},

			cellID: day => {
				var arr = [];
				var firstWeekDay = startOfWeek(endOfDay(day), {
					weekStartsOn: 1
				});
				for (let x = 0; x < 7; x++) {
					arr.push(firstWeekDay);
					firstWeekDay = addDays(firstWeekDay, 1);
				}
				setStore({ week: arr });
			},

			transformDay: day => {
				var dayNumber = day.toString().slice(8, 10);
				if (day.toString().slice(0, 3) == "Mon") {
					return "Lunes " + dayNumber;
				} else if (day.toString().slice(0, 3) == "Tue") {
					return "Martes " + dayNumber;
				} else if (day.toString().slice(0, 3) == "Wed") {
					return "Miercoles " + dayNumber;
				} else if (day.toString().slice(0, 3) == "Thu") {
					return "Jueves " + dayNumber;
				} else if (day.toString().slice(0, 3) == "Fri") {
					return "Viernes " + dayNumber;
				} else if (day.toString().slice(0, 3) == "Sat") {
					return "Sabado " + dayNumber;
				} else if (day.toString().slice(0, 3) == "Sun") {
					return "Domingo " + dayNumber;
				}
			},

			addHours: (hours, name) => {
				const store = getStore();
				const partners = store.partners;
				partners.map(item => {
					if (item.user == name) {
						setStore((item.hours = item.hours + hours));
					}
				});
			},

			addSchedules: date => {
				const store = getStore();
				const check = [];
				store.schedules.map(sched => {
					check.push(sched["date"]);
				});
				if (!check.includes(date)) {
					setStore({
						schedules: [
							...store.schedules,
							{ date: date, enterprise_id: store.user.id, space_id: store.selectedSpace["id"] }
						]
					});
				}
			},

			removeSchedules: cellDate => {
				const store = getStore();
				const check = [];
				store.schedules.map(date => {
					if (date["date"] != cellDate) {
						check.push(date);
					}
				});
				setStore({ schedules: check });
			},

			reservedDate: cellDate => {
				const store = getStore();
				var reserved = [];
				store.reserved.map(date => {
					reserved.push(format(subHours(new Date(date["date"]), 2), "yyyy-MM-dd HH:mm:ss"));
				});
				if (reserved.includes(cellDate) || cellDate < format(new Date(), "yyyy-MM-dd HH:mm:ss")) {
					return " reserved";
				} else {
					return "";
				}
			},

			changeNight: () => {
				const store = getStore();
				store.night ? setStore({ night: false }) : setStore({ night: true });
			},

			changeWeek: beforeAfter => {
				const store = getStore();
				var arr = [];
				store.week.map(day => {
					if (beforeAfter == "after") {
						arr.push(addWeeks(day, 1));
					} else if (beforeAfter == "before") {
						arr.push(subWeeks(day, 1));
					}
				});
				setStore({ week: arr });
			},

			selectedSpace: i => {
				const store = getStore();
				store.spaces.map((space, index) => {
					if (index == i) {
						setStore({ selectedSpace: space });
					}
				});
			}
		}
	};
};

export default getState;
