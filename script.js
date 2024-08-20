
document.addEventListener("DOMContentLoaded", getMovies);

const container = document.querySelector(".container");
const card = document.querySelector(".card");
const search = document.getElementById("search");
const upcoming = document.querySelector("#upcoming");
const popular = document.querySelector("#popular");
const all = document.querySelector("#all");

function getGenreName(id) {
  switch (id) {
    case 28:
      return "Action";
    case 12:
      return "Adventure";
    case 16:
      return "Animation";
    case 35:
      return "Comedy";
    case 80:
      return "Crime";
    case 99:
      return "Documentary";
    case 18:
      return "Drama";
    case 10751:
      return "Family";
    case 14:
      return "Fantasy";
    case 36:
      return "History";
    case 27:
      return "Horror";
    case 10402:
      return "Music";
    case 9648:
      return "Mystery";
    case 10749:
      return "Romance";
    case 878:
      return "Science Fiction";
    case 10770:
      return "TV Movie";
    case 53:
      return "Thriller";
    case 10752:
      return "War";
    case 37:
      return "Western";
    default:
      return "Unknown";
  }
}

function createCard(movie) {
  const pageCard = document.createElement("div");
  pageCard.classList.add("card");
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
  const img = document.createElement("img");
  const imgPath = movie.poster_path;
  img.src = IMAGE_BASE_URL + imgPath;
  
 
  img.classList.add("image");
  const movieName = document.createElement("h2");
  movieName.textContent = movie.title;
  const id = movie.id;

  movieName.addEventListener("click", () => {
    window.open(`https://www.themoviedb.org/movie/${id}`, "_blank");
  });

  movieName.classList.add("name");
  const description = document.createElement("p");
  description.textContent = movie.overview;
  description.classList.add("description");
  const genre = document.createElement("ul");
  genre.classList.add("category");
  const list1 = document.createElement("li");
  list1.textContent = getGenreName(movie.genre_ids[0]);
  const list2 = document.createElement("li");
  list2.textContent = getGenreName(movie.genre_ids[1]);

  genre.appendChild(list1);
  genre.appendChild(list2);
  pageCard.appendChild(img);
  pageCard.appendChild(genre);
  pageCard.appendChild(movieName);
  pageCard.appendChild(description);
  container.appendChild(pageCard);
}

async function getMovies() {
  container.innerHTML = " ";

  try {
    const api = "5c2b2a00907f5488a3aedccd80425c03";
    const get = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${api}`
    );
    const data = await get.json();
    const movies = data.results;
    console.log(movies);
    movies.forEach((movie) => {
      createCard(movie);
    });
  } catch (error) {
    console.log(error);
  }
}

async function upcomingMovies() {
  container.innerHTML = " ";

  try {
    const api = "5c2b2a00907f5488a3aedccd80425c03";
    const get = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${api}`
    );
    const data = await get.json();
    const movies = data.results;
    movies.forEach((movie) => {
      createCard(movie);
    });
  } catch (error) {
    console.log(error);
  }
}

async function popularMovies() {
  container.innerHTML = " ";

  try {
    const api = "5c2b2a00907f5488a3aedccd80425c03";
    const get = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${api}`
    );
    const data = await get.json();
    const movies = data.results;
    movies.forEach((movie) => {
      createCard(movie);
    });
  } catch (error) {
    console.log(error);
  }
}

async function searchMovie() {
  container.innerHTML = " ";

  try {
    const movieName = document.getElementById("cityName").value;
console.log(movieName);
    const api = "5c2b2a00907f5488a3aedccd80425c03";
    const get = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${api}`
    );
    const data = await get.json();
    const movies = data.results;
    if (movies == "") {
      const message = document.createElement("h1");
      message.textContent = "Check Movie name";
      message.classList.add("errorMessage");
      container.appendChild(message);
    } else {
      movies.forEach((movie) => {
        createCard(movie);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

upcoming.addEventListener("click", upcomingMovies);
all.addEventListener("click", getMovies);
popular.addEventListener("click", popularMovies);
search.addEventListener("click", searchMovie);
