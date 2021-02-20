export default class UserInfo {
	constructor( nameSelector, postSelector, avatarSelector ) {
		this._name = document.querySelector(nameSelector);
		this._post = document.querySelector(postSelector);
		this._avatar = document.querySelector(avatarSelector);
	}

	getUserInfo() {
	
		return {
			name: this._name.textContent,
			post: this._post.textContent,
		};
	}

	setUserInfo(data) {
		this._name.textContent = data.name;
		this._post.textContent = data.about;
	}
	initUserInfo(name, post,avatarUrl) {
		this._name.textContent = name;
		this._post.textContent = post;
		this._avatar.src = avatarUrl
		
	}
	setUserId(id) {
		this._userId = id;
	} 

	setUserAvatar(avatarUrl) {
		this._avatar.src = avatarUrl
	}
	returnUserId() {
		return this._userId;
	}
}
