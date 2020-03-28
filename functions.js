$(function() {
/* Proposition pour la STRUCTURE du programme :
    .Une fonction async 'MASTER' qui appelle toutes les autres fonctions dans le bon ordre
        ---- Bloc asynchrone ----
        const master = async() {
              await init() {}
              await geoLoc() {}

              etc.
        }
        ---- Appel ----
        master()
        DOM()
*/
let restaurants = {}
  // ----------------------------- (1) BLOC ASYNCHRONE -----------------------------
  const master = async () => {
    // __________ Partie 1 : Appel de l'API des restaurants __________
    // Enchâsser l'appel API dans une fonction ASYNC
  const getData = async () => {
      // Premier Paramètre de fetch
      let customInit =  { method: 'GET',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          mode:   'no-cors',
                          cache:  'default'
                        }
      // Second paramètre de fetch
      let jsonFile = 'http://127.0.0.1/OCP7/json.json'
      let response = await fetch(jsonFile, customInit)
      let data     = await response.json()
      let places   = data
      
      processData(places)
    }

    // __________ Partie 2 : Géo localisation __________
    function geoLoc() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(userPosition, geoLocError)
      } else {
        // ...
      }
    }

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
      console.warn(`ERREUR (${err.code}): ${err.message}`)
    }

  // __________ Partie 3 : Display des restaurants du JSON sur la map __________
  // 1. récupérer le length de mon array restaurants
  // 2. créer une boucle sur la longueur de cet arret en i++ (ou un foreach)
  // 3. pour chaque tour de boucle, append le DOM dans la div dédiée, avec toutes les infos du resto
  // j'ai besoin qu'init() soit fini pour accéder aux restaurants : comment faire savoir qd c'est fini ?

    function processData(data) {
      for (let i = 0; i < data.length; i++) { // forEach ?
        $('#two').append(`<div class="text" item="${i}">
        Nom : ${data[i].restaurantName}<br>
        Adresse : ${data[i].address}<br>
        <hr>`)

        for (let j = 0; j < data[i].ratings.length; j++) {
          $(`[item = ${i}]`).append(
          `Note : ${data[i].ratings[j].stars}<br>
          Commentaire : ${data[i].ratings[j].comment}<br>
          </div>`)
        }
      }

    }// moyenne : il faut accéder à la longueur de ratings pour savoir le dénominateur
    // additionner les ratings et les diviser par la length de ratings


  // ----------------------------- (2) APPELS -----------------------------
    const allCalls = async () => {
      const a = await geoLoc()
      const b = await getData()
    }

    allCalls()

  } // fin de la fonction Master()

  master()

});
