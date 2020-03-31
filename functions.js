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
    }
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
    // Display des data
    for (let i = 0; i < data.length; i++) {
      $('#two').append(`<div class="text" item="${i}">
      Nom : ${data[i].restaurantName}<br>
      Adresse : ${data[i].address}<br>
      <p class="averageRate"></p>
      <hr>`)
      // Nouvelle boucle pour process l'array dans l'array
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
    // __________ Partie 3.1 : Création d'un filtre basé sur les notes __________
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
  } // fin de processData()

  // __________ Partie 3.2 : Display des restaurants sur la Gmap __________
  // penser aux icônes une fois que ça marchera (une fois que ça marchera…)
  function displayGmap(data) {
    // 1. On stocke tous les marqueurs générés ici
    let allMarkers = []
    // 2. On génère TOUS les marqueurs à partir de l'array 'places' qui provient du JSON
    for (let i = 0; i < data.length; i++) {
      let latLng = new google.maps.LatLng(data[i].lat, data[i].long)
      let marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: data[i].restaurantName,
        visible: false
        //icon:
      })
      allMarkers.push(marker)
    }
    // 3. On crée une fonction qui renvoie TRUE si le marker est dans les limites visibles de la MAP
    function checkPos(marker) {
      return map.getBounds().contains(marker.getPosition())
    }
    // 4. On utilise un eventHandler pour MAJ la map à chaque "dragend"
    google.maps.event.addListener(map, 'dragend', function() {
      // 4.1 On boucle sur tous les marqueurs à la fin de chaque "dragend"
      for (let i = 0; i < allMarkers.length; i++) {
        // 4.2 Si l'un des marqueurs est dans les limites de la map on l'affiche, sinon non
        if (checkPos(allMarkers[i]) == true) {
          allMarkers[i].setVisible(true)
        } else {
          allMarkers[i].setVisible(false)
        }
      }
    }) // fin du event handler
  }
  // ----------------------------- (2) APPELS -----------------------------
  const master = async () => {
    const geoLocRdy = await geoLoc()
    const dataRdy = await getData()
    processData(places)
    displayGmap(places)
  }

  master()

});
