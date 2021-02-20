import "./index.css";
import Card from "../components/Card.js";
import FormValidation from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForms from "../components/PopupWithForms.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup.js";
import {
	validationConfig,
	nameSelector,
	postSelector,
	avatarSelector,
	formSubmitCard,
	formSubmitProfile,
	popUpProfileSelector,
	popUpCardSelector,
	popUpEditProfileButton,
	popUpAddCardButton,
	cardsContainer,
	newCardName,
	newCardLink,
	templateCardElement,
	newName,
	newPost,
	changeAvatarButton,
	formSubmitChangeAvatar,
} from "../utils/constants.js";

//Создаём экземпляр класса Api, через который работаем с данными с сервера
const api = new Api({
	url: "https://mesto.nomoreparties.co/v1/cohort-20/",
	headers: {
		"content-type": "application/json",
		authorization: "ccee129d-3717-4f1b-a6cc-fb8f6eb5e81d",
	},
});

//Создание экземпляра класса UserInfo, через который подставляем данные о пользователе
const userInfo = new UserInfo(nameSelector, postSelector, avatarSelector);

//Создание экземпляра класса Section с карточками
const cardList = new Section((item) => {
	cardList.addItem(createCard(item));
}, cardsContainer);

// Берём данные о пользователе с сервера
api.getUserInfo()
	.then((res) => {
		userInfo.initUserInfo(res.name, res.about, res.avatar);
		userInfo.setUserId(res._id);
	})
	.catch((err) => console.log(err));

//Отрисовываем первоначальные карточки, которые берем с сервера
const initialCards = api.getInitialCards();
initialCards
	.then((res) => {
		cardList.renderItem(res.reverse());
	})
	.catch((err) => console.log(err));

// Функция создания новой карточки
function createCard({ name, link, likes, owner, _id }) {
	const card = new Card(
		{ name, link, likes, owner, _id, userId: userInfo.returnUserId() },
		templateCardElement,
		handleCardClick,
		() => {
			confirmDeletePopup.setEventListeners(removeCard(card));
			confirmDeletePopup.open();
		},
		() => {
			api.addLike(card.returnCardId()).then((res) => {
				card.changeLikeCounter(res.likes.length);
			});
		},
		() => {
			api.removeLike(card.returnCardId()).then((res) => {
				card.changeLikeCounter(res.likes.length);
			});
		}
	);
	return card.generateCard();
}

//Создание Попапа подтверждения удаления карточки
const confirmDeletePopup = new ConfirmDeletePopup(".popup_delete_card");

//Функция колбек для удаления карточки с сервера и из разметки. Передается колбеком в кнопку подтверждения удаления в попапе
const removeCard = (card) => {
	return () => {
		api.deleteCard(card.returnCardId())
			.then((res) => {
				confirmDeletePopup.close();
				card._deleteCard();
			})
			.catch((err) => console.log(err));
	};
};

//Создаём попап добавления карточки, добавляем для него функциональность
//Внутри добавляем карточку на сервер, в то же время отрисовываем добавленну карточку на странице при успешной отправке запроса
const cardPopup = new PopupWithForms(popUpCardSelector, {
	formSubmitHandler: () => {
		renderLoading(".popup_edit_card", true);

		api.addCard({ name: newCardName.value, link: newCardLink.value })
			.then((res) => {
				renderLoading(".popup_edit_card", false);
				cardList.addItem(createCard(res));
			})
			.catch((err) => console.log(err));
	},
});
cardPopup.setEventListeners();

//слушатели на кнопку открытия попапа карточки
popUpAddCardButton.addEventListener("click", () => {
	formCardValidation.resetValidation();
	cardPopup.open();
});

// Создаём попап фуллсайз изображения
const imagePopup = new PopupWithImage(".popup-image");
imagePopup.setEventListeners();

//Создаём функцию для добавления логики открытия попапа картинки в классе Card
export function handleCardClick(cardName, cardLink) {
	imagePopup.openWithImage(cardName, cardLink);
}

//Создаём попап профиля, добавляем для него функциональность
const profilePopup = new PopupWithForms(popUpProfileSelector, {
	formSubmitHandler: () => {
		renderLoading(".popup_edit_profile", true);
		userInfo.setUserInfo(newName, newPost);
		const newUserInfo = userInfo.getUserInfo();
		api.setUserInfo(newUserInfo.name, newUserInfo.post)
			.then(() => renderLoading(".popup_edit_profile", false))
			.catch((err) => console.log(err));
	},
});

profilePopup.setEventListeners();

popUpEditProfileButton.addEventListener("click", () => {
	formProfileValidation.resetValidation();
	userInfo.getUserInfo();
	newName.value = userInfo.getUserInfo().name;
	newPost.value = userInfo.getUserInfo().post;
	profilePopup.open();
});
//Создание жкземлпяра класса попапа с валидацией для попапа сены аватара
const avatartPopup = new PopupWithForms(".popup_edit_avatar", {
	formSubmitHandler: () => {
		renderLoading(".popup_edit_avatar", true);
		api.updateAvatar(avatartPopup.returnIputValues()).then((res) => {
			renderLoading(".popup_edit_avatar", false);
			userInfo.setUserAvatar(res.avatar);
			avatartPopup.close();
		});
	},
});
const openAvatar = () => {
	formPopUpValidation.resetValidation();
	avatartPopup.open();
	avatartPopup.setEventListeners();
};
changeAvatarButton.addEventListener("click", openAvatar);

//Изменение статуса кнопки при отправке данных на сервер
function renderLoading(popupSelector, isLoading) {
	const buttonElement = document.querySelector(popupSelector).querySelector(".popup__save");
	if (isLoading) {
		buttonElement.textContent = "Сохранение...";
	} else {
		buttonElement.textContent = "Сохранить";
	}
}

// Создаём класс валидации для каждой формы, в которой она необходима
const formCardValidation = new FormValidation(formSubmitCard, validationConfig);
formCardValidation.enableValidation();
const formProfileValidation = new FormValidation(formSubmitProfile, validationConfig);
formProfileValidation.enableValidation();
const formPopUpValidation = new FormValidation(formSubmitChangeAvatar, validationConfig);
formPopUpValidation.enableValidation();
