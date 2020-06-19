const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			partners: [
				{
					admin: true,
					user: "j",
					password: "p",
					logo: "http://placehold.it/500x325"
				},
				{
					admin: false,
					user: "m",
					password: "t",
					logo: "http://placehold.it/500x325",
					hours: 0
				}
			],
			validation: false,
			master: false
		},

		actions: {
			checkMaster: (us, pa) => {
				const store = getStore();
				const partners = store.partners;
				partners.map(elements => {
					if (elements.user == us && elements.password == pa && elements.admin == true) {
						setStore({ master: true });
					}
				});
			},
			checkUser: (us, pa) => {
				const store = getStore();
				const partners = store.partners;
				partners.map(elements => {
					if (elements.user == us && elements.password == pa) {
						setStore({ validation: true });
					}
				});
			},
			setUserHolder: (us, pa) => {
				const store = getStore();
				store.partners.map(profile => {
					if (profile.user == us && profile.password == pa) {
						setStore({ userHolder: profile });
					}
				});
			},

			checkMail: mail => {},

			addHours: (hours, name) => {
				const store = getStore();
				const partners = store.partners;
				partners.map(item => {
					if (item.user == name) {
						setStore((item.hours = item.hours + hours));
					}
				});
			}
		}
	};
};

export default getState;
