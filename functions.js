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
  let places = []
  let allRates = []
  localStorage.getItem('map') // Reçoit l'objet map d'index.html
  // ----------------------------- (1) BLOC ASYNCHRONE -----------------------------
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
    places       = await response.json()
    // places       = data // autre possibilité de retrieve les data
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

    map.setCenter(pos) // update la map avec la position reçue
    map.setZoom(16)
  }

  function geoLocError(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`)
  }

  // __________ Partie 3.0 : Display des restaurants du JSON __________
  // I. Display des infos dans le DOM
  function processData(data) {
    // Calcul de la moyenne(1) - déclaration des variables
    let sum = 0
    let averageRate = 0
    // Display des data(1)
    for (let i = 0; i < data.length; i++) {
      $('#two').append(`<div class="text" item="${i}">
      Nom : ${data[i].restaurantName}<br>
      Adresse : ${data[i].address}<br>
      <p class="averageRate"></p>
      <hr>`)
      // Display des data(2) - détails
      for (let j = 0; j < data[i].ratings.length; j++) {
        $(`[item = ${i}]`).append(
        `Note : ${data[i].ratings[j].stars}<br>
        Commentaire : ${data[i].ratings[j].comment}<br>
        </div>`)
        // Calcul de la moyenne(2) - stockage de la somme
        sum += data[i].ratings[j].stars
      }
      // Calcul de la moyenne(3) - computation & affichage
      let denominator = data[i].ratings.length
      let averageRate = sum / denominator
      allRates.push(averageRate)
      sum = 0

      $('.averageRate:last').append(`Note moyenne : ${averageRate}`)
    }
    // __________ Partie 3.1 : Création d'un filtre de notes __________
    // stocker la valeur des deux input number
    let minRate = $('#minRate').val()
    let maxRate = $('#maxRate').val()

    function filterByRate() {
      for (let i = 0; i < allRates.length; i++) {
        if (allRates[i] >= minRate && allRates[i] <= maxRate) { // factoriser cette ligne ?? (allRatesx2)
          $(`[item = ${i}]`).css('display', '')
        } else {
          $(`[item = ${i}]`).css('display', 'none')
        }
      }
    }
    // Event handler : MAJ les notes en cliquant sur "Filtrer" puis compute les nouvelles notes et les renvoie
    $('#filter').click(function() {
      minRate = $('#minRate').val()
      maxRate = $('#maxRate').val()
      filterByRate()
    })
    // __________ Partie 3.2 : Display des restaurants sur la Gmap __________
    // penser aux icônes une fois que ça marchera (une fois que ça marchera…)

    // 1. voici le code pour intégrer une nouvelle 'place' à ma Gmap
    // 2. créer une boucle pour de faire tous les restaurants de la liste
    for (let i = 0; i < data.length; i++) {
      let myLatLng = new google.maps.LatLng(data[i].lat, data[i].long) // on récupère les coords de chaque restaurant
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: data[0].restaurantName
        // icon:
      })
    }

  }


  // ----------------------------- (2) APPELS -----------------------------
  const master = async () => {
    const geoLocRdy = await geoLoc()
    const dataRdy = await getData()
    const placesRdy = await processData(places)

  }

  master()

});
