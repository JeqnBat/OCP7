$(function() {

  // __________Partie 1 : Appel de l'API des restaurants__________
  // Méthode 1 - Ajax
  // var settings = {
  //   "url": "http://127.0.0.1/OCP7/json.json",
  //   "method": "GET",
  //   "timeout": 0,
  // };
  //
  // $.ajax(settings).done(function (response) {
  //   console.log(response);
  // });

  // Méthode 3 - avec Json.parse()
  // var myObj = JSON.parse(jsonFile);
  // document.getElementById("right").innerHTML = myObj.restaurant[0].address;

  // utiliser typeof pour vérifier si c'est un objet

  // Méthode 2 - Fetch
  let customInit =  { method: 'GET',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      mode: 'no-cors',
                      cache: 'default'
                    }

  let jsonFile = 'http://127.0.0.1/OCP7/json.json'

  fetch(jsonFile, customInit)
    .then(function(resp) {
      return resp.json()
    })
    .then(function(data) {
      console.log(data)
      console.log(data.restaurant[0].address)
    });

  // Méthode 2bis - Fetch avec fonctions fléchées
  // fetch(jsonFile, {mode: 'no-cors'})
  //   .then(response => {
  //     response.json()
  //   })
  //   .then(data => {
  //     console.log()
  //   })
  //   .catch(err => {
  //     console.log()
  //   });


  // __________Partie 2 : Géo localisation__________
  function userPosition(position) {
    let pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    localStorage.getItem('map', map) // reçoit l'objet map d'index.html
    map.setCenter(pos) // update la map avec la position reçue
    map.setZoom(15)
  }

  function geoLocError(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`) // ${ } utilisé pour faire de la concaténation + +
  }

  function geoLoc() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(userPosition, geoLocError)
      } else {
        // ...
      }
  }

  geoLoc()


});
