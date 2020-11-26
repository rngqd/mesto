let popUpNode = document.querySelector('.popup');
let handleEditButton = document.querySelector('.profile__edit');
let handleCloseButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profilePost = document.querySelector('.profile__post');
let profileEditName = document.querySelector('#name');
let profileEditPost = document.querySelector('#post');
let formElement = document.querySelector('.popup__form')
function addPopUp() { 
  profileEditName.value = profileName.textContent;
  profileEditPost.value = profilePost.textContent;
  popUpNode.classList.add('popup_visible')
}
handleEditButton.addEventListener('click', addPopUp);
function closePopUp() {
  popUpNode.classList.remove('popup_visible')
}
handleCloseButton.addEventListener('click', closePopUp);
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditName.value;
  profilePost.textContent = profileEditPost.value;
  popUpNode.classList.remove('popup_visible')
}
formElement.addEventListener('submit', formSubmitHandler); 