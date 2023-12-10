const cont = document.querySelector(".container");
const movieSection = document.querySelector("#movie-section");
const tvSection = document.querySelector("#tv-section");
const movieId = document.querySelector(".movie-id");
const akash = document.querySelector(".akash");
const peoples = document.querySelector(".peoples");
const swiperContainer = document.getElementById("swiperContainer");
const searching = document.querySelector(".search-bar");

const key = "752949372a73562bd9819c92c7949a71";
const url =
  "https://api.themoviedb.org/3/movie/157336?api_key=752949372a73562bd9819c92c7949a71";
const topRated =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=752949372a73562bd9819c92c7949a71";
const popularMovies =
  "https://api.themoviedb.org/3/movie/popular?api_key=752949372a73562bd9819c92c7949a71";
const popularTV =
  "https://api.themoviedb.org/3/tv/popular?api_key=752949372a73562bd9819c92c7949a71";
const imgUrl = "https://image.tmdb.org/t/p/";
const searchUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=752949372a73562bd9819c92c7949a71&&query=";
const searchSection = document.querySelector(".search-section");
const genresUrl =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=752949372a73562bd9819c92c7949a71";
const discoverUrl =
  "https://api.themoviedb.org/3/discover/movie?api_key=752949372a73562bd9819c92c7949a71&with_genres=";
const peopleUrl =
  "https://api.themoviedb.org/3/person/popular?api_key=752949372a73562bd9819c92c7949a71";
const trending =
  "https://api.themoviedb.org/3/trending/all/day?api_key=752949372a73562bd9819c92c7949a71";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTI5NDkzNzJhNzM1NjJiZDk4MTljOTJjNzk0OWE3MSIsInN1YiI6IjY1NmJlOGEzZmNhZGI0MDEzYzhmODFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iSEsPGablv91mhE8IQvUItZKfuWFDuTRbEhB0nY5EsA",
  },
};
const end = document.querySelector(".end");
const nav = document.querySelector(".navbar");
const menu = document.querySelector(".menu");

document.querySelector(".menu").addEventListener("click", () => {
  end.classList.toggle("active");
  nav.classList.toggle("nav-active");
  document.getElementById("glass-btn").innerHTML = `
  <div id="glass">
  
  <p> Search</p>
  
  </div>
  `;
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target)) {
      // Clicked outside the menu, so remove classes
      end.classList.remove("active");
      nav.classList.remove("nav-active");
    }
  });
});

function home() {
  akash.innerHTML = "";
  peoples.innerHTML = "";
  searching.innerHTML = "";
  cont.innerHTML = "";
  heroes();
  trendings();
  rated();
  upcoming();
  homeMovies();
}
async function upcoming() {
  const upcoming =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=752949372a73562bd9819c92c7949a71";
  try {
    const response = await fetch(upcoming, options);
    const result = await response.json();
    const data = result.results.slice(0, 12);

    cont.innerHTML += `<h1 class="cat">Upcoming Movies</h1>`;

    cont.innerHTML += `
    
    
    ${data
      .map(
        (movie) => `
          
    <div class="movie-id" data-aos="fade-down" id=${movie.id} >
  <img src="${imgUrl + "original" + movie.poster_path}" >
  <p class="movie-title"id=${movie.id}>${movie.title}</p>
  <div class="ratings">
        <img src="star.png" id="star">
        <h5>${movie.vote_average.toFixed(1)}</h5>
    </div>
    <div class="date">
        <h5>${movie.release_date.slice(0, 4)}</h5>
    </div>
  </div>
    
  `
      )
      .join("")}`;
  } catch (error) {
    console.error(error);
  }
}
async function rated() {
  try {
    const response = await fetch(topRated, options);
    const result = await response.json();
    const data = result.results.slice(0, 12);

    cont.innerHTML += `<h1 class="cat">Top-Rated</h1>`;

    cont.innerHTML += `
    
    
    ${data
      .map(
        (movie) => `
          
    <div class="movie-id" data-aos="fade-down" id=${movie.id} >
  <img src="${imgUrl + "original" + movie.poster_path}" >
  <p class="movie-title"id=${movie.id}>${movie.title}</p>
  <div class="ratings">
        <img src="star.png" id="star">
        <h5>${movie.vote_average.toFixed(1)}</h5>
    </div>
    <div class="date">
        <h5>${movie.release_date.slice(0, 4)}</h5>
    </div>
  </div>
    
  `
      )
      .join("")}`;
  } catch (error) {
    console.error(error);
  }
}

