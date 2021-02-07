export const validationConfig = {
	formSelector: ".popup__form",
	inputSelector: ".popup__profile",
	submitButtonSelector: ".popup__save",
	inputInvalidClass: "popup__profile_state_invalid",
	buttonInvalidClass: "popup__save_state_invalid",
};
import kurganImage from "../images/kurgan.jpg";
import cityCentr from "../images/centr.jpg";
import bridge from "../images/most.jpg";
import partizan from "../images/partizan.jpg";
import plane from "../images/plane.jpg";
import trainStation from "../images/train_station.jpg";
export const initialCards = [
	{
		name: "Курган",
		link: kurganImage,
	},
	{
		name: "Центр города",
		link: cityCentr,
	},
	{
		name: "Подвесной мост",
		link: bridge,
	},
	{
		name: "Площадь партизан",
		link: partizan,
	},
	{
		name: "Самолёт",
		link: plane,
	},
	{
		name: "Вокзал",
		link: trainStation,
	},
];
export const nameSelector = ".profile__name";
export const postSelector = ".profile__post";
export const newNameSelector = "#profile-name";
export const newPostSelector = "#profile-post";
export const formSubmitCard = document.querySelector(".popup__form_edit_card");
export const formSubmitProfile = document.querySelector(".popup__form_edit_profile");
export const popUpProfileSelector = ".popup_edit_profile";
export const popUpCardSelector = ".popup_edit_card";
export const popUpProfileCloseButton = document.querySelector(".popup__close_edit_profile");
export const popUpEditProfileButton = document.querySelector(".profile__edit");
export const popUpAddCardButton = document.querySelector(".profile__add");
export const cardsContainer = document.querySelector(".galary");
export const newCardName = document.querySelector("#card-name");
export const newCardLink = document.querySelector("#card-link");
export const templateCardElement = document.querySelector(".template");
