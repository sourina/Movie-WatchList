import { saveMovie, getMovieWatchList } from "./module/client.js";
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
  console.log("add");
  formSection.innerHTML = "";
  confirmationSection.innerHTML = "";
  showAddMovieForm();
  addMovieListener();
});

seeBtnElem.addEventListener("click", async function () {
  console.log("see");
  confirmationSection.innerHTML = "";
  movieSection.innerHTML = "";
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
  buttonElem.addEventListener("click", function () {
    const movie = {
      title: document.getElementById("movie-title").value,
      genre: document.getElementById("genre").value,
      releaseDate: document.getElementById("releaseDate").value,
    };
    saveMovie(movie);
    successConfirmation(movie.title);
  });
}

export { addMovieListener };
