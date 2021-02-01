import { initialCards } from "./initialCards.js";
import { Card } from "./cards.js";
import { validationConfig } from "./validationConfig.js";
import { FormValidation } from "./formValidation.js";
import Section from "./Section.js";
import Popup from "./popup.js";
const profileName = document.querySelector(".profile__name");
const profilePost = document.querySelector(".profile__post");
const formSubmitCard = document.querySelector(".popup__form_edit_card");
const formSubmitProfile = document.querySelector(".popup__form_edit_profile");
const popUpImagePhoto = document.querySelector(".popup-image__image");
const popUpImageText = document.querySelector(".popup-image__text");
const popUpProfileNode = document.querySelector(".popup_edit_profile");
const popUpCardNode = document.querySelector(".popup_edit_card");
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

function closePopUpByEsc(evt) {
	const activePopUP = document.querySelector(".popup_visible");
	if (evt.key === "Escape" && activePopUP != null) {
		closePopUp(activePopUP);
	}
}

function closePopUp(popupNode) {
	popupNode.classList.remove("popup_visible");
	document.removeEventListener("keyup", closePopUpByEsc);
	document.removeEventListener("click", closePopUpByOverlayClick);
}

function closePopUpByOverlayClick(evt) {
	const activePopUP = document.querySelector(".popup_visible");
	activePopUP.addEventListener("click", function (evt) {
		closePopUp(evt.target);
	});
}

function openPopUp(popupNode) {
	popupNode.classList.add("popup_visible");
	document.addEventListener("click", closePopUpByOverlayClick);
	document.addEventListener("keyup", closePopUpByEsc);
}

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

export function addImagePopUp(name, link) {
	const popUpImageElement = popUpImageNode.querySelector(".popup-image__image");
	popUpImageText.textContent = name;
	popUpImageElement.src = link;
	openPopUp(popUpImageNode);
}

formSubmitProfile.addEventListener("submit", handleSubmitProfile);
// popUpEditProfileButton.addEventListener("click", uploadPopUpProfile);
popUpImagePhoto.addEventListener("click", function () {
	console.log("active");
});
popUpAddCardButton.addEventListener("click", function () {
	openPopUp(popUpCardNode);
});
popUpProfileCloseButton.addEventListener("click", function () {
	closePopUp(popUpProfileNode);
});
popUpCardCloseButton.addEventListener("click", function () {
	closePopUp(popUpCardNode);
});
popUpImageCloseButton.addEventListener("click", function () {
	closePopUp(popUpImageNode);
});

function addCardByClass(newCardName, newCardLink, templateCardElement) {
	const newCard = new Card(newCardName, newCardLink, templateCardElement);
	const newCardElement = newCard.generateCard();
	cardsContainer.prepend(newCardElement);
}

const formCardValidation = new FormValidation(formSubmitCard, validationConfig);
formCardValidation.enableValidation();
const formProfileValidation = new FormValidation(formSubmitProfile, validationConfig);
formProfileValidation.enableValidation();

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

function openEditPopup() {
	const editPopup = new Popup(".popup_edit_profile");
	editPopup.setEventListeners();
	editPopup.open();
}

popUpEditProfileButton.addEventListener("click", openEditPopup);
