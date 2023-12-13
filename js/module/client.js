import { db } from "../firebaseConfig.js";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  startAt,
  orderBy,
  endAt,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

async function checkTitle(event) {
  console.log(event);
  try {
    const queryTitleName = query(
      collection(db, "movie"),
      orderBy("title"),
      startAt(event),
      endAt(event + "\uf8ff")
    );
    console.log(queryTitleName);
    const movieList = await getDocs(queryTitleName);
    // movieList.forEach((movie) => {
    //   console.log(movie.data());
    // });
    return movieList;
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

async function saveMovie(movie) {
  try {
    await addDoc(collection(db, "movie"), {
      title: movie.title,
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