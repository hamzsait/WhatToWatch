var posterSection = document.getElementById('postersection');
var movieTitle = document.getElementById('movietitle');
var releaseYear = document.getElementById('releaseyear');
var movieGenre = document.getElementById('genre');
var rating = document.getElementById('rated');
var plot = document.getElementById('plot');
var movieReviews = document.getElementById('reviews');

// var movie = {submitmovie}.value.trim();

function renderimdb(){
    var imdbSearch = `http://www.omdbapi.com/?apikey=1ac23809&t=Clueless`
    fetch(imdbSearch)
    .then (function(response){
        return response.json();
    })
    .then (function(data){
        console.log(data);
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
renderimdb();
