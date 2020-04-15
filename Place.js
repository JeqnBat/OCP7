class Place {
  constructor(name, address, lat, lng, ratings, map, pano) {
    this.name = name
    this.address = address
    this.lat = lat
    this.lng = lng
    this.ratings = ratings
    this.map = map
    this.pano = pano
    this.operator = new Operator()
// CALCUL DE LA MOYENNE DU RESTAURANT ______________*/
    this.averageScore = this.operator.renderScore(this.ratings, this.averageScore)
    this.display = new Display()
    this.events = new Event()

    this.createMarker()
    this.events.scoreFilterClick(this.averageScore, this.marker, this.map, this.name, this.address, this.ratings)
    this.events.mapFilterDrag(this.averageScore, this.marker, this.map, this.name, this.address, this.ratings)
    this.events.miniatureClick(this.name, this.address, this.ratings, this.averageScore, this.lat, this.lng, this.pano)
    this.events.addCommentClick(this.name)
    this.events.postCommentClick(this.name, this.ratings, this.averageScore, this.address, this.infoWindow)
    this.events.backToNavClick(this.averageScore, this.marker, this.map, this.name, this.address, this.ratings)
  }

// CRÉATION DES MARKERS GMAP _______________________*/
  createMarker() {
    let latLng  = new google.maps.LatLng(this.lat, this.lng)
    // let marker  = this.marker
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: this.name,
      visible: true,
      animation: google.maps.Animation.DROP,
      icon: markerPNG
    })
    // INFOWINDOW
    this.infoWindow = new google.maps.InfoWindow({
      content: this.display.infoWindow(this.name, this.averageScore, this.ratings, this.address)
    })
    // ONCLICK
    this.events.markerClick(this.marker, this.name, this.address, this.ratings, this.averageScore, this.lat, this.lng, this.pano)
    // MOUSEOVER
    this.events.markerMouseOver(this.marker, this.infoWindow)

  }

}
