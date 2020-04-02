$(function() {
  // Reçoit les objets map et StreetViewPanorama d'index.html
  localStorage.getItem('map', 'pano')

  let places = []
  let allRates = []
  let allMarkers = []
  let pos = {}

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
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    map.setCenter(pos) // update la map avec la position reçue
    map.setZoom(16)
    pano.setPosition(pos)
  }
  function geoLocError(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`)
  }

  // __________ Partie 3 : Display des restaurants sur la Gmap __________
  function updateGmap(data) {
    let markerPNG = 'png/marker.png'
    let averageRate = 0
    // 2. On génère TOUS les marqueurs à partir de l'array 'places' qui provient du JSON
    for (let i = 0; i < data.length; i++) {
      let latLng = new google.maps.LatLng(data[i].lat, data[i].long)
      let marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: data[i].restaurantName,
        visible: false,
        animation: google.maps.Animation.DROP,
        icon: markerPNG
      })
      // Calcul de la moyenne (qui pourra être une fonction appélée ici pour factoriser)
      let sum = 0
      let denominator = data[i].ratings.length
      for (let j = 0; j < denominator; j++) {
        sum += data[i].ratings[j].stars
      }
      averageRate = sum / denominator
      allRates.push(averageRate)
      sum = 0

      showMarkerDetails(marker) // On appelle la gestion d'événements à l'intérieur de chaque marqueur
      // On envoie tous les markers dans l'array allMarkers
      allMarkers.push(marker)


    }
    // 3 Gestion événementielle des markers
    function showMarkerDetails(marker) {
      let infowindow = new google.maps.InfoWindow({
        content: marker.title
      })
      // 3.1 Onclick
      marker.addListener('click', function() {
        // 3.1.1 Identifier le marker cliqué dans l'array des restaurants
        let n = 0
          while (marker.title != data[n].restaurantName) {
              n++
          }
        // 3.1.2 vérifier que la fiche restaurant n'a pas déjà été APPEND dans #two
        if ($('#two').html().indexOf(`${data[n].restaurantName}`) == -1) {
          // passer 'n' au code pour obtenir toutes les infos
          $('#two').append(`<div class="text" item="${data[n].restaurantName}">
          Nom : ${data[n].restaurantName}<br>
          Adresse : ${data[n].address}<br>
          <p class="averageRate">Note moyenne : ${allRates[n]}</p>
          <hr>`)
          // Nouvelle boucle pour process l'array dans l'array
          for (let j = 0; j < data[n].ratings.length; j++) {
            $('[item]:last').append(
            `Commentaire : ${data[n].ratings[j].comment}<br>
            Note : ${data[n].ratings[j].stars}<br>
            <br>
            </div>`)
          }
        } else {
          // rajouter toggle plus tard via CSS pour montrer que le resto est déjà là
        }
        // StreetViewPanorama update
        latLng = new google.maps.LatLng(data[n].lat, data[n].long)
        pano.setPosition(latLng)
      })
      // 3.2 Mouseover
      marker.addListener('mouseover', function() {
        infowindow.open(marker.get('map'), marker)
      })
      marker.addListener('mouseout', function() {
        infowindow.close()
      })
    }

    // 4. On crée une fonction qui renvoie TRUE si le marker est dans les limites visibles de la MAP
    function checkPos(marker) {
      return map.getBounds().contains(marker.getPosition())
    }
    // 5. On utilise un eventHandler pour MAJ la map à chaque "dragend"
    google.maps.event.addListener(map, 'dragend', function() {
      // 5.1 On boucle sur tous les marqueurs à la fin de chaque "dragend"
      for (let i = 0; i < allMarkers.length; i++) {
        // 5.2 Si l'un des marqueurs est dans les limites de la map on l'affiche, sinon non
        if (checkPos(allMarkers[i]) == true) {
          allMarkers[i].setVisible(true)
        } else {
          allMarkers[i].setVisible(false)
        }
      }
    })
  }
  // __________ Partie 4 : Création d'un filtre basé sur les notes __________
  // stocker la valeur des deux input number
  let minRate = $('#minRate').val()
  let maxRate = $('#maxRate').val()

  function filterByRate(data) {
    for (let i = 0; i < allRates.length; i++) {
      if (allRates[i] >= minRate && allRates[i] <= maxRate) { // factoriser cette ligne ?? (allRatesx2)
        $(`[item=${data[i].restaurantName}]`).css('display', '')
        allMarkers[i].setVisible(true)
      } else {
        $(`[item=${data[i].restaurantName}]`).css('display', 'none')
        allMarkers[i].setVisible(false)
      }
    }
  }
  // Event handler : MAJ les notes en cliquant sur "Filtrer" puis compute les nouvelles notes et les renvoie
  $('#filter').click(function() {
    minRate = $('#minRate').val()
    maxRate = $('#maxRate').val()
    filterByRate(places)
  })

  // ----------------------------- (2) APPELS -----------------------------
  const master = async () => {
    const geoLocRdy = await geoLoc()
    const dataRdy = await getData()
    updateGmap(places)
  }

  master()

});
