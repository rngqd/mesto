import "./index.css";
import Card from "../components/Card.js";
import FormValidation from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForms from "../components/PopupWithForms.js";
import UserInfo from "../components/UserInfo.js";
import {
	initialCards,
	validationConfig,
	nameSelector,
	postSelector,
	formSubmitCard,
	formSubmitProfile,
	popUpProfileSelector,
	popUpCardSelector,
	popUpProfileCloseButton,
	popUpEditProfileButton,
	popUpAddCardButton,
	cardsContainer,
	newCardName,
	newCardLink,
	templateCardElement,
	newNameSelector,
	newPostSelector,
} from "../utils/constants.js";

// Создаём класс валидации для каждой формы, в которой она необходима
const formCardValidation = new FormValidation(formSubmitCard, validationConfig);
formCardValidation.enableValidation();
const formProfileValidation = new FormValidation(formSubmitProfile, validationConfig);
formProfileValidation.enableValidation();

// Создаём новую карточку
function createCard(item) {
	const card = new Card(item, templateCardElement, handleCardClick);
	return card.generateCard();
}
//Отрисосываем первоначальные карточки на странице
const initialCardSection = new Section(
	{
		items: initialCards,
		renderer: (item) => {
			const newCardElement = createCard(item);
			initialCardSection.addItem(newCardElement);
		},
	},
	cardsContainer
);
initialCardSection.renderItem();

//Создаём функцию для добавления логики открытия попапа карточки в классе Card
const imagePopup = new PopupWithImage(".popup-image");

export function handleCardClick(cardName, cardLink) {
	imagePopup.setEventListeners();
	imagePopup.openWithImage(cardName, cardLink);
}

const userInfo = new UserInfo(nameSelector, postSelector, newNameSelector, newPostSelector);

//Создаём попап профиля, добавляем для него функциональность
const profilePopup = new PopupWithForms(popUpProfileSelector, {
	formSubmitHandler: () => {
		userInfo.setUserInfo();
	},
});

profilePopup.setEventListeners();

popUpEditProfileButton.addEventListener("click", () => {
	userInfo.getUserInfo();
	formProfileValidation.resetValidation();
	profilePopup.open();
});

//Создаём попап карточки, добавляем для него функциональность
const cardPopup = new PopupWithForms(popUpCardSelector, {
	formSubmitHandler: () => {
		const newCardElement = createCard({ name: newCardName.value, link: newCardLink.value });
		initialCardSection.addItem(newCardElement);
	},
});

cardPopup.setEventListeners();

popUpAddCardButton.addEventListener("click", () => {
	formCardValidation.resetValidation();
	cardPopup.open();
});
