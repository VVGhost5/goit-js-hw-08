"use strict";

import gallery from "./gallery-items.js";

let counter = 0;
let valueofImage = 0;

const Refs = {
    gallery: document.querySelector(".js-gallery"),
    lightbox: document.querySelector(".lightbox"),
    closeButton: document.querySelector(".lightbox__button"),
    galleryImage: document.querySelector(".lightbox__image"),
    lightboxContent: document.querySelector(".lightbox__content"),
};

const createItem = (el) => {
    const listItem = document.createElement("li");
    const listLink = document.createElement("a");
    const listImage = document.createElement("img");

    listItem.classList.add("gallery__item");
    listLink.classList.add("gallery__link");
    listImage.classList.add("gallery__image");

    listLink.setAttribute("href", el.original);
    listImage.setAttribute("src", el.preview);
    listImage.setAttribute("data-source", el.original);
    listImage.setAttribute("alt", el.description);

    listImage.setAttribute("data-id", valueofImage);
    valueofImage++;

    listItem.appendChild(listLink);
    listLink.appendChild(listImage);

    return listItem;
};

const galleryCards = gallery.map((el) => createItem(el));
Refs.gallery.append(...galleryCards);

const onGalleryClick = (event) => {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") {
        return;
    }

    const imageRef = event.target;
    const largeImageURL = imageRef.dataset.source;
    const largeImageAlt = imageRef.alt;
    Refs.galleryImage.setAttribute("src", largeImageURL);
    Refs.galleryImage.setAttribute("alt", largeImageAlt);
    Refs.lightbox.classList.add("is-open");
    counter = event.target.dataset.id;
};

const closeLightBox = () => {
    Refs.lightbox.classList.remove("is-open");
    Refs.galleryImage.setAttribute("src", "");
    Refs.galleryImage.setAttribute("alt", "");
};

Refs.gallery.addEventListener("click", onGalleryClick);
Refs.closeButton.addEventListener("click", closeLightBox);
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightBox();
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        decrementCounterValue();
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        incrementCounterValue();
    }
});

Refs.lightboxContent.addEventListener("click", (event) => {
    if (event.target.nodeName !== "IMG") {
        closeLightBox();
    }
});

const incrementCounterValue = () => {
    if (counter < gallery.length - 1) {
        counter++;
        Refs.galleryImage.setAttribute("src", gallery[counter].original);
    }
};

const decrementCounterValue = () => {
    if (counter > 0) {
        counter--;
        Refs.galleryImage.setAttribute("src", gallery[counter].original);
    }
};