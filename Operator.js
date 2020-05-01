class Operator {
  constructor() {
    this.display = new Display()
  }
// CALCULATE PLACE'S AVERAGE SCORE _____________________ */
  renderScore(place, inputScore) {
    let avgTimesNb = place.averageScore * place.reviewsNb
    let total = avgTimesNb + inputScore
    let newAverage = total / (place.reviewsNb+1)
    place.averageScore = newAverage
    place.reviewsNb = place.reviewsNb+1
  }
// CHECK IF ALL FORM'S INPUTS HAVE BEEN COMPLETED ______ */
  formValidator(formID, inputClass, inputID) {
    let inputsNb = $(`#${formID} ${inputClass}`).length
    let inputs = []
    let value = []
    let trimmed = []
    for (let i = 0; i < inputsNb; i++) {
      inputs[i] = document.getElementById(`${inputID+i}`)
      value[i] = inputs[i].value
      if (!value[i]) {
        inputs[i].dataset.state = ''
      } else {
        inputs[i].dataset.state = 'invalid'
      }
      trimmed[i] = value[i].trim()
      if (trimmed[i]) {
        inputs[i].dataset.state = 'valid'
      } else {
        inputs[i].dataset.state = 'invalid'
      }
    }
  }
// POST A COMMENT ABOUT AN EXISTING PLACE ______________ */
  postComment(place, formID, inputClass, inputID, errorMsg, confirmMsg) {
    // CHECK INPUTS VALUE
    this.formValidator(formID, inputClass, inputID)
    // IF NO INPUT IS INVALID
    if ($(`#${formID}`).html().indexOf('invalid') == -1) {
      // POST START
      let comment = { author_name: $(`#newRating0`).val(),
                      language: '',
                      profilte_photo_url: '',
                      rating: parseInt($(`#newRating1`).val()),
                      relative_time_description: '',
                      text: $(`#newRating2`).val(),
                      time: ''
                    }
      place.reviews.push(comment)
      this.renderScore(place, comment.rating)
      // POST END
      this.display.showDetails(place)
      this.display.showStars(place)
      let content = this.display.infoWindow(place)
      place.infoWindow.setContent(content)
      this.display.newCommentConfirm(place, confirmMsg)
    } else {
      this.display.newCommentError(errorMsg, inputID)
    }
  }
// FORM AUTO-COMPLETE TO ADD NEW PLACE _________________ */
  autoComplete(map) {
    let that = this
    let nameInput = document.getElementById('newRestaurant0')
    let options = {
                    types: [('establishment')],
                    componentRestrictions: {country: "fr"}
                  }
    let nameAutocomplete = new google.maps.places.Autocomplete(nameInput, options)
    nameAutocomplete.setFields(
           ['vicinity', 'geometry', 'name', 'formatted_address', 'place_id', 'rating', 'user_ratings_total'])
    infowindow = new google.maps.InfoWindow()
    newPlaceMarker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      icon: marker.blue
    })
    nameAutocomplete.addListener('place_changed', function() {
      nameAutocomplete.bindTo('bounds', map)
      infowindow.close()
      newPlaceMarker.setVisible(false)
      let place = nameAutocomplete.getPlace()
      // IF PLACE DOESN'T HAVE GEOMETRY (EX:USER ENTERED A NAME THAT WAS NOT SUGGESTED AND PRESSED 'ENTER')
      if (!place.geometry) {
        // STOP
        window.alert("Nous n'avons pas trouvé de résultat pour : '" + place.name + "'")
        return
      }
      // IF PLACE HAS GEOMETRY
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport)
        map.setZoom(18)
      } else {
        map.setCenter(place.geometry.location)
        map.setZoom(18)
      }
      newPlaceMarker.setPosition(place.geometry.location)
      newPlaceMarker.setVisible(true)
      // STOCK PLACE DETAILS IN GLOBAL VARIABLES TO USE THEM ELSEWHERE
      newPlaceId = place.place_id
      newPlaceName = place.name
      newPlaceVicinity = place.vicinity
      newPlaceGeometry = place.geometry.location
      newPlaceRatingsNb = place.user_ratings_total
      newPlaceRating = place.rating
      // CHECK IF THIS PLACE IS ALREADY REGISTERED IN THE MAIN ARRAY
      let alreadyHere = (restaurants) => {
          return newPlaceId != restaurants.id
      }
      let checkPlace = () => {
        let testCondition = restaurants.every(alreadyHere)
        if (testCondition == true) {
          that.display.autoCompleteUpdate(place, infowindow)
        } else {
          that.display.autoCompleteFail(newPlaceMarker)
        }
      }
      checkPlace()
    })
    // SEND UPDATED VARIABLES BACK TO GLOBAL SCOPE
    return infowindow, newPlaceId, newPlaceName, newPlaceVicinity, newPlaceGeometry, newPlaceRatingsNb, newPlaceRating
  }
// ADD NEW PLACE TO MAIN ARRAY _________________________ */
  postNewPlace(map, panorama, service, formID, inputClass, inputID, errorMsg, confirmMsg) {
    // CHECK INPUTS VALUE
    this.formValidator(formID, inputClass, inputID)
    // IF NO INPUTS ARE INVALID
    if ($(`#${formID}`).html().indexOf('invalid') == -1) {
      // POST NEW PLACE
      placeInfos = {
        place_id: newPlaceId,
        name: newPlaceName,
        vicinity: newPlaceVicinity,
        geometry: {location: newPlaceGeometry},
        user_ratings_total: newPlaceRatingsNb,
        rating: newPlaceRating
      }
      let n = restaurants.length
      restaurants[n] = new Place(placeInfos, map, panorama, service)
      restaurants[n].reviews = [{author_name: $(`#newRestaurant2`).val(),
                          language: '',
                          profilte_photo_url: '',
                          rating: parseInt($(`#newRestaurant3`).val()),
                          relative_time_description: '',
                          text: $(`#newRestaurant4`).val(),
                          time: ''}]
      this.display.newPlaceAddedAnim(formID, confirmMsg)
    } else {
      this.display.newCommentError(errorMsg, inputID)
    }
  }
// FILTER BY SCORE AND/OR MAP BOUNDARIES _______________ */
  // 1. CHECK IF PLACE IS WITHIN MAP'S LIMITS
  checkPos(place) {
    return place.map.getBounds().contains(place.marker.getPosition())
  }
  // 2. CHECK IF PLACE'S AVERAGESCORE IS BETWEEN MIN & MAX VALUE
  checkScore(place) {
    let min = $('#minRating').val()
    let max = $('#maxRating').val()
    if (Number(place.averageScore) >= Number(min) && Number(place.averageScore) <= Number(max)) {
      return true
    } else {
      return false
    }
  }
  // 3. IF AT LEAST ONE OF THE 2 FILTERS RETURNS FALSE -> DO NOT DISPLAY
  filter(place) {
    if (this.checkScore(place) == false || this.checkPos(place) == false) {
      place.marker.setVisible(false)
      this.display.hideMiniature(place)
    } else {
      if (place.marker.visible == false) {
        place.marker.setVisible(true)
        place.marker.setAnimation(google.maps.Animation.DROP)
      }
      if ($(`#mini${place.id}`).length == 0 && $(`.backToNav`).length == 0 ) {
        this.display.showMiniature(place)
        this.display.showStars(place)
      }
    }
  }

}
