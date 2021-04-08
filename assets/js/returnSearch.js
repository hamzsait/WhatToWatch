var posterSection = document.getElementById('postersection');
var movieTitle = document.getElementById('movietitle');
var releaseYear = document.getElementById('releaseyear');
var movieGenre = document.getElementById('genre');
var rating = document.getElementById('rated');
var plot = document.getElementById('plot');
var movieReviews = document.getElementById('reviews');
var movieModal = document.getElementById('movieDisplay');

// var movie = {submitmovie}.value.trim();

function renderimdb(title){
    movieModal.classList.toggle("is-active");
    posterSection.innerHTML = ''
    var imdbSearch = `http://www.omdbapi.com/?apikey=1ac23809&t=`+title
    fetch(imdbSearch)
    .then (function(response){
        return response.json();
    })
    .then (function(data){
        var img = document.createElement('img');
        img.src = data.Poster;
        posterSection.append(img)
        movieTitle.textContent = data.Title;
        releaseYear.textContent = `(${data.Year})`;
        console.log(data.Year);
        movieGenre.textContent = data.Genre;
        rating.textContent = data.Rated;
        plot.textContent = data.Plot;
    })
}

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


function search (){

  requestURL = String("https://api.themoviedb.org/3/search/movie?api_key=230e89ce98b6d55971d6dd92298b9018&query=" + document.getElementById("search").value)
  fetch(requestURL, requestOptions)
    .then(response => response.text())
    .then(result => displayText(JSON.parse(result)))
    .catch(error => console.log('error', error));
}


function displayText(file){

  parent = document.querySelector("#results")

  parent.innerHTML = ""

  for (x = 0; x < file.results.length; x++){
    title = document.createElement('li')
    title.textContent = file.results[x].title
    title.setAttribute("class","listItem")
    document.querySelector("#results").appendChild(title)
    console.log(this.results[x])
  }

  $(".listItem").on("click",function(){
    renderimdb(this.textContent)
  })
  ;
}

document.querySelector("#submit").addEventListener("click", function(){
  search()
})

// closing modal
var closeModal = document.querySelectorAll(".closemodal")

$(document).on('click', '.closemodal', function(){
  console.log("im closing");
  movieModal.classList.toggle("is-active");
});


  //random button
function randomIDGenerator (){
    var idLength = Math.floor(Math.random() * Math.floor(6));
    var randomID= [];
    var temp = (Math.floor(Math.random() * Math.floor(9))) + 1;
    randomID.push(temp)
    for (i = 0; i < idLength; i++) {
      temp = Math.floor(Math.random() * Math.floor(10));
      randomID.push(temp);
    }
    randomID = randomID.join("")
    return randomID
  }



function randomMovieGenerator() {
  var tempID = randomIDGenerator();
  var randomFetch = `https://api.themoviedb.org/3/movie/${tempID}?api_key=230e89ce98b6d55971d6dd92298b9018&language=en-US`
  fetch(randomFetch)
  .then(function(response){
    return response.json();
  })
  .then (function(data){
    console.log(data.title);
    renderimdb(data.title)
  })
}

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000);
   // Change image every 2 seconds
};