async function trendings() {
  try {
    const response = await fetch(trending, options);
    const result = await response.json();
    const data = result.results.slice(0, 12);

    cont.innerHTML += `<h1 class="cat">Trending Now</h1>`;

    cont.innerHTML += `
    
    
    ${data
      .map(
        (movie) => `
          
    <div class="movie-id" data-aos="fade-down" id=${movie.id} >
  <img src="${imgUrl + "original" + movie.poster_path}" >
  <p class="movie-title"id=${movie.id}>${
          movie.title == undefined ? movie.name : movie.title
        }</p>
  <div class="ratings">
        <img src="star.png" id="star">
        <h5>${movie.vote_average.toFixed(1)}</h5>
    </div>
    <div class="date">
        <h5>${movie.release_date ? movie.release_date.substring(0, 4) : ""}</h5>
    </div>
  </div>
    
  `
      )
      .join("")}`;
  } catch (error) {
    console.error(error);
  }
}

async function homeMovies() {
  akash.innerHTML = "";
  peoples.innerHTML = "";

  try {
    const response = await fetch(popularMovies, options);
    const result = await response.json();
    const data = result.results.slice(0, 12);

    cont.innerHTML += `<h1 class="cat">Popular</h1>`;

    cont.innerHTML += `
    
    
    ${data
      .map(
        (movie) => `
          
    <div class="movie-id" data-aos="fade-down" id=${movie.id} >
  <img src="${imgUrl + "original" + movie.poster_path}" >
  <p class="movie-title"id=${movie.id}>${movie.title}</p>
  <div class="ratings">
        <img src="star.png" id="star">
        <h5>${movie.vote_average.toFixed(1)}</h5>
    </div>
    <div class="date">
        <h5>${movie.release_date.slice(0, 4)}</h5>
    </div>
  </div>
    
  `
      )
      .join("")}`;
  } catch (error) {
    console.error(error);
  }
}

function heroes() {
  fetch(trending, options)
    .then((res) => res.json())
    .then((data) => {
      const swiperWrapper = document.getElementById("mySwiperWrapper");

      // Clear existing content
      swiperWrapper.innerHTML = "";

      // Loop through the items and create swiper-slide elements
      const movies = data.results.slice(1, 8);

      movies.forEach((item) => {
        // Create a div for each swiper-slide
        if (item.title.length > 35) {
          return;
        }
        const value = item.id;

        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        // Create an image element and set its source
        const image = document.createElement("img");
        image.src = imgUrl + "original/" + item.backdrop_path;

        // Create a p element for the movie title
        const titleText = document.createElement("p");
        titleText.textContent =
          item.title == undefined ? item.name : item.title; // Assuming "title" is the property containing
        titleText.classList.add("hero-title");

        const titleOver = document.createElement("p");
        titleOver.textContent = item.overview; // Assuming "title" is the property containing the movie title
        titleOver.classList.add("hero-overview");

        const trailerBtn = document.createElement("button");
        trailerBtn.textContent = "Watch Trailer";
        trailerBtn.classList.add("hero-trailer");
        // Add a class for styling
        titleOver.innerHTML += `
        
        <div id="hero-trailer">
        <button  id="trailer-btn" onclick="trailer(${value})">
        <i class="fa-solid fa-play"></i>
        
        </button>
        <p> Watch Trailer</p>
        </div>
        
            
            `;

        slide.appendChild(image);
        slide.appendChild(titleText);
        slide.appendChild(titleOver);
        slide.appendChild(trailerBtn);

        swiperWrapper.appendChild(slide);
      });
      swiperContainer.style.display = "block";

      // Initialize Swiper after adding slides
    });
}
function hideSwiperContainer() {
  swiperContainer.style.display = "none";
}

function searchBar() {
  hideSwiperContainer();
  akash.innerHTML = "";
  peoples.innerHTML = "";
  cont.innerHTML = "";

  searching.innerHTML = `
    <div id="search-bar"data-aos="fade-down">
    <input type="text" placeholder="Search.." id="search-value">
    <button id="search-btn"><i class="fa-solid fa-magnifying-glass"></i
    ></button>
    </div>
    <div id="search-results-container" class="container"></div>
   
    `;
  const searchBtn = document.getElementById("search-btn");
  searchBtn.addEventListener("click", () => {
    console.log("clicked");
    const searchValue = document.getElementById("search-value").value;

    searchResults(searchValue);
  });
}

