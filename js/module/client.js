import { db } from "../firebaseConfig.js";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

async function checkTitle(title) {
  try {
    const queryTitleName = query(
      collection(db, "movie"),
      where("title", "==", title.toUpperCase())
    );

    const movieList = await getDocs(queryTitleName);
    return movieList;
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

async function saveMovie(movie) {
  try {
    await addDoc(collection(db, "movie"), {
      title: movie.title.toUpperCase(),
      genre: movie.genre,
      releaseDate: movie.releaseDate,
      watched: false,
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

async function getMovieWatchList() {
  try {
    const movieList = await getDocs(collection(db, "movie"));
    return movieList;
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

async function updateWatched(id, isWatched) {
  try {
    await updateDoc(doc(db, "movie", id), {
      watched: isWatched,
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

async function deleteMovie(id) {
  try {
    await deleteDoc(doc(db, "movie", id));
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}
export { saveMovie, getMovieWatchList, updateWatched, deleteMovie, checkTitle };
