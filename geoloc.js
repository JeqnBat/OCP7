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
  map.setZoom(17)
  pano.setPosition(pos)
}
function geoLocError(err) {
  console.warn(`ERREUR (${err.code}): ${err.message}`)
}
