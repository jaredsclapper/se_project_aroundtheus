const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// profile modal elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/////
const previewModal = document.querySelector("#modal-image-preview");

//////////
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardModal.querySelector("#card-name-input");
const cardUrlInput = addCardModal.querySelector("#card-url-input");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const profileEditForm = profileEditModal.querySelector(".modal__form");

const imageModal = document.querySelector("#modal-image-preview");
const modalImageElement = imageModal.querySelector(".modal__image");
const modalImageCaption = imageModal.querySelector(".modal__caption");
const modalImageOpenButton = document.querySelector;
const modalImageCloseButton = imageModal.querySelector(".modal__close");

function handleEscape(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

function handleCloseOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closePopup();
  }
}

function closePopup() {
  const modal = document.querySelector(".modal_opened");
  modal.classList.remove("modal_opened");
  window.removeEventListener("keydown", handleEscape);
  document.removeEventListener("click", handleCloseOverlay);
}

function openPopup(modal) {
  console.log("popup open");
  modal.classList.add("modal_opened");
  window.addEventListener("keydown", handleEscape);
  document.addEventListener("click", handleCloseOverlay);
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

modalImageCloseButton.addEventListener("click", () => {
  closePopup(imageModal);
});

addCardCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");

  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEL.src = cardData.link;
  cardImageEL.alt = cardData.name;
  cardTitleEL.textContent = cardData.name;

  cardImageEL.addEventListener("click", () => {
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    modalImageCaption.textContent = cardData.name;
    openPopup(imageModal);
  });
  return cardElement;
}

function handleAddCard(e) {
  e.preventDefault();
  const cardData = { name: cardTitleInput.value, link: cardUrlInput.value };
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
  cardTitleInput.value = "";
  cardUrlInput.value = "";
  closePopup(addCardModal);
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCard);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
