import url from "../endpoints/url.js";
import {
	format,
	startOfWeek,
	endOfDay,
	addDays,
	subDays,
	subHours,
	addWeeks,
	subWeeks,
	startOfDay,
	getMonth,
	getYear
} from "date-fns";

const getState = ({ getStore, getActions, setStore }) => {
	const urlBase = url;
	return {
		store: {
			user: {},
			week: [],
			reserved: [],
			spaces: [],
			night: false,
			currentDay: startOfDay(new Date()),
			selectedCellHolder: [],
			confirModal: false,
			schedules: [],
			enterprises: [],
			reservedByMonth: [],
			token: sessionStorage.access_token != "null" ? sessionStorage.access_token : null
		},

		actions: {
			newFetch: async (endpoint, data = {}) => {
				data.headers = {
					...{
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"

						/* token */
					},
					...data.headers
				};
				let response = await fetch(urlBase + endpoint, data);
				let response_json = await response.json();
				if (!response.ok) {
					let msg = response_json.msg ? response_json.msg : response_json.message;
					alert(msg);
					return null;
				} else return response_json;
			},

			checkUser: async (email, password) => {
				let data = await getActions().newFetch("login", {
					method: "POST",
					body: JSON.stringify({
						email: email,
						password: password
					})
				});
				if (data != null) {
					if (typeof data.access_token != "undefined") {
						setStore({ token: data.access_token, user: data.user });
						sessionStorage.setItem("access_token", data.access_token);
						sessionStorage.setItem("access_user", data.user["is_admin"]);
					}
				}
			},

			isLogged: async () => {
				const store = getStore();
				if (store.token != "") {
					let data = await getActions().newFetch("protected", {
						method: "GET"
					});
					return data.logged_in_as;
				}
			},

			logout: async () => {
				const store = getStore();
				let data = await getActions().newFetch("logout", {
					method: "DELETE"
				});
				setStore({ token: null });
				sessionStorage.clear();
			},
			pullEnterprises: async () => {
				const store = getStore();
				let data = await getActions().newFetch("enterprises", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + store.token
					}
				});
				setStore({ enterprises: data });
			},

			pullSpaces: async () => {
				let data = await getActions().newFetch("spaces", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + getStore().token
					}
				});
				data = data.sort((space1, space2) => space1.spacetype_id - space2.spacetype_id);
				setStore({ spaces: data, selectedSpace: data[0] });
			},

			pullScheduler: async () => {
				const store = getStore();
				let data = await getActions().newFetch(
					"schedules/" + format(getStore().currentDay, "yyyy-MM-dd HH:mm:ss").toString(),
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							authorization: "Bearer " + getStore().token
						}
					}
				);
				setStore({ reserved: data });
			},

			pullSchedulerByMonth: async date => {
				const store = getStore();
				let data = await getActions().newFetch(
					"schedules_by_month_and_year/" + format(date, "yyyy-MM-dd HH:mm:ss").toString(),
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							authorization: "Bearer " + getStore().token
						}
					}
				);
				setStore({ reservedByMonth: data });
			},

			postSchedules: async () => {
				const store = getStore();
				if (store.schedules.length > 0 && store.schedules.length <= store.user.current_hours) {
					let response_json = await getActions().newFetch("schedules", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							authorization: "Bearer " + store.token
						},
						body: JSON.stringify(store.schedules)
					});
					getActions().pullScheduler();
				}
				setStore({ schedules: [] });
			},

			postEnterprises: async body => {
				let response_json = await getActions().newFetch("enterprises", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + getStore().token
					},
					body: JSON.stringify(body)
				});
				getActions().pullEnterprises();
				return response_json;
			},

			changeSchedulePUT: async () => {
				const store = getStore();
				let response = await getActions().newFetch("schedules/" + store.scheduleToChange["id"], {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + store.token
					},
					body: JSON.stringify(store.scheduleToChange)
				});
				getActions().pullScheduler();
			},

			changeEnterprisePUT: async enterprise => {
				let response = await getActions().newFetch("enterprises/" + enterprise["id"], {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + getStore().token
					},
					body: JSON.stringify(enterprise)
				});
				getActions().pullEnterprises();
			},

			softDelete: async enterprise => {
				enterprise.is_active = false;
				let response = await getActions().newFetch("enterprises/" + enterprise["id"], {
					method: "PUT",
					headers: {},
					body: JSON.stringify(enterprise)
				});
				getActions().pullEnterprises();
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
				var dayNumber = format(day, "d");
				var dayNameIndex = format(day, "i").toString();
				const arrayDayNames = ["Lunes ", "Martes ", "Miercoles ", "Jueves ", "Viernes ", "Sabado ", "Domingo "];
				return arrayDayNames[dayNameIndex - 1] + dayNumber;
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
						],
						selectedCellHolder: [...store.selectedCellHolder, date]
					});
				}
			},

			removeSchedules: cellDate => {
				const store = getStore();
				const check = [];
				const checkHolder = [];
				store.schedules.map(date => {
					if (date["date"] != cellDate) {
						check.push(date);
					}
				});
				store.selectedCellHolder.map(date => {
					if (date != cellDate) {
						checkHolder.push(date);
					}
				});
				setStore({ schedules: check, selectedCellHolder: checkHolder });
			},

			reservedDate: (cellDate, spaceID) => {
				const store = getStore();
				var reserved = [];
				var selfReserved = [];
				var selectedSpaceID = spaceID ? spaceID : store.selectedSpace ? store.selectedSpace["id"] : "wait";
				store.selectedSpace
					? store.reserved.map(date => {
							if (date["space_id"] == selectedSpaceID && date["enterprise_id"] == store.user["id"]) {
								selfReserved.push(format(subHours(new Date(date["date"]), 2), "yyyy-MM-dd HH:mm:ss"));
							} else if (date["space_id"] == selectedSpaceID) {
								reserved.push(format(subHours(new Date(date["date"]), 2), "yyyy-MM-dd HH:mm:ss"));
							}
					  })
					: "wait";
				if (selfReserved.includes(cellDate)) {
					return " self-reserved";
				} else if (reserved.includes(cellDate)) {
					return " reserved";
				} else if (cellDate < format(new Date(), "yyyy-MM-dd HH:mm:ss") && spaceID == undefined) {
					return " reserved";
				} else if (store.selectedCellHolder.includes(cellDate)) {
					return " select-green";
				} else {
					return "";
				}
			},

			reservedDateAdmin: (cellDate, spaceID) => {
				const store = getStore();
				var selectedSpaceID = spaceID ? spaceID : store.selectedSpace ? store.selectedSpace["id"] : "wait";
				store.selectedSpace
					? store.reserved.map(date => {
							if (date["space_id"] == selectedSpaceID) {
								reserved.push(format(subHours(new Date(date["date"]), 2), "yyyy-MM-dd HH:mm:ss"));
							}
					  })
					: "wait";
			},

			changeNight: () => {
				const store = getStore();
				store.night ? setStore({ night: false }) : setStore({ night: true });
			},

			changeWeekOrDay: beforeAfter => {
				const store = getStore();
				var arrWeek = [];
				var day = store.currentDay;
				store.week.map(day => {
					if (beforeAfter == "afterWeek") {
						arrWeek.push(addWeeks(day, 1));
						setStore({ currentDay: addDays(day, 1) });
					} else if (beforeAfter == "beforeWeek") {
						arrWeek.push(subWeeks(day, 1));
						setStore({ currentDay: subDays(day, 1) });
					}
				});
				arrWeek.length > 0 ? setStore({ week: arrWeek }) : "";
			},

			selectedSpace: i => {
				const store = getStore();
				store.spaces.map((space, index) => {
					if (index == i) {
						setStore({ selectedSpace: space, selectedCellHolder: [], schedules: [] });
					}
				});
			},

			selectScheduleToChange: (cellId, id) => {
				const store = getStore();
				var id = id.toString();
				var date = cellId;
				store.reserved.map(obj => {
					if (
						new Date(date).toString() == subHours(new Date(obj["date"]), 2).toString() &&
						obj["space_id"].toString() == id
					) {
						setStore({ scheduleToChange: obj });
					}
				});
			},

			changeSchedule: (scheduleSpaceIDToChange, scheduleDateToChange, scheduleDateHourToChange) => {
				const store = getStore();
				let newScheduleToChange = store.scheduleToChange;
				let space_id = parseInt(scheduleSpaceIDToChange);
				let date = scheduleDateToChange + " " + scheduleDateHourToChange;
				let space_name = "";

				store.spaces.map(currentSpaceName => {
					if (currentSpaceName["id"] == space_id) {
						space_name = currentSpaceName["name"];
					}
				});
				space_id ? (newScheduleToChange.space_id = space_id) : "";
				date ? (newScheduleToChange.date = date) : "";
				space_name ? (newScheduleToChange.space_name = space_name) : "";
				setStore({ scheduleToChange: newScheduleToChange });
			},

			currentMonth: () => {
				const store = getStore();
				const arrayMonthsNames = [
					"Enero",
					"Febrero",
					"Marzo",
					"Abril",
					"Mayo",
					"Junio",
					"Julio",
					"Agosto",
					"Septiembre",
					"Octubre",
					"Noviembre",
					"Diciembre"
				];
				if (getMonth(store.week[0]) == getMonth(store.week[store.week.length - 1])) {
					return arrayMonthsNames[getMonth(store.week[0])] + "  " + getYear(store.week[0]);
				} else {
					return (
						arrayMonthsNames[getMonth(store.week[0])] +
						"  " +
						getYear(store.week[0]) +
						" - " +
						arrayMonthsNames[getMonth(store.week[store.week.length - 1])] +
						"  " +
						getYear(store.week[store.week.length - 1])
					);
				}
			},

			goToCurrentDay: () => {
				const current = startOfDay(new Date());
				var arrWeek = [];
				var firstWeekDay = startOfWeek(endOfDay(startOfDay(new Date())), {
					weekStartsOn: 1
				});
				for (let x = 0; x < 7; x++) {
					arrWeek.push(firstWeekDay);
					firstWeekDay = addDays(firstWeekDay, 1);
				}
				setStore({ week: arrWeek, currentDay: current });
			}
		}
	};
};

export default getState;
