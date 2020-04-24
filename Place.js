class Place {
  constructor(placeData, map, pano, service) {
    this.id = placeData.place_id // pour hook la requête getDetails() au click
    this.name = placeData.name
    this.address = placeData.vicinity
    this.latLng = placeData.geometry.location
    this.averageScore = placeData.rating
    this.reviewsNb = placeData.user_ratings_total
    this.reviews = []
    this.map = map
    this.pano = pano
    this.service = service
    this.operator = new Operator()
    this.display = new Display()
    this.userEvent = new Event()
    // PLACE'S CALLS
    this.createMarker()
    this.userEvent.placeEvents(this, form[1].id, input[1].Class, input[1].id, error[1].msg, confirm[1].msg)
  }
// GMAP MARKERS CREATION _____________________________ */
  createMarker() {
    let placeMarker = this.marker
    this.marker = new google.maps.Marker({
      position: this.latLng,
      map: this.map,
      title: this.name,
      visible: true,
      animation: google.maps.Animation.DROP,
      icon: marker.orange
    })
    // INFOWINDOW
    this.infoWindow = new google.maps.InfoWindow({
      content: this.display.infoWindow(this)
    })
    // ONCLICK
    this.userEvent.markerClick(this)
    // MOUSEOVER
    this.userEvent.markerMouseOver(this)
  }

}
