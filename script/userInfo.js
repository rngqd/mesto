const profileEditName = document.querySelector("#profile-name");
const profileEditPost = document.querySelector("#profile-post");
export default class UserInfo {
	constructor(nameSelector, postSelector) {
		this._name = document.querySelector(nameSelector);
		this._post = document.querySelector(postSelector);
	}

	getUserInfo() {
		profileEditName.value = this._name.textContent;
		profileEditPost.value = this._post.textContent;
	}

	setUserInfo() {
		this._name.textContent = profileEditName.value;
		this._post.textContent = profileEditPost.value;
	}
}
