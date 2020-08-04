import { format, startOfWeek, endOfDay, addDays, subHours, addWeeks, subWeeks } from "date-fns";
const getState = ({ getStore, getActions, setStore }) => {
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
			pullPeoples: async (
				url = "https://3000-ebfc5e10-75a2-4403-9edc-4116365f86b5.ws-eu01.gitpod.io/enterprises"
			) => {
				const store = getStore();

				let response = await fetch(url);
				let data = await response.json();

				setStore({ user: data[0] });
			},

			pullSpaces: async (url = "https://3000-fdf3b7e1-cfb0-4b1a-b906-c0f1e00814a0.ws-eu01.gitpod.io/spaces") => {
				let response = await fetch(url);
				let data = await response.json();
				setStore({ spaces: data, selectedSpace: data[0] });
			},

			pullScheduler: async (
				url = "https://3000-fdf3b7e1-cfb0-4b1a-b906-c0f1e00814a0.ws-eu01.gitpod.io/schedules"
			) => {
				let response = await fetch(url);
				let data = await response.json();
				setStore({ reserved: data });
			},

			postSchedules: () => {
				const store = getStore();
				if (store.schedules.length > 0) {
					fetch("https://3000-fdf3b7e1-cfb0-4b1a-b906-c0f1e00814a0.ws-eu01.gitpod.io/schedules", {
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

			addToSchedules: date => {
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

			reservedDate: id => {
				const store = getStore();
				var reser = [];
				store.reserved.map(date => {
					reser.push(format(subHours(new Date(date["date"]), 2), "yyyy-MM-dd HH:mm:ss"));
				});
				if (reser.includes(id)) {
					return " bg-danger";
				} else {
					return " ";
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
