export default class Api {
	constructor(config) {
		this._url = config.url;
		this.headers = config.headers;
	}

	getInitialCards() {
		return fetch(`${this._url}cards`, {
			headers: this.headers,
		}).then(this._checkResponse);
	}

	addCard({ name, link }) {
		return fetch(`${this._url}cards`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify({
				name: name,
				link: link,
			}),
		}).then(this._checkResponse);
	}

	getUserInfo() {
		return fetch(`${this._url}users/me`, {
			headers: this.headers,
		}).then(this._checkResponse);
	}

	setUserInfo(newName, newPost) {
		return fetch(`${this._url}users/me`, {
			method: "PATCH",
			headers: this.headers,
			body: JSON.stringify({
				name: newName,
				about: newPost,
			}),
		}).then(this._checkResponse);
	}
	
	deleteCard(data) {
		return fetch(`${this._url}cards/${data}`, {
			method: "DELETE",
			headers: this.headers,
		}).then(this._checkResponse);
	}

	addLike(cardId) {
		return fetch(`${this._url}cards/likes/${cardId}`, {
			method: "PUT",
			headers: this.headers,
		}).then(this._checkResponse);
	}

	removeLike(cardId) {
		return fetch(`${this._url}cards/likes/${cardId}`, {
			method: "DELETE",
			headers: this.headers,
		}).then(this._checkResponse);
	}

	updateAvatar(imageUrl) {
		return fetch(`${this._url}users/me/avatar`, {
			method: "PATCH",
			headers: this.headers,
			body: JSON.stringify({ avatar: imageUrl.avatar }),
		}).then(this._checkResponse);
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка ${res.status}`);
	}
}
