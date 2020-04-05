class Gmap {
  constructor() {
    this.markers = []
  }

  createMarker(number, place) {
    let pR = place.restaurants
    let markerPNG = 'png/marker.png'
    for (let i = 0; i < number; i++) {
      let latLng = new google.maps.LatLng(pR[i].lat, pR[i].lng)
      let marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: pR[i].name,
        visible: true,
        animation: google.maps.Animation.DROP,
        icon: markerPNG
      })
      // infowindow sur chaque marker
      let infowindow = new google.maps.InfoWindow({
        content: marker.title // possible de rajouter des éléments du DOM ici pour customiser l'infowindow+tard
      })
      // click envoyé sur chaque marker
      marker.addListener('click', function() {
        pR[i].showDetails()
        latLng = new google.maps.LatLng(pR[i].lat, pR[i].lng)
        pano.setPosition(latLng)
      })
      marker.addListener('mouseover', function() {
        infowindow.open(marker.get('map'), marker)
      })
      marker.addListener('mouseout', function() {
        infowindow.close()
      })
      this.markers.push(marker)
    }
  }

  isVisible(place) {
    let pR = place.restaurants
    let classeInstance = this
    function inBounds(marker) {
      return map.getBounds().contains(marker.getPosition())
    }

    // for (let i = 0; i < classeInstance.markers.length; i++) {
    //   if (inBounds(classeInstance.markers[i]) == true) {
    //     classeInstance.markers[i].setVisible(true)
    //     pR[i].showMiniature(pR[i].name, pR[i].address, pR[i].averageRating)
    //   }
    // }

    google.maps.event.addListener(map, 'dragend', function() {
      for (let i = 0; i < classeInstance.markers.length; i++) {
        if (inBounds(classeInstance.markers[i]) == true) {
          classeInstance.markers[i].setVisible(true)
          if ($('#content').children().hasClass('cover') == true) {
            pR[i].hideMiniature(pR[i].name)
          } else {
            pR[i].showMiniature(pR[i].name, pR[i].address, pR[i].averageRating)
          }
        } else {
          classeInstance.markers[i].setVisible(false)
          pR[i].hideMiniature(pR[i].name)
        }
      }
    })
  }

}
