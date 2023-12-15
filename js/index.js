import { saveMovie, getMovieWatchList, checkTitle } from "./module/client.js";
import {
  showAddMovieForm,
  showMovieWatchList,
  confirmationMsg,
  showEmptyMessage,
} from "./module/display.js";

const addBtnElem = document.querySelector("#addMovieBtn");
const seeBtnElem = document.querySelector("#seeMovieBtn");
const searchBtnElem = document.querySelector("#searchBtn");
const movieSection = document.querySelector("#movieList");
const formSection = document.querySelector("#form");
const confirmationSection = document.querySelector("#confirmation");

addBtnElem.addEventListener("click", function () {
  formSection.innerHTML = "";
  confirmationSection.innerHTML = "";
  showAddMovieForm();
  addMovieListener();
});

seeBtnElem.addEventListener("click", async function () {
  movieSection.innerHTML = "";
  confirmationSection.innerHTML = "";

  //fetching all movies from database
  const movieList = await getMovieWatchList();

  //checking if movie is present in database
  if (movieList.empty) {
    showEmptyMessage();
  } else {
    movieList.forEach((movie) => {
      showMovieWatchList(movie.data(), movie.id);
    });
  }
});

searchBtnElem.addEventListener("click", async function () {
  const searchedInput = document.getElementById("searchInput").value;
  //checking user input is empty
  if (searchedInput == "") {
    formSection.style.display = "none";
    movieSection.style.display = "none";
    confirmationSection.style.display = "flex";
    const enterMsgElem = document.createElement("p");
    enterMsgElem.setAttribute("id", "searchValidInputMsg");
    enterMsgElem.innerText = "Please enter valid input";
    confirmationSection.append(enterMsgElem);
  } else {
    const searchedMovie = await checkTitle(searchedInput);
    movieSection.innerHTML = "";
    //checking if movie is present
    if (searchedMovie.empty) {
      showEmptyMessage();
    } else {
      searchedMovie.forEach((movie) => {
        showMovieWatchList(movie.data());
      });
    }
  }
});

//capturing input values through event-click
function addMovieListener() {
  const buttonElem = document.querySelector("#submitFormBtn");
  buttonElem.addEventListener("click", async function () {
    const movie = {
      title: document.getElementById("movie-title").value,
      genre: document.getElementById("genre").value,
      releaseDate: document.getElementById("releaseDate").value,
    };

    //checking if form has values of all fields
    if (
      movie.title == "" ||
      movie.genre == "Genre:" ||
      movie.releaseDate == ""
    ) {
      //checking to show error message
      if (document.getElementById("validInputMsg") == undefined) {
        const enterMsgElem = document.createElement("p");
        enterMsgElem.setAttribute("id", "formValidInputMsg");
        enterMsgElem.innerText = "Please enter valid input";
        formSection.append(enterMsgElem);
        return;
      }
    } else {
      //checking if movie title is already present
      const movieListWithTitle = await checkTitle(movie.title);
      if (movieListWithTitle.empty) {
        saveMovie(movie);
        confirmationMsg(movie.title, true);
      } else {
        confirmationMsg(movie.title, false);
      }
    }
  });
}

export { addMovieListener };
