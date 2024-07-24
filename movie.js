const movieCont = document.getElementById("movie");
const actorsCont = document.querySelector(".home");
const cont = document.querySelector(".cont");
let id = location.search.split("=", 2)[1];
const url = `https://api.themoviedb.org/3/movie/${id}?${api_url}`;

function getMovie() {
  myFetch(url, "GET").then((movie) => {
    printMovie(movie);
  });
}
function getActors() {
  myFetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?${api_url}`,
    "GET"
  ).then((actors) => {
    printActors(actors.cast);
  });
}

getMovie();
getActors();
function printMovie(movieData) {
  movieCont.style.backgroundImage = `url(${img_url + movieData.backdrop_path})`;
  movieCont.innerHTML += `
      <div class="movie-cont">
          <div class="left">
            <img src="${
              img_url + movieData.poster_path
            }" class="movie-poster" alt="" />
          </div>
          <div class="right">
            <h2 class="movie_title">${movieData.title}</h2>
            <p class="overview">
                ${movieData.overview}
            </p>
            <p class="gener">Gener:${movieData.genres[0].name}</p>
            <p class="date">Date:${movieData.release_date}</p>
          </div>
        </div>
  `;
}

function printActors(actors) {
  actors.forEach((actor) => {
    actorsCont.innerHTML += ` 
    <div class="actors-cont">
        <div class="actor-item">
        <img
            src="${img_url + actor.profile_path}"
            alt=""
            class="actor-photo"
        />
        <h2 class="actor-name">${actor.name}</h2>
        </div>
    </div>
    `;
  });
}


function printVideo() {
  myFetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?${api_url}`,
    "GET"
  ).then((videos) => {
    console.log(videos);
    videos.results.forEach(el => {
      cont.innerHTML += `
      <div class="cont">
           <iframe width="560" height="315" src="https://www.youtube.com/embed/${el.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
     </div>
     `;
    });
  });
}

printVideo();


setTimeout(() => {
  document.querySelector(".loader").remove();
  console.log("Loading complete!");
}, 3000);