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

  for (x = 0; x < 10; x++){

    contain = document.createElement("div")
    contain.style.display = "flex"

    favorite = document.createElement("button")
    favorite.setAttribute("class","favorite")
    star = document.createElement("i")
    star.setAttribute("class","fa fa-star")
    star.setAttribute("id","star")
    favorite.append(star)
    contain.appendChild(favorite)

    title = document.createElement('li')
    title.textContent = file.results[x].title
    title.setAttribute("class","listItem")
    title.style.padding = "3px"
    contain.appendChild(title)

    document.querySelector("#results").appendChild(contain)
  }

  $(".listItem").on("click",function(){
    renderimdb(this.textContent)
  })

  favorites()
}

function favorites(){
  $(".favorite").on("click",function(){

    if ($(this).css("background-color") == "rgb(239, 239, 239)"){
      $(this).css("background-color", "yellow")

      contain = document.createElement("div")
      contain.style.display = "flex"

      favorite = document.createElement("button")
      favorite.setAttribute("class","favorite")
      favorite.style.backgroundColor = "yellow"
      star = document.createElement("i")
      star.setAttribute("class","fa fa-star")
      star.setAttribute("id","star")
      favorite.append(star)
      contain.appendChild(favorite)

      title = document.createElement('li')
      title.textContent = $(this).parent().children()[1].textContent
      title.setAttribute("class","favoriteItem")
      title.style.padding = "3px"
      contain.appendChild(title)

      document.querySelector("#favorites").appendChild(contain)

    }

    else{
      $(this).css("background-color", "rgb(239, 239, 239)")

      favorties = $("#favorites").children()
      
      for (x = 0; x < favorties.length; x++){
        if (favorties[x].textContent == $(this).parent().children()[1].textContent){
          favorties[x].innerHTML = ""
        }
      }
    }

    $(".favoriteItem").on("click",function(){
      console.log("here here")
      renderimdb(this.textContent)
    })
  })
}

document.querySelector("#submit").addEventListener("click", function(){
  search()
})

// closing modal
var closeModal = document.querySelectorAll(".closemodal")

$(document).on('click', '.closemodal', function(){
  console.log("im closing");
  movieModal.classList.toggle("is-active");
})







