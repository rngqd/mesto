import { initialCards } from './initialCards.js';
import { Card } from './cards.js'
import { validationConfig } from './validationConfig.js'
import { FormValidation } from './formValidation.js'

const profileName = document.querySelector('.profile__name'); 
const profilePost = document.querySelector('.profile__post'); 
const formSubmitCard = document.querySelector('.popup__form_edit_card');
const formSubmitProfile = document.querySelector('.popup__form_edit_profile');
const popUpImagePhoto = document.querySelector('.popup-image__image');
const popUpImageText = document.querySelector('.popup-image__text');
const popUpProfileNode = document.querySelector('.popup_edit_profile');
const popUpCardNode = document.querySelector('.popup_edit_card');
const popUpImageNode = document.querySelector('.popup-image');
const popUpProfileCloseButton = document.querySelector('.popup__close_edit_profile');
const popUpCardCloseButton = document.querySelector('.popup__close_edit_card');
const popUpImageCloseButton = document.querySelector('.popup-image__close');
const popUpEditProfileButton = document.querySelector('.profile__edit');
const popUpAddCardButton = document.querySelector('.profile__add');
const popUpCardSaveButton = document.querySelector('.popup__save_edit_card');
const templateElement = document.querySelector('.template');
const cardsContainer = document.querySelector('.galary');
const newCardName = document.querySelector('#card-name');
const newCardLink = document.querySelector('#card-link');
const profileEditName = document.querySelector('#profile-name'); 
const profileEditPost = document.querySelector('#profile-post');

function closePopUpByEsc(evt) {
  const activePopUP = document.querySelector('.popup_visible')
    if (evt.key === 'Escape' && activePopUP != null) {
      closePopUp(activePopUP)
    }
}

function closePopUp(popupNode) {
  popupNode.classList.remove('popup_visible');
  document.removeEventListener('keyup',closePopUpByEsc)
}

function addPopUp(popupNode) {
  popupNode.classList.add('popup_visible');
  popupNode.addEventListener('click', function (evt){
    closePopUp (evt.target)
  })
  document.addEventListener('keyup',closePopUpByEsc)
}

function uploadPopUpProfile() { 
  profileEditName.value = profileName.textContent;
  profileEditPost.value = profilePost.textContent;
  addPopUp(popUpProfileNode);
}

function handleSubmitCard(evt) {
  evt.preventDefault();
  addCardByClass();
  closePopUp(popUpCardNode); 
  formSubmitCard.reset();
}
formSubmitCard.addEventListener('submit',handleSubmitCard)

function handleSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditName.value;
  profilePost.textContent = profileEditPost.value;
  closePopUp(popUpProfileNode);
}

export function addImagePopUp(evt) {
  addPopUp(popUpImageNode);
  popUpImagePhoto.src = evt.target.closest('.galary__image').src;
  popUpImageText.textContent = evt.target.closest('.galary__card').textContent;
}

formSubmitProfile.addEventListener('submit', handleSubmitProfile);
popUpEditProfileButton.addEventListener('click', uploadPopUpProfile);
popUpImagePhoto.addEventListener('click', function () {console.log('active')});
popUpAddCardButton.addEventListener('click', function () { addPopUp(popUpCardNode) });
popUpProfileCloseButton.addEventListener('click', function () { closePopUp(popUpProfileNode) });
popUpCardCloseButton.addEventListener('click', function () { closePopUp(popUpCardNode) });
popUpImageCloseButton.addEventListener('click', function () { closePopUp(popUpImageNode) });

function renderInitialCardsByClass() {
  const cardClasses = initialCards.map(item => new Card(item.name, item.link));
  const cardElements = cardClasses.map((card) => {
    const cardElement = card.generateCard();
    cardElement.querySelector('.galary__image').addEventListener('click', addImagePopUp);
    return cardElement;
  });
  cardsContainer.append(...cardElements);
}
function addCardByClass() {
    const newCard = new Card (newCardName.value, newCardLink.value);
    const newCardElement = newCard.generateCard();
    newCardElement.querySelector('.galary__image').addEventListener('click', addImagePopUp);
    cardsContainer.prepend(newCardElement);
  }

renderInitialCardsByClass();

const formCardValidation = new FormValidation(formSubmitCard, validationConfig)
formCardValidation.enableValidation();
const formProfileValidation = new FormValidation(formSubmitProfile, validationConfig);
formProfileValidation.enableValidation();