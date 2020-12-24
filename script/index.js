const templateElement = document.querySelector('.template');
const cardsContainer = document.querySelector('.galary');
const newCardName = document.querySelector('#card-name');
const newCardLink = document.querySelector('#card-link');
const formSubmitCard = document.querySelector('.popup__form_edit_card');
const popUpImagePhoto = document.querySelector('.popup-image__image');
const popUpImageText = document.querySelector('.popup-image__text');
const popUpProfileNode = document.querySelector('.popup_edit_profile');
const popUpCardNode = document.querySelector('.popup_edit_card');
const popUpEditProfileButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name'); 
const profilePost = document.querySelector('.profile__post'); 
const profileEditName = document.querySelector('#profile-name'); 
const profileEditPost = document.querySelector('#profile-post'); 
const formSubmitProfile = document.querySelector('.popup__form_edit_profile');
const popUpImageNode = document.querySelector('.popup-image');
const popUpAddCardButton = document.querySelector('.profile__add');
const popUpProfileCloseButton = document.querySelector('.popup__close_edit_profile');
const popUpCardCloseButton = document.querySelector('.popup__close_edit_card');
const popUpImageCloseButton = document.querySelector('.popup-image__close');

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

popUpEditProfileButton.addEventListener('click', uploadPopUpProfile);
popUpImagePhoto.addEventListener('click', addImagePopUp);
popUpAddCardButton.addEventListener('click', function () { addPopUp(popUpCardNode) });
popUpProfileCloseButton.addEventListener('click', function() { closePopUp(popUpProfileNode)})
popUpCardCloseButton.addEventListener('click', function() { closePopUp(popUpCardNode)})
popUpImageCloseButton.addEventListener('click', function() { closePopUp(popUpImageNode)})


function activateLikeButton(evt) {
  const targetLike = evt.target;
  targetLike.classList.toggle('galary__like_active');
}

function deleteTargetCard(evt) {
  const targetCard = evt.target.closest('.galary__card');
  targetCard.remove();
}

function addImagePopUp(evt) {
  addPopUp(popUpImageNode);
  popUpImagePhoto.src = evt.target.closest('.galary__image').src;
  popUpImageText.textContent = evt.target.closest('.galary__card').textContent;
}

function composeCards({name, link}) {
  const initialCard = templateElement.content.cloneNode(true);
  const cardName = initialCard.querySelector('.galary__text');
  const cardImage = initialCard.querySelector('.galary__image');
  const cardLike = initialCard.querySelector('.galary__like');
  const cardTrash = initialCard.querySelector('.galary__trash');
  cardName.textContent = name;
  cardImage.src = link;
  cardLike.addEventListener('click', activateLikeButton);
  cardTrash.addEventListener('click', deleteTargetCard);
  cardImage.addEventListener('click', addImagePopUp);
  return initialCard;
}

function renderInitialCards() {
  const cardsNode = initialCards.map(composeCards);
  cardsContainer.append(...cardsNode);
}

function addCard(evt) {
  evt.preventDefault();
  const newElCard = composeCards({ name: newCardName.value, link: newCardLink.value });
  cardsContainer.prepend(newElCard);
}

function handleSubmitCard() {
  formSubmitCard.addEventListener('submit', addCard);
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
formSubmitProfile.addEventListener('submit', handleSubmitProfile);

renderInitialCards();
handleSubmitCard();