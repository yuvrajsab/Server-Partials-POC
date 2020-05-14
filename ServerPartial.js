class ServerPartial {
	static baseurl;

	constructor(config) {
		ServerPartial.baseurl = config.baseurl.replace(/\/+$/, '');
		this.init();
	}

	init() {
		let partialsToLoad = document.querySelectorAll('[load-partial]');
		partialsToLoad.forEach(async item => {
			let data = await ServerPartial.fetch(
				item.getAttribute('load-partial'),
			);

			item.innerHTML = data;
		});
	}

	static fetch(name) {
		return fetch(`${this.baseurl}/${name}`)
			.then(res => res.text())
			.then(data => data)
			.catch(err => console.log(err));
	}

	static async fetchAndSet(name, selector) {
		const data = await ServerPartial.fetch(name);
		document.querySelector(selector).innerHTML = data;
	}
}

export default ServerPartial;
