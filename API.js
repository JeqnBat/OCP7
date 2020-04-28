class API {
  constructor() {
    this.map
    this.pano
    this.service
    this.latLng
    this.places = []
  }
// CALL GMAP _________________________________________ */
  async initMap() {
    return new Promise((resolve, reject) => {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    })
    this.pano = new google.maps.StreetViewPanorama(document.getElementById('streetView'), {
      position: {lat: 37.869260, lng: -122.254811},
      pov: {heading: 165, pitch: 0},
      zoom: 1,
    })
    this.service = new google.maps.places.PlacesService(this.map)

    resolve('done')
    return this.map, this.pano, this.service
    })
  }
// CALL NAVIGATOR GEOLOCATION FUNCTION _______________ */
  async geoLoc() {
    let userInfoWindow
    let userMarker
    return new Promise((resolve, reject) => {
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latLng = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
          this.map.setCenter(this.latLng)
          this.map.setZoom(17)
      // CREATE USER'S POSITION MARKER
          this.latLng = new google.maps.LatLng(this.latLng.lat, this.latLng.lng)
          userMarker = new google.maps.Marker({
            position: this.latLng,
            map: this.map,
            title: marker.title,
            visible: true
          })
          userInfoWindow = new google.maps.InfoWindow({
            content: marker.title,
          })
          userInfoWindow.open(userMarker.get('map'), userMarker)
          // à ranger dans les events
          userMarker.addListener('mouseover', function() {
            userInfoWindow.open(userMarker.get('map'), userMarker)
          })
          userMarker.addListener('mouseout', function() {
            userInfoWindow.close()
          })
          resolve('done')
          return this.latLng
        }, (error) => {
          console.log(`${error.code}`)
          reject('failed')
        })
      } else {
        // ...
      }
    })
  }
// CALL NEARBYSEARCH() TO FIND PLACES ________________ */
  async searchPlaces() {
    let request = {
      location: this.latLng,
      radius: '1000',
      type: ['restaurant']
    }
    return new Promise((resolve, reject) => {
      this.service.nearbySearch(request, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            this.places.push(results[i])
          }
          resolve('done')
        }
      })
    })
  }

searchMorePlaces(map, pano, service) {
    let request = {
      bounds: map.getBounds(),
      radius: '1000',
      type: ['restaurant']
    }
    service.nearbySearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          let n = restaurants.length
          let newPlaceId = results[i].place_id
          let alreadyHere = (restaurants) => {
              return newPlaceId != restaurants.id
          }
          let checkPlace = () => {
            let testCondition = restaurants.every(alreadyHere)
            if (testCondition == true) {
              restaurants[n] = new Place(results[i], map, pano, service)
            } else {

            }
          }
          checkPlace()
        }
      }
    })
  }
// GET REVIEWS OF SPECIFIC PLACE _____________________ */
  async getDetails(place) {
    if (place.reviews.length <= 1) {
      let requestDetails = {
        placeId: place.id,
        fields: ['name', 'formatted_address', 'geometry', 'rating', 'review']
      }
      return new Promise((resolve, reject) => {
        place.service.getDetails(requestDetails, (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            let newReviews = place.reviews
            let oldReviews = result.reviews
            place.reviews = newReviews.concat(oldReviews)
            resolve('done')
          }
        })
      })
    } else {
      return
    }
  }

}
