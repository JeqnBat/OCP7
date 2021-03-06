class Place {
  constructor(fromData, map, pano, service) {
    this.id = fromData.place_id
    this.name = fromData.name
    this.address = fromData.vicinity
    this.latLng = fromData.geometry.location
    this.averageScore = fromData.rating
    this.reviewsNb = fromData.user_ratings_total
    this.map = map
    this.pano = pano
    this.service = service
    this.reviews = []
    this.operator = new Operator()
    this.display = new Display()
    this.userEvent = new Event()
    // PREVENT BUG FROM PLACES WITH NO REVIEWS
    if (this.averageScore == null) {
      this.averageScore = 0
      return this.averageScore
    }
    // PLACE'S CALLS
    this.createMarker()
    this.userEvent.placeEvents(this, form[1].id, input[1].Class, input[1].id, error[1].msg, confirm[1].msg)
  }
// GMAP MARKERS CREATION _______________________________ */
  createMarker() {
    this.marker = new google.maps.Marker({
      position: this.latLng,
      map: this.map,
      title: this.name,
      visible: true,
      animation: google.maps.Animation.DROP,
      icon: marker.orange
    })
    this.infoWindow = new google.maps.InfoWindow({
      content: this.display.infoWindow(this)
    })
  }

}
