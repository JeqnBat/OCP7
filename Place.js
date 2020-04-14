class Place {
  constructor(name, address, lat, lng, ratings, map, pano) {
    this.name = name
    this.address = address
    this.lat = lat
    this.lng = lng
    this.ratings = ratings
    this.averageScore = 0
    this.map = map
    this.pano = pano
    this.marker = ''
    this.infowindow = ''
    this.display = new Display()
    this.events = new Event()

    this.renderScore()
    this.createMarker()
    this.display.showMiniature(this.name, this.address)
    this.display.showStars(this.name, this.averageScore, this.ratings.length)
    this.events.miniatureClick(this.name, this.address, this.ratings.length, this.ratings, this.averageScore)
  }
// CALCUL DE LA MOYENNE DU RESTAURANT ______________*/
  renderScore() {
    let sum = 0
    for (let i = 0; i < this.ratings.length; i++) {
      sum += this.ratings[i].stars
    }
    this.averageScore = (sum / this.ratings.length).toFixed(1)
  }
// CRÉATION DES MARKERS GMAP _______________________*/
  createMarker() {
    // let classInstance = this
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
    let infoWindow = this.infoWindow
    this.infoWindow = new google.maps.InfoWindow({
      content: this.display.infoWindow(this.name, this.averageScore, this.ratings.length, this.address)
    })
    // ONCLICK
    this.events.markerClick(this.marker, this.name, this.address, this.ratings.length, this.ratings, this.averageScore, this.lat, this.lng, this.pano)
    // MOUSEOVER
    this.events.markerMouseOver(this.marker, this.infoWindow)
  }
// DÉPÔT D'UN COMMENTAIRE __________________________*/
  post() {
    let comment = {
      stars: parseInt($(`#score${this.name}`).val()),
      comment: $(`#comment${this.name}`).val()
    }
    let ratings = this.ratings
    let n = this.ratings.length
    ratings[n] = comment
    console.log(comment)
    this.renderScore()
    let content = this.display.infoWindow(this.name, this.averageScore, this.ratings.length, this.address)
    this.display.showDetails(this.name, this.address, this.ratings.length, this.ratings)
    this.infoWindow.setContent(content)
  }

// DOUBLE FILTRE - RATINGS / LOCATION ______________*/
  filter() {
    let classInstance = this
    function setConditions() {
      function process(avg) {
        let min = $('#minRating').val()
        let max = $('#maxRating').val()
        if (Number(avg) >= Number(min) && Number(avg) <= Number(max)) {
          return true
        } else {
          return false
        }
      }
      function checkPos(marker) {
        return map.getBounds().contains(marker.getPosition())
      }
      if (process(classInstance.averageScore) == false || checkPos(classInstance.marker) == false) {
        classInstance.marker.setVisible(false)
        classInstance.hideMiniature()
      } else {
          if (classInstance.marker.visible == false) {
            classInstance.marker.setAnimation(google.maps.Animation.DROP)
            classInstance.marker.setVisible(true)
          } else {
            return
          }
          if ($('#content').html().indexOf(`mini${classInstance.name}`) == -1 && $('#backToNav').length == 0) {
            classInstance.showMiniature()
            classInstance.showStars()
          } else {
            return
          }
      }
    }
    $('#filter').click(function() {
      setConditions()
    })
    google.maps.event.addListener(map, 'idle', function() {
      setConditions()
    })
  }

}
