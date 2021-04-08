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
  
  for (x = 0; x < file.results.length; x++){

    var title = document.createElement('li')
    title.textContent = file.results[x].title
    title.setAttribute("class","listItem")
    title.style.padding = "3px"
    favorite = document.createElement("button")
    contain = document.createElement("div")

    contain.style.display = "flex"

    favorite.setAttribute("class","favorite")
    star = document.createElement("i")
    star.setAttribute("class","fa fa-star")
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
}

document.querySelector("#submit").addEventListener("click", function(){
  search()
})

// closing modal
var closeModal = document.querySelectorAll(".closemodal")

$(document).on('click', '.closemodal', function(){
  movieModal.classList.toggle("is-active");
})

function uniq(a) {
  return Array.from(new Set(a));
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







