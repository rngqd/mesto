export default class UserInfo {
	constructor(nameSelector, postSelector, newNameSelector, newPostSelector) {
		this._name = document.querySelector(nameSelector);
		this._post = document.querySelector(postSelector);
		this._newName = document.querySelector(newNameSelector);
		this._newPost = document.querySelector(newPostSelector);
	}

	getUserInfo() {
		console.log(this._newPost.value)
		this._newName.value = this._name.textContent;
		this._newPost.value = this._post.textContent;
	}

	setUserInfo() {
		this._name.textContent = this._newName.value;
		this._post.textContent = this._newPost.value;
	}
}
