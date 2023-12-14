import { saveMovie, getMovieWatchList, checkTitle } from "./module/client.js";
import {
  showAddMovieForm,
  showMovieWatchList,
  successConfirmation,
} from "./module/display.js";

const addBtnElem = document.querySelector("#addMovieBtn");
const seeBtnElem = document.querySelector("#seeMovieBtn");
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
  console.log("see");
  confirmationSection.innerHTML = "";

  console.log("see1");
  const movieList = await getMovieWatchList();

  if (movieList.empty) {
    console.log("empty");
  } else {
    movieList.forEach((movie) => {
      showMovieWatchList(movie.data(), movie.id);
    });
  }
});

function addMovieListener() {
  const buttonElem = document.querySelector("#submitFormBtn");
  buttonElem.addEventListener("click", async function () {
    const movie = {
      title: document.getElementById("movie-title").value,
      genre: document.getElementById("genre").value,
      releaseDate: document.getElementById("releaseDate").value,
    };
    if (
      movie.title == "" ||
      movie.genre == "Genre:" ||
      movie.releaseDate == ""
    ) {
      if (document.getElementById("validInputMsg") == undefined) {
        const enterMsgElem = document.createElement("p");
        enterMsgElem.setAttribute("id", "validInputMsg");
        enterMsgElem.innerText = "Please enter valid input";
        formSection.append(enterMsgElem);
        return;
      }
    } else {
      const movieListWithTitle = await checkTitle(movie.title);
      if (movieListWithTitle.empty) {
        saveMovie(movie);
        successConfirmation(movie.title, true);
      } else {
        successConfirmation(movie.title, false);
      }
    }
  });
}

export { addMovieListener };
