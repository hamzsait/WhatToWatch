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
  }

  $(".listItem").on("click",function(){
    console.log(this.textContent)
  })

}

document.querySelector("#submit").addEventListener("click", function(){
  search()
})







