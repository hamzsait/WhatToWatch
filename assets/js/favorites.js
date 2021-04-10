var list = document.getElementById("results")
var posterSection = document.getElementById('postersection');
var movieTitle = document.getElementById('movietitle');
var releaseYear = document.getElementById('releaseyear');
var movieGenre = document.getElementById('genre');
var rating = document.getElementById('rated');
var plot = document.getElementById('plot');
var movieReviews = document.getElementById('reviews');
var movieModal = document.getElementById('movieDisplay');

if ((localStorage.getItem("favorites") !== null)){
    if ((localStorage.getItem("favorites").length !== 0)){
        file = (localStorage.getItem("favorites").split(","))

        for (x = 0; x < file.length; x++){

            if(file[x] == ""){
                continue
            }

            var title = document.createElement('li')
            var contain = document.createElement("div")
            var favorite = document.createElement("button")

            contain.style.display = "flex"
            contain.style.margin = "5px"

            title.textContent = file[x]
            title.setAttribute("class","listItem")
            title.style.padding = "3px"
        
            favorite.setAttribute("class","favorite")
            favorite.style.backgroundColor = "yellow"

            star = document.createElement("i")
            star.setAttribute("class","fa fa-star")
            star.setAttribute("id","star")
        
            favorite.append(star)
            contain.appendChild(favorite)
            contain.appendChild(title)
        
            document.querySelector("#results").appendChild(contain)
        }
        
        $(".favorite").on("click",function(){
            target = ($(this).parent().children()[1].outerText)
            favoriteList = (localStorage.getItem("favorites").split(","))

            for (x = 0 ; x<favoriteList.length; x++){
                if (favoriteList[x] == target){
                favoriteList.splice(x,1)
                }
            }
            localStorage.setItem("favorites",favoriteList)
            location.reload()
        })

        $(".listItem").on("click",function(){
            renderimdb(this.textContent)
        })

    }
    else{
        document.getElementById("title").textContent = "No favorites selected!"
    }
}
else{
    document.getElementById("title").textContent = "No favorites selected!"
}

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
    

var closeModal = document.querySelectorAll(".closemodal")

$(document).on('click', '.closemodal', function(){
  movieModal.classList.toggle("is-active");
})

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
    renderimdb(data.title)
  })
}

randomMovie.addEventListener("click",randomMovieGenerator)




function assignImages(){
try{
    listy = localStorage.getItem("favorites").split(",")


    for(x = 0; x<listy.length-1;x++){
      
            requestURL = "https://api.themoviedb.org/3/search/movie?api_key=230e89ce98b6d55971d6dd92298b9018&query=" + listy[x]
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
    console.log(document.getElementsByClassName("mySlides").item(0))
    console.log(document.getElementsByClassName("mySlides"))
}
catch{
    console.log("nope")
}
}
assignImages()