/**
 * <b>DESCR:</b><br>
 * API class deals with all external calls and displays
 * an error if geoLoc API is disabled by user
 *
 * @constructor
 */
class API {
  constructor() {
    this.map
    this.pano
    this.service
    this.latLng
    this.places = []
    this.display = new Display()
  }
// GET THE GMAP w/ ASYNC FUNCTION  _____________________ */
  /**
   * <b>DESCR:</b><br>
   * Calls GMAP API and displays a map in the dedicated DIV
   * an error if geoLoc API is disabled by user
   *
   * @returns {this.map} the map object
   * @returns {this.pano} the streetview panorama
   * @returns {this.service} the 'PLaces APi' service object
   */
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
// RUN BROWSER'S GEOLOC API  ___________________________ */
  /**
   * <b>DESCR:</b><br>
   * Calls geoLoc API through the web browser.
   * If call is resolved, stores the coordinates of the user
   * and enters them in the GMAP
   * Creates a gmap Marker & InfoWindow with the user's position
   * If call is rejected, displays an error message
   *
   * @returns {this.latlng} the user's geoloc position
   */
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
          this.map.setZoom(18)
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
          userMarker.addListener('mouseover', function() {
            userInfoWindow.open(userMarker.get('map'), userMarker)
          })
          userMarker.addListener('mouseout', function() {
            userInfoWindow.close()
          })
          resolve('geoLoc done')
          return this.latLng
        }, (error) => {
          reject('geoLoc loading failed')
          this.display.geoLocErrorMsg()
        })
      }
    })
  }
// USE GOOGLE SERVICE TO FIND NEW PLACES NEARBY ________ */
  /**
   * <b>DESCR:</b><br>
   * Uses GMAP API to search for places near the user's position
   *
   */
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
          resolve('Done')
        } else {
          reject('Search aborted')
        }
      })
    })
  }
// FIND NEW PLACES AFTER A MAP DRAG ____________________ */
  /**
   * <b>DESCR:</b><br>
   * Searches for more places after an event (type: mousedrag) is fired
   * using the 'nearbySearch' method of the google service object
   *
   * @param {map} object the GMAP object
   * @param {pano} object the streetview panorama object
   * @param {service} object the google service object
   */
searchMorePlaces(map, pano, service) {
    let request = {
      bounds: map.getBounds(),
      radius: '1000',
      type: ['restaurant']
    }
    service.nearbySearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        let lessInputs = results.length/2
        for (let i = 0; i < lessInputs; i++) {
          let n = restaurants.length
          let newPlaceId = results[i].place_id
          // CHECKS IF PLACE IS ALREADY REGISTERED IN THE MAIN ARRAY
          let checkPlaceId = (restaurants) => {
              return newPlaceId != restaurants.id
          }
          let isPlaceRegistered = () => {
            let testCondition = restaurants.every(checkPlaceId)
            // IF IT IS NOT -> CREATE IT
            if (testCondition == true) {
              restaurants[n] = new Place(results[i], map, pano, service)
            // ELSE -> PRINT NAME AND SEND ERROR MSG
            } else {
              console.log(`${results[i].name} is already registered in our database`)
            }
          }
          // CALL TEST
          isPlaceRegistered()
        }
      }
    })
  }
// GET DETAILS FROM ONE PLACE __________________________ */
  /**
   * <b>DESCR:</b><br>
   * Get a specific place's details using the 'getDetails'
   * method from google service API
   *
   * @param {place} array all the places downloaded inside the app so far
   */
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
      // IF PLACE HAS MORE THAN 1 REVIEW : GETDETAILS() HAS ALREADY BEEN CALLED; DO NOT CALL IT AGAIN
      return
    }
  }
}
