const search = document.querySelector(".search");
const movieMenu = document.querySelector("#movie");
const movieHead = document.querySelector("#movie-head");
const form = document.getElementById("search-cont");
myFetch(api_url, "GET")
  .then((movie) => movie)
  .then((data) => {
    printMovie(data.results);
  });

function printMovie(movies) {
  movieMenu.innerHTML = "";
  movies.forEach((el) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie_item");
    let img = document.createElement("img");
    img.src = img_url + el.poster_path;
    img.classList.add("movie-img");
    movieItem.append(img);
    let title_lenguage = document.createElement("div");
    title_lenguage.classList.add("title_lenguage");
    let lenguage = document.createElement("p");
    lenguage = el.original_language;
    let title = document.createElement("h2");
    title = el.title;
    movieItem.append(title_lenguage);
    movieMenu.append(movieItem);
    movieItem.addEventListener("click", () => {
      location.href = "./movie.html?id=" + el.id;
    });
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTherm = search.value;
  if (searchTherm) {
    myFetch(`${main_url}/search/movie?${api_key}&query=${searchTherm}`).then(
      (res) => printMovie(res.results)
    );
  }
});

setTimeout(() => {
  document.querySelector(".loader").remove();
  console.log("Loading complete!");
}, 3000);