async function searchResults(value) {
  peoples.innerHTML = "";
  akash.innerHTML = "";
  try {
    const response = await fetch(searchUrl + value, options);
    const result = await response.json();

    const moviesWithPosters = result.results.filter(
      (movie) => movie.poster_path != null
    );

    const movieElements = moviesWithPosters.map(
      (movie) => `
 <div class="movie-id"data-aos="fade-down"id=${movie.id}>
  <img src="${imgUrl + "original/" + movie.poster_path}">
  <p class="movie-title"id=${movie.id}>${movie.title}</p>
  <div class="ratings">
        <img src="star.png" id="star">
        <h5>${movie.vote_average.toFixed(1)}</h5>
    </div>
    <div class="date">
        <h5>${movie.release_date.slice(0, 4)}</h5>
    </div>
 </div>
`
    );

    const movieListHTML = movieElements.join("");

    cont.innerHTML = movieListHTML;
  } catch (error) {
    console.error(error);
  }
}
function categories() {
  hideSwiperContainer();
  peoples.innerHTML = "";
  cont.innerHTML = "";
  searching.innerHTML = "";

  akash.innerHTML = `
    <div id="genres"data-aos="fade-down">
   <button id="28">Action</button>
   <button id="12">Adventure</button>
   <button id="16">Animation</button>
   <button id="35">Comedy</button>
   <button id="80">Crime</button>
   <button id="99">Documentary</button>
   <button id=" 18">Drama</button>
   <button id="14">Fantasy</button>
   <button id="27">Horror</button>
   <button id="10402">Music</button>
   <button id="9648">Mystery</button>
   <button id="10749">Romance</button>
   <button id="878">Science Fiction</button>
   <button id="10770">TV Movie</button>
   <button id="53">Thriller</button>
   <button id="10752">War</button>
   <button id="37">Western</button>
   
    </div>
    `;
  const genres = document.getElementById("genres");
  genres.addEventListener("click", (e) => {
    const value = e.target.id;
    const name = e.target.textContent;

    catMovies(value, name);
  });
}
async function catMovies(value, name) {
  peoples.innerHTML = "";
  akash.innerHTML = "";
  searching.innerHTML = "";
  try {
    const response = await fetch(discoverUrl + value, options);
    const result = await response.json();

    const moviesWithPosters = result.results.filter(
      (movie) => movie.poster_path != null
    );

    const movieElements = moviesWithPosters.map(
      (movie) => `
      
     <div class="movie-id"data-aos="fade-down" id=${movie.id} >
      <img src="${imgUrl + "original/" + movie.poster_path}">
      <p class="movie-title" id=${movie.id}>${movie.title}</p>
      <div class="ratings">
        <img src="star.png" id="star">
        <h5>${movie.vote_average.toFixed(1)}</h5>
    </div>
    <div class="date">
        
        <h5>${movie.release_date ? movie.release_date.substring(0, 4) : ""}</h5>
    </div>
     </div>
    `
    );

    const movieListHTML = movieElements.join("");
    cont.innerHTML = `<h1 class="cat">${name}</h1><br>`;
    cont.innerHTML += movieListHTML;
  } catch (error) {
    console.error(error);
  }
}
async function people() {
  hideSwiperContainer();
  akash.innerHTML = "";
  peoples.innerHTML = "";
  searching.innerHTML = "";

  try {
    cont.innerHTML = "";
    const response = await fetch(peopleUrl, options);
    const result = await response.json();
    akash.innerHTML = `<h1 class="cat">Popular People</h1>`;
    akash.innerHTML += `${result.results
      .map(
        (movie) => `
                
                <div class="movie-id" data-aos="fade-down"id=${movie.id}>
              <img src="${imgUrl + "original/" + movie.profile_path}">
              <p class="movie-title"id=${movie.id}>${movie.name}</p>

              </div>
             
              `
      )
      .join("")}`;
  } catch (error) {
    console.log(error);
  }
}
// document.querySelector(".movie-id").setAttribute("data-aos", "zoom-out");

