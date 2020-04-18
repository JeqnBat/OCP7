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
    // PLACE'S AVERAGESCORE CALCULATION
    this.averageScore = this.operator.renderScore(this.ratings, this.averageScore)
    this.display = new Display()
    this.events = new Event()

    this.createMarker()
    this.events.allEvents(this.marker, this.name, this.address, this.ratings, this.averageScore, this.lat, this.lng, this.map, this.pano, this.infoWindow)
  }

// GMAP MARKERS CREATION _____________________________*/
  createMarker() {
    let latLng  = new google.maps.LatLng(this.lat, this.lng)
    let marker  = this.marker
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
