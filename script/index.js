const initialCards = [
  {
    name: 'Курган',
    link: './images/kurgan.jpg'
  },
  {
    name: 'Центр города',
    link: './images/centr.jpg'
  },
  {
    name: 'Подвесной мост',
    link: './images/most.jpg'
  },
  {
    name: 'Площадь партизан',
    link: './images/partizan.jpg'
  },
  {
    name: 'Самолёт',
    link: './images/plane.jpg'
  },
  {
    name: 'Вокзал',
    link: './images/train_station.jpg'
  }
]; 
const templateElement = document.querySelector('.template')
const InitialCardsContainer = document.querySelector('.galary')

function renderCards() {
  const cardsNode = initialCards.map(composeCards);
  InitialCardsContainer.append(...cardsNode);
}
renderCards()

function composeCards(card) {
  const newCard = templateElement.content.cloneNode(true);
  console.log(newCard);
  const cardText = newCard.querySelector('.galary__text');
  const cardLink = newCard.querySelector('.galary__image');
  cardText.textContent = card.name;
  cardLink.src = card.link;
  return newCard;
}

let popUpProfileNode = document.querySelector('.popup-profile'); 
let handleEditButton = document.querySelector('.profile__edit'); 
let handleCloseButton = document.querySelector('.popup-profile__close'); 
let profileName = document.querySelector('.profile__name'); 
let profilePost = document.querySelector('.profile__post'); 
let profileEditName = document.querySelector('#name'); 
let profileEditPost = document.querySelector('#post'); 
let formElement = document.querySelector('.popup-profile__form') 

function addPopUpProfile() { 
  profileEditName.value = profileName.textContent;
  profileEditPost.value = profilePost.textContent;
  popUpProfileNode.classList.toggle('popup-profile_visible');
}
handleEditButton.addEventListener('click', addPopUpProfile);
function closePopUpProfile() {
  popUpProfileNode.classList.toggle('popup-profile_visible');
}
handleCloseButton.addEventListener('click', closePopUpProfile);
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditName.value;
  profilePost.textContent = profileEditPost.value;
}
formElement.addEventListener('submit', formSubmitHandler);