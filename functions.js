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
                    };

  let jsonFile = 'http://127.0.0.1/OCP7/json.json';

  fetch(jsonFile, customInit)
    .then(function(resp) {
      return resp.json();
    })
    .then(function(data) {
      console.log(data);
      console.log(data.restaurant[0].address);
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

  // __________Partie 2 : Appel de l'API des restaurants__________
  function geoLoc() {
    function sortLongLat(ip) {
      // GeoLoc - Partie 2 - Passer l'IP du user à l'API ipstack & stocker sa latitude & longitude
      fetch('http://api.ipstack.com/' + ip + '?access_key=c8d9b4cb9b996824a9660a661545ab41')
        .then(function(resp) {
          return resp.json();
        })
        .then(function(data) {
          console.log(data.longitude);
          console.log(data.latitude);
          console.log(data);
          let longitude = data.longitude;
          let latitude = data.latitude;
        });
      }

      $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
        let toto = data.indexOf('ip=')+3;
        let tata = data.indexOf('ts=');
        console.log(toto);
        console.log(tata);
        let ip = data.substring(toto, tata);
        console.log(ip);
        sortLongLat(ip);
      });
    }

    // geoLoc();

    function userPosition(position) {
      console.log(position);
    }

    function geoLocError(err) {
      console.warn(`ERREUR (${err.code}): ${err.message}`); // ${ } utilisé pour faire de la concaténation + +
    }

    function geoLoc2() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(userPosition, geoLocError);
      }
    }

    geoLoc2();

  // réfléchit :
  // 1. je sélectionne ip= comme point de départ et je dis
  // tant qu'on est pas arrivé à ts, copie la string dans la variable IP
  // ok step by step

});
