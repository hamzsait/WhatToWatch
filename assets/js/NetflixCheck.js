var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://api.themoviedb.org/3/movie/550?api_key=230e89ce98b6d55971d6dd92298b9018", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));