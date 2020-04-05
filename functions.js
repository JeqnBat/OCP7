$(function() {
  // Reçoit les objets map et StreetViewPanorama d'index.html
  localStorage.getItem('map', 'pano')
  let placesToEat = new Place()
  let data = []
  let allMarkers = []

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
    data         = await response.json()
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

  // ----------------------------- OBJETS ---------------------------------

  function main() {
    placesToEat.process(data)
    console.log(placesToEat.restaurants[1].lng)
    // 2. On génère TOUS les marqueurs à partir de l'array 'places' qui provient du JSON
    let markerPNG = 'png/marker.png'
    for (let i = 0; i < placesToEat.restaurants.length; i++) {
      let latLng = new google.maps.LatLng(placesToEat.restaurants[i].lat, placesToEat.restaurants[i].lng)
      let marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: placesToEat.restaurants[i].name,
        visible: true,
        animation: google.maps.Animation.DROP,
        icon: markerPNG
      })

    }
  }
  // ----------------------------- (2) APPELS -----------------------------
  const master = async () => {
    const waitData      = await getData()
    const locationRdy   = await geoLoc()
    const createObjects = await main()
  }

  master()

})
