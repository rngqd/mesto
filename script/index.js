import { initialCards } from "./initialCards.js";
import { Card } from "./cards.js";
import { validationConfig } from "./validationConfig.js";
import { FormValidation } from "./formValidation.js";
import Section from "./Section.js";
import Popup from "./popup.js";
import PopupWithImage from './PopupWithImage.js'
const profileName = document.querySelector(".profile__name");
const profilePost = document.querySelector(".profile__post");
const formSubmitCard = document.querySelector(".popup__form_edit_card");
const formSubmitProfile = document.querySelector(".popup__form_edit_profile");
const popUpImagePhoto = document.querySelector(".popup-image__image");
const popUpImageText = document.querySelector(".popup-image__text");
const popUpProfileSelector = ".popup_edit_profile";
const popUpCardSelector = ".popup_edit_card";
const popUpImageNode = document.querySelector(".popup-image");
const popUpProfileCloseButton = document.querySelector(".popup__close_edit_profile");
const popUpCardCloseButton = document.querySelector(".popup__close_edit_card");
const popUpImageCloseButton = document.querySelector(".popup-image__close");
const popUpEditProfileButton = document.querySelector(".profile__edit");
const popUpAddCardButton = document.querySelector(".profile__add");
const popUpCardSaveButton = document.querySelector(".popup__save_edit_card");
const cardsContainer = document.querySelector(".galary");
const newCardName = document.querySelector("#card-name");
const newCardLink = document.querySelector("#card-link");
const profileEditName = document.querySelector("#profile-name");
const profileEditPost = document.querySelector("#profile-post");
const templateCardElement = document.querySelector(".template");

function uploadPopUpProfile() {
	profileEditName.value = profileName.textContent;
	profileEditPost.value = profilePost.textContent;
	openPopUp(popUpProfileNode);
}

function handleSubmitCard(evt) {
	evt.preventDefault();
	addCardByClass(newCardName.value, newCardLink.value, templateCardElement);
	closePopUp(popUpCardNode);
	formSubmitCard.reset();
}
formSubmitCard.addEventListener("submit", handleSubmitCard);

function handleSubmitProfile(evt) {
	evt.preventDefault();
	profileName.textContent = profileEditName.value;
	profilePost.textContent = profileEditPost.value;
	closePopUp(popUpProfileNode);
}

formSubmitProfile.addEventListener("submit", handleSubmitProfile);
popUpEditProfileButton.addEventListener("click", uploadPopUpProfile);

//Функция добавления новой карточки с применением класс
function addCardByClass(newCardName, newCardLink, templateCardElement) {
	const newCard = new Card(newCardName, newCardLink, templateCardElement);
	const newCardElement = newCard.generateCard();
	cardsContainer.prepend(newCardElement);
}
// Создаём класс валидации для каждой формы, в которой она необходима
const formCardValidation = new FormValidation(formSubmitCard, validationConfig);
formCardValidation.enableValidation();
const formProfileValidation = new FormValidation(formSubmitProfile, validationConfig);
formProfileValidation.enableValidation();

//Отрисосываем первоначальные карточки на странице
const initialCardSection = new Section(
	{
		items: initialCards,
		renderer: (item) => {
			const card = new Card(item, templateCardElement);
			const newCardElement = card.generateCard();
			initialCardSection.addItem(newCardElement);
		},
	},
	cardsContainer
);
initialCardSection.renderItem();

//Универсальная функция, задающая функционал открытия и закрытия для попапов
function setOpenAndClosePopupListener (popupSelector){
	const editPopup= new Popup(popupSelector);
	editPopup.setEventListeners();
	editPopup.open();
}

//Вешаем слушатель открытия/закрытия для попапа редактирования профиля
popUpEditProfileButton.addEventListener("click", () => {
	setOpenAndClosePopupListener(popUpProfileSelector)
});
//Вешаем слушатель открытия/закрытия для попапа создания карточки
popUpAddCardButton.addEventListener("click", () => {
	setOpenAndClosePopupListener(popUpCardSelector)
});

//Создаём функцию для добавления логики открытия попапа карточки в классе Card
export function handleCardClick(name, link) {
	const imagePopup = new PopupWithImage('.popup-image')
	imagePopup.setEventListeners();
	imagePopup.openWithImage(name, link);
}



//Закрытие попапа при клике по оверлею. На данном этапе не используем
// function closePopUpByOverlayClick(evt) {
// 	const activePopUP = document.querySelector(".popup_visible");
// 	activePopUP.addEventListener("click", function (evt) {
// 		closePopUp(evt.target);
// 	});
// }