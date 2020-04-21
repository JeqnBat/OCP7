class Place {
  constructor(placeData, map, pano) {
    this.name = placeData.restaurantName
    this.address = placeData.address
    this.lat = placeData.lat
    this.lng = placeData.long
    this.ratings = placeData.ratings
    this.map = map
    this.pano = pano
    this.operator = new Operator()
    // Trim place's name to avoid conflict with whitespaces
    let itemName = placeData.restaurantName
    this.itemName = itemName.replace(/\s+/g, '')
    // PLACE'S AVERAGESCORE CALCULATION
    this.averageScore = this.operator.renderScore(this)
    this.display = new Display()
    this.userEvent = new Event()
    // PLACE'S CALLS
    this.createMarker()
    this.userEvent.placeEvents(this, form[1].id, input[1].Class, input[1].id, error[1].msg, confirm[1].msg)
  }
// GMAP MARKERS CREATION _____________________________ */
  createMarker() {
    let latLng = new google.maps.LatLng(this.lat, this.lng)
    let placeMarker = this.marker
    this.marker = new google.maps.Marker({
      position: latLng,
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
