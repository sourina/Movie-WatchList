import { updateWatched, deleteMovie, getMovieWatchList } from "./client.js";

const formSection = document.querySelector("#form");
const movieSection = document.querySelector("#movieList");
const confirmationSection = document.querySelector("#confirmation");

function showAddMovieForm() {
  document.getElementById("seeMovieBtn").style.display = "inline";
  document.getElementById("hideMovieBtn").style.display = "none";
  formSection.style.display = "flex";
  movieSection.style.display = "none";

  // Create a form dynamically
  const formElem = document.createElement("form");
  formElem.setAttribute("id", "movieForm");

  // Create input elements for form
  const titleElem = document.createElement("input");

  titleElem.setAttribute("type", "text");

  titleElem.setAttribute("placeholder", "Title:");
  titleElem.setAttribute("id", "movie-title");

  const genreElem = document.createElement("select");
  genreElem.options.add(new Option("Genre:"));
  genreElem.options.add(new Option("Comedy"));
  genreElem.options.add(new Option("Romance"));
  genreElem.options.add(new Option("Action"));
  genreElem.setAttribute("id", "genre");

  const releaseDateElem = document.createElement("input");
  releaseDateElem.setAttribute("type", "date");
  releaseDateElem.setAttribute("placeholder", "Release Date:");

  releaseDateElem.setAttribute("id", "releaseDate");

  const submitButtonElem = document.createElement("input");
  submitButtonElem.setAttribute("type", "button");
  submitButtonElem.setAttribute("id", "submitFormBtn");
  submitButtonElem.value = "submit";

  formElem.append(titleElem);
  formElem.append(genreElem);
  formElem.append(releaseDateElem);
  formElem.append(submitButtonElem);

  formSection.append(formElem);
}

function successConfirmation(title, isPresent) {
  confirmationSection.innerHTML = "";
  formSection.style.display = "none";
  confirmationSection.style.display = "block";
  const titleElem = document.createElement("p");
  titleElem.setAttribute("id", "confirm-msg");
  if (isPresent) {
    titleElem.innerText =
      title.charAt(0).toUpperCase() +
      title.substring(1) +
      " Added Successfully";
  } else {
    titleElem.innerText =
      title.charAt(0).toUpperCase() +
      title.substring(1) +
      " Is Already Present";
  }

  confirmationSection.append(titleElem);
}

function showMovieWatchList(movie, id) {
  document.getElementById("seeMovieBtn").style.display = "none";
  document.getElementById("hideMovieBtn").style.display = "inline";
  formSection.style.display = "none";
  movieSection.style.display = "flex";

  //dynamically create article to display saved movie watchlist
  const articleElem = document.createElement("article");
  articleElem.setAttribute("id", "movie-article");
  const titleElem = document.createElement("h3");
  titleElem.setAttribute("id", "movie-name");
  const genreElem = document.createElement("h4");
  genreElem.setAttribute("id", "movie-genre");
  const releaseDateElem = document.createElement("h4");
  releaseDateElem.setAttribute("id", "movie-releaseDate");
  const watchedButtonElem = document.createElement("input");
  watchedButtonElem.setAttribute("id", "watched-toggleBtn");
  watchedButtonElem.setAttribute("type", "button");

  //toggle display text

  if (movie.watched) {
    watchedButtonElem.value = "watched";
  } else {
    watchedButtonElem.value = "not watched";
  }

  //update value of watched in database
  watchedButtonElem.addEventListener("click", function () {
    movie.watched = !movie.watched;
    if (movie.watched) {
      watchedButtonElem.value = "watched";
    } else {
      watchedButtonElem.value = "not watched";
    }
    updateWatched(id, movie.watched);
  });

  const deleteButtonElem = document.createElement("input");
  deleteButtonElem.setAttribute("id", "delete-Btn");
  deleteButtonElem.setAttribute("type", "button");
  deleteButtonElem.value = "delete";

  //delete a movie from database
  deleteButtonElem.addEventListener("click", async function () {
    await deleteMovie(id);
    displayUpdatedMovieList();
  });

  titleElem.innerText = "Movie Name : " + movie.title;
  genreElem.innerText = "Genre : " + movie.genre;
  releaseDateElem.innerText = "Released On : " + movie.releaseDate;

  articleElem.append(titleElem);
  articleElem.append(genreElem);
  articleElem.append(releaseDateElem);
  articleElem.append(watchedButtonElem);
  articleElem.append(deleteButtonElem);

  movieSection.append(articleElem);
  document
    .querySelector("#hideMovieBtn")
    .addEventListener("click", function () {
      location.reload();
    });
}

async function displayUpdatedMovieList() {
  movieSection.innerHTML = "";
  const updatedMovieList = await getMovieWatchList();
  updatedMovieList.forEach((movie) => {
    showMovieWatchList(movie.data(), movie.id);
  });
}

export { showAddMovieForm, showMovieWatchList, successConfirmation };
