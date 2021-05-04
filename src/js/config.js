// Put vars used throuhgout the app in here

// upper case is used for a constant that shouldn't be channged
export const API_URL = `https://restcountries.eu/rest/v2/alpha`;
export const TIMEOUT_SEC = 10;

export const popCountriesContainer = document.querySelector(
  ".carousel__container"
);
export const title = document.querySelector(".home-title");

export const modalContainer = document.querySelector(".modal-container");
export const overlay = document.querySelector(".overlay");

export const contentContainers = document.querySelectorAll(".container");
export const contentContainer = document.querySelector(".content-container");

// Nav
export const navBtns = document.querySelectorAll(".nav-btn");

// Modal Logic
export const countryCode = window.location.hash.slice(1);
