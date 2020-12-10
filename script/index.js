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
const CardsContainer = document.querySelector('.galary')
const newCardName = document.querySelector('#card-name')
const newCardLink = document.querySelector('#card-link')

function renderInitialCards() {
  const cardsNode = initialCards.map(composeCards);
  CardsContainer.append(...cardsNode);
}

function composeCards({name, link}) {
  const initialCard = templateElement.content.cloneNode(true);
  const cardName = initialCard.querySelector('.galary__text');
  const cardLink = initialCard.querySelector('.galary__image');
  cardName.textContent = name;
  cardLink.src = link;
  initialCard.querySelector('.galary__like').addEventListener('click', activateLikeButton);
  initialCard.querySelector('.galary__trash').addEventListener('click',deleteTargetCard);
  return initialCard;
}

function activateLikeButton(evt) {
  const targetLike = evt.target
  targetLike.classList.toggle('galary__like_active')
}

function deleteTargetCard(evt) {
  const targetCard = evt.target.closest('.galary__card');
  targetCard.remove();
}

function handleSubmitCard() {
  const formSubmitCard = document.querySelector('.popup__form_edit_card');
  formSubmitCard.addEventListener('submit', addCard);
}

function addCard(evt) {
  evt.preventDefault();
  const newElCard = composeCards({name: newCardName.value, link: newCardLink.value})
  CardsContainer.prepend(newElCard);
  togglePopUpCard();
}

const popUpProfileNode = document.querySelector('.popup_edit_profile'); 
const handleEditProfileButton = document.querySelector('.profile__edit'); 
const handleCloseProfileButton = document.querySelector('.popup__close_edit_profile'); 
const profileName = document.querySelector('.profile__name'); 
const profilePost = document.querySelector('.profile__post'); 
const profileEditName = document.querySelector('#profile-name'); 
const profileEditPost = document.querySelector('#profile-post'); 
const formSubmitProfile = document.querySelector('.popup__form_edit_profile');

function addPopUpProfile() { 
  profileEditName.value = profileName.textContent;
  profileEditPost.value = profilePost.textContent;
  popUpProfileNode.classList.toggle('popup_visible');
}

handleEditProfileButton.addEventListener('click', addPopUpProfile);
function closePopUpProfile() {
  popUpProfileNode.classList.toggle('popup_visible');
}

handleCloseProfileButton.addEventListener('click', closePopUpProfile);
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditName.value;
  profilePost.textContent = profileEditPost.value;
  closePopUpProfile();
}

formSubmitProfile.addEventListener('submit', profileFormSubmitHandler);

const popUpCardNode = document.querySelector('.popup_edit_card');
const handleAddCardButton = document.querySelector('.profile__add');
const handleCloseCardButton = document.querySelector('.popup__close_edit_card');

function togglePopUpCard() {
  popUpCardNode.classList.toggle('popup_visible');
}

handleAddCardButton.addEventListener('click', togglePopUpCard);
handleCloseCardButton.addEventListener('click', togglePopUpCard);

renderInitialCards()
handleSubmitCard()