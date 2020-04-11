let map
let pano

//
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  })
  pano = new google.maps.StreetViewPanorama(document.getElementById('StreetView'), {
    position: {lat: 37.869260, lng: -122.254811},
    pov: {heading: 165, pitch: 0},
    zoom: 1,
  })

}

// Envoie les variables map & panorama dans le localStorage
localStorage.setItem('map', map, 'pano', pano)
