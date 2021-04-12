var posterSection = document.getElementById('postersection');
var movieTitle = document.getElementById('movietitle');
var releaseYear = document.getElementById('releaseyear');
var movieGenre = document.getElementById('genre');
var rating = document.getElementById('rated');
var plot = document.getElementById('plot');
var movieReviews = document.getElementById('reviews');
var movieModal = document.getElementById('movieDisplay');
var randomMovie = document.getElementById('randomMovie')
// var movie = {submitmovie}.value.trim();

function renderimdb(title){
    movieModal.classList.toggle("is-active");
    posterSection.innerHTML = ''
    var imdbSearch = `https://www.omdbapi.com/?apikey=1ac23809&t=`+title
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

  try {
    local = (localStorage.getItem("favorites").split(","))
  }
  catch {
    local = []
  }
  
  results = []
  var lengthy 

  if (file.results.length > 10){
      lengthy = 10
  }
  else{
    lengthy = file.results.length
  }

  for (x = 0; x < lengthy; x++){
    if (results.includes(file.results[x].title)){
      results.push(file.results[x].title)
      continue
    }
    results.push(file.results[x].title)
    var title = document.createElement('li')
    title.textContent = file.results[x].title
    title.setAttribute("class","listItem")
    title.style.padding = "3px"
    favorite = document.createElement("button")
    contain = document.createElement("div")

    contain.style.display = "flex"
    contain.style.margin = "5px"

    favorite.setAttribute("class","favorite")
    star = document.createElement("i")
    star.setAttribute("class","fa fa-star hi")
    star.setAttribute("id","star")

    if (local.includes(title.textContent)){
      $(favorite).css("background-color", "yellow")
    }

    favorite.append(star)
    contain.appendChild(favorite)
    contain.appendChild(title)

    document.querySelector("#results").appendChild(contain)
  }

  $(".listItem").on("click",function(){
    renderimdb(this.textContent)
  })

  favorites()
  assignImages()
}

try{
document.querySelector("#submit").addEventListener("click", function(){
  search()
})
}
catch{
  console.log("No submit button")
}

// closing modal
var closeModal = document.querySelectorAll(".closemodal")

$(document).on('click', '.closemodal', function(){
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

function favorites(){
  $(".favorite").on("click",function(){
    if ($(this).css("background-color") == "rgb(239, 239, 239)"){
      $(this).css("background-color", "yellow")
      updateLocalStorage(this, true)
    }
    else{
      $(this).css("background-color", "rgb(239, 239, 239)")
        updateLocalStorage(this, false)
      }
    })
  }

function updateLocalStorage(start, selected){

    if(selected){
      if (localStorage.getItem("favorites") !== null){
        var movies = []
        movies.push(($(start).parent().children()[1].outerText))
        movies.push((localStorage.getItem("favorites")).split(','))
        localStorage.setItem("favorites",movies)
      }
      else{
        var movies = []
        movies.push($(start).parent().children()[1].outerText)
        localStorage.setItem("favorites",movies)
      }
    }
    else{
      target = ($(start).parent().children()[1].outerText)
      favoriteList = (localStorage.getItem("favorites").split(","))

      for (x = 0 ; x<favoriteList.length; x++){
        if (favoriteList[x] == target){
          favoriteList.splice(x,1)
        }
      }
      localStorage.setItem("favorites",favoriteList)
    }
}

randomMovie.addEventListener("click",randomMovieGenerator)

function assignImages(){

  

  try{

      results = document.getElementById("results")

      results = [...results.children]
      listy = []
      results.forEach(function(slides){
        listy.push(slides.innerText)
      })

      document.querySelector("#slideshowcontainer").innerHTML = ""
      i = 0
  
      for(x = 0; x<listy.length-1;x++){
              requestURL = "https://api.themoviedb.org/3/search/movie?api_key=230e89ce98b6d55971d6dd92298b9018&query=" + listy[x];
              var requestOptions = {
              method: 'GET',
              redirect: 'follow'
              };
          fetch(requestURL, requestOptions)
              .then(function(response){return response.text()})
              .then(function(result){
                  var items = JSON.parse(result)
                  newImage = document.createElement("img")
                  newImage.src = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2" + items.results[0].poster_path
                  container = document.createElement("div")
                  container.setAttribute("class", "mySlides fade column-is-half")
  
                  container.appendChild(newImage)
                  document.getElementById("slideshowcontainer").appendChild(container)
              })
      }
    index = 0
    myLoop(false)
  }
  catch(ex){
      console.log(ex)
  }
  }

                  
  var index = 0; 
  timer = 300
  function myLoop(running) {
      var slides = document.getElementsByClassName("mySlides")
      if (index !== 0){
          clearTimeout(base)
      }
      if(running){
        timer = 3000
      }
      base = setTimeout(function() {
          for(x = 0; x < slides.length; x++){
              slides[x].style.display = "none"
          }
          slides[index % slides.length].style.display = 'block' 
          index++
          myLoop(true)                 
      }, timer)
  }

