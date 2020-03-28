$(function() {
  // __________ Partie 1 : Appel de l'API des restaurants __________
  ////////////////////////////////////////////////////////////////////////////
  // Méthode 1 - Ajax -

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
  ////////////////////////////////////////////////////////////////////////////


  // __________ créer une fonction init qui doit : __________
  //            .synchroniser toutes les fonctions dans la bonne séquence
  //            .await-async le fetch
  //            .préparer la suite du programme

  let restaurants = {} // Créer l'objet qui va accueillir les data du JSON
  // Enchâsser l'appel API dans une fonction ASYNC pour le faire passer en SYNC et l'intégrer dans la séquence d'init
  const init = async () => {
    // Définition des 2 arguments de fetch()
    let customInit =  { method: 'GET',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        mode: 'no-cors',
                        cache: 'default'
                      }

    let jsonFile = 'http://127.0.0.1/OCP7/json.json'
    // Création de la requête
    let response = await fetch(jsonFile, customInit)
    let data = await response.json()
    let restaurants = data // on stocke le retour du JSON dans l'objet restaurants
    console.log(data)
    console.log(restaurants.length)
    console.log(restaurants[0].restaurantName)

    // dois-je écrire tout mon programme ici ?
  }

  init()
  // Méthode 2 - Fetch
//   let customInit =  { method: 'GET',
//                       headers: {
//                         'Content-Type': 'application/json'
//                       },
//                       mode: 'no-cors',
//                       cache: 'default'
//                     }
//
//   let jsonFile = 'http://127.0.0.1/OCP7/json.json'
//
// // Ce fetch est asynchrone, OR, il doit être synchrone et s'inscrire dans la séquence d'initialisation
//   fetch(jsonFile, customInit)
//     .then(res => {
//       if(res.ok) {
//         return res.json ()
//       } else {
//         throw new Error('ERROR')
//       }
//     })
//     .then(data => {
//       restaurants = data // On stocke le data du JSON dans un objet
//       console.log(restaurants.length)
//       console.log(restaurants[0].restaurantName)
//     })
//     .catch(error => console.log('ERROR'))

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
    localStorage.getItem('map') // reçoit l'objet map d'index.html
    map.setCenter(pos) // update la map avec la position reçue
    map.setZoom(16)
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


  // __________Partie 3 : Display des restaurants du JSON sur la map__________

geoLoc()

// 1. récupérer le length de mon array restaurants
// 2. créer une boucle sur la longueur de cet arret en i++
// 3. pour chaque tour de boucle, append le DOM dans la div dédiée, avec toutes les infos du resto


});
