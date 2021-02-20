export default class Api {
	constructor(config) {
		this._url = config.url;
		this.headers = config.headers;
	}

	getInitialCards() {
		return fetch(`${this._url}cards`, {
			headers: this.headers,
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка : ${res.status}`);
		});
	}

	addCard({name, link}) {
		return fetch(`${this._url}cards`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify({
				name: name,
				link: link,
			}),
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка : ${res.status}`);
		});
	}

	getUserInfo() {
		return fetch(`${this._url}users/me`, {
			headers: this.headers,
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка : ${res.status}`);
		});
	}

	setUserInfo(newName, newPost) {
		return fetch(`${this._url}users/me`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				name: newName,
				about: newPost,
			}),
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка : ${res.status}`);
		});
	}
	deleteCard(data) {
		return fetch(`${this._url}cards/${data}`, {
			method: 'DELETE',
			headers: this.headers,
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка : ${res.status}`);
		});
	}
	
	addLike(cardId) {
		return fetch(`${this._url}cards/likes/${cardId}`, {
			method: 'PUT',
			headers: this.headers,
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка : ${res.status}`);
		});
	}

	removeLike(cardId) {
		return fetch(`${this._url}cards/likes/${cardId}`, {
			method: 'DELETE',
			headers: this.headers,
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка : ${res.status}`);
		});
	}

	updateAvatar(imageUrl) {
		return fetch(`${this._url}users/me/avatar`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({avatar: imageUrl.avatar})
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка : ${res.status}`);
		});
	}

}