cont.addEventListener("click", (e) => {
  peoples.innerHTML = "";
  akash.innerHTML = "";
  searching.innerHTML = "";

  if (e.target.id != "") description(e.target.id);
  // if (e.target.id != "") recommended(e.target.id);
});
async function description(value) {
  hideSwiperContainer();
  const castUrl = `https://api.themoviedb.org/3/movie/${value}/credits?api_key=752949372a73562bd9819c92c7949a71`;
  const response = await fetch(castUrl, options);
  const result = await response.json();
  const directorList = result.crew.filter(
    (member) => member.job === "Director"
  );
  const directorNames = directorList.map((director) => director.name);

  const descUrl = `https://api.themoviedb.org/3/movie/${value}?api_key=752949372a73562bd9819c92c7949a71`;
  cont.innerHTML = "";
  try {
    const response = await fetch(descUrl, options);
    const result = await response.json();

    cont.innerHTML = `
  
    <div class="movie-modal" style="background:rgba(0,0,0,0.6)url('${
      imgUrl + "original/" + result.backdrop_path
    }');background-blend-mode:darken;background-size:cover;">
    
    
    
    <div class="left-modal">
    <img src="${imgUrl + "original/" + result.poster_path}">
    
    </div>
    <div class="right-modal">
    
   
    <div class="overview">

    <h1>${result.title}</h1>
    <div class="modal-release">
    <div class="modal-date">
    <i class="fa-regular fa-registered"></i>
        <p>${result.release_date}</p>
        <i class="fa-solid fa-circle-dot"></i>
         <p>${result.genres.map((x) => x.name).join(", ")}</p>
         <i class="fa-solid fa-circle-dot"></i>
        <p>${result.runtime} Minutes</p>
    </div>
    </div>
    <p>${result.overview}</p>
    </div>
    <div class="modal-ratings">
    <p>Ratings :</p>
    <img src="star.png" id="star">
    <p>${result.vote_average.toFixed(1)}</p>
    </div>
   
    <div class="modal-date">
    <p>Directed by : ${directorNames[0]}</p>
    </div>
    <div class="trailer-btn">
    <button onclick="trailer(${value})" id="trailer-btn">
    <i class="fa-solid fa-play"></i>
  
    </button>
    <a onclick="trailer(${value})">Trailer</a>
    </div>
    
    </div>
    </div>
    `;
  } catch (error) {
    console.error(error);
  }

  cast(value);
}
function trailer(value) {
  const trailerUrl = `https://api.themoviedb.org/3/movie/${value}/videos?api_key=752949372a73562bd9819c92c7949a71`;
  fetch(trailerUrl, options)
    .then((res) => res.json())
    .then((data) => {
      const result = data.results.filter((x) => x.type == "Trailer");
      const videoKey = result[0].key; // Assuming the first video is a trailer
      const trailerUrl = `https://www.youtube.com/watch?v=${videoKey}`;

      window.open(trailerUrl, "_blank");
    });
}
async function recommended(value) {
  const recoUrl = `https://api.themoviedb.org/3/movie/${value}/recommendations?api_key=752949372a73562bd9819c92c7949a71`;
  try {
    const response = await fetch(recoUrl, options);
    const result = await response.json();
    cont.innerHTML += `<h3 class="cat">You might also like</h3>`;
    const moviesWithPosters = result.results.filter(
      (movie) => movie.poster_path != null
    );
    const limitedMoviesWithPosters = moviesWithPosters.slice(0, 12);
    cont.innerHTML += `
    
    
    ${limitedMoviesWithPosters
      .map(
        (movie) => `
          
    <div class="movie-id" data-aos="fade-down" id=${movie.id} >
  <img src="${imgUrl + "original/" + movie.poster_path}" >
  <p class="movie-title"id=${movie.id}>${movie.title}</p>
  <div class="ratings">
        <img src="star.png" id="star">
        <h5>${movie.vote_average.toFixed(1)}</h5>
    </div>
    <div class="date">
        <h5>${movie.release_date.slice(0, 4)}</h5>
    </div>
  </div>
    
  `
      )
      .join("")}`;
  } catch (error) {
    console.error(error);
  }
}
async function cast(value) {
  const castUrl = `https://api.themoviedb.org/3/movie/${value}/credits?api_key=752949372a73562bd9819c92c7949a71`;

  try {
    const response = await fetch(castUrl, options);
    const result = await response.json();

    const moviesWithPosters = result.cast.filter(
      (movie) => movie.profile_path != null
    );
    const limitedMoviesWithPosters = moviesWithPosters.slice(0, 12);

    cont.innerHTML += `<h1 class="cat">Cast</h1>`;
    cont.innerHTML += `${limitedMoviesWithPosters
      .map(
        (movie) => `
          
              <div class="movie-id" data-aos="fade-down">
            <img src="${imgUrl + "original/" + movie.profile_path}">
            <p class="movie-title">${movie.name}</p>
          
      
            </div>
            `
      )
      .join("")}`;
  } catch (error) {
    console.log(error);
  }
  recommended(value);
}

home();

