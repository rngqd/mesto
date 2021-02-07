import { initialCards } from "./initialCards.js";
import { Card } from "./cards.js";
import { validationConfig } from "./validationConfig.js";
import { FormValidation } from "./formValidation.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForms from "./popupWithForms.js";
import UserInfo from './userInfo.js'
const nameSelector = ".profile__name";
const postSelector = ".profile__post";
const formSubmitCard = document.querySelector(".popup__form_edit_card");
const formSubmitProfile = document.querySelector(".popup__form_edit_profile");
// const popUpImagePhoto = document.querySelector(".popup-image__image");
// const popUpImageText = document.querySelector(".popup-image__text");
const popUpProfileSelector = ".popup_edit_profile";
const popUpCardSelector = ".popup_edit_card";
const popUpProfileCloseButton = document.querySelector(".popup__close_edit_profile");
const popUpEditProfileButton = document.querySelector(".profile__edit");
const popUpAddCardButton = document.querySelector(".profile__add");
const cardsContainer = document.querySelector(".galary");
const newCardName = document.querySelector("#card-name");
const newCardLink = document.querySelector("#card-link");
// const profileEditName = document.querySelector("#profile-name");
// const profileEditPost = document.querySelector("#profile-post");
const templateCardElement = document.querySelector(".template");

//Функция добавления новой карточки с применением класс
function addCardByClass(newCardName, newCardLink, templateCardElement) {
	newCard = new Card(newCardName, newCardLink, templateCardElement);
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
			const card = new Card(item, templateCardElement, handleCardClick);
			const newCardElement = card.generateCard();
			initialCardSection.addItem(newCardElement);
		},
	},
	cardsContainer
);
initialCardSection.renderItem();


//Создаём функцию для добавления логики открытия попапа карточки в классе Card
export function handleCardClick(cardName, cardLink) {
	const imagePopup = new PopupWithImage(".popup-image");
	imagePopup.setEventListeners();
	imagePopup.openWithImage(cardName, cardLink);
}

const userInfo = new UserInfo(nameSelector, postSelector)

//Создаём попап профиля, добавляем для него функциональность
const profilePopup = new PopupWithForms(popUpProfileSelector, {
	formSubmitHandler: () => {
		userInfo.setUserInfo();
	},
});

profilePopup.setEventListeners();

popUpEditProfileButton.addEventListener("click", () => {
	userInfo.getUserInfo();
	profilePopup.open();
});

popUpProfileCloseButton.addEventListener("click", () => {
	profilePopup.close();
});

//Создаём попап карточки, добавляем для него функциональность
const cardPopup = new PopupWithForms(popUpCardSelector, {
	formSubmitHandler: () => {
		const newCard = new Card(
			{ name: newCardName.value, link: newCardLink.value },
			templateCardElement,
			handleCardClick
		);
		const newCardElement = newCard.generateCard();
		cardsContainer.prepend(newCardElement);
	},
});

cardPopup.setEventListeners();

popUpAddCardButton.addEventListener("click", () => {
	cardPopup.open();
});

//Закрытие попапа при клике по оверлею. На данном этапе не используем
// function closePopUpByOverlayClick(evt) {
// 	const activePopUP = document.querySelector(".popup_visible");
// 	activePopUP.addEventListener("click", function (evt) {
// 		closePopUp(evt.target);
// 	});
// }