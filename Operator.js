class Operator {
  constructor() {
    this.display = new Display()
  }
// CALCULATE AVERAGE SCORE ___________________________ */
  renderScore(place, inputScore) {
    let avgTimesNb = place.rating * place.reviewsNb
    let total = avgTimesNb + inputScore
    let newAverage = total / (place.reviewsNb+1)
    place.rating = newAverage
    place.averageScore = place.rating.toFixed(1)
    place.reviewsNb = place.reviewsNb+1
  }
// POST A COMMENT ____________________________________ */
  postComment(place, formID, inputClass, inputID, errorMsg, confirmMsg) {
    // EMBEDDED FORM VALIDATOR
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
    // IF NO INPUT IS INVALID
    if ($(`#${formID}`).html().indexOf('invalid') == -1) {
      // POST -START
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
      // POST -END
      this.display.showDetails(place)
      this.display.showStars(place)
      let content = this.display.infoWindow(place)
      place.infoWindow.setContent(content)
      $(`#addComment${place.id}`).remove()
      $(`[item=${place.id}]`).prepend(`${confirmMsg}`)
      let anchor = document.getElementById('backToNav')
      anchor.scrollIntoView({behavior: 'smooth'})
      // SUCCESS -END
    } else {
      // ERROR -START
      $('#errorMsg').html(`${errorMsg}`)
      let anchor = document.getElementById('errorMsg')
      anchor.scrollIntoView({behavior: 'smooth'})
      for (let i = 0; i < 4; i++) {
        $('body').on('click', `#${inputID+i}`, function() {
          if (inputs[i].dataset.state = 'invalid') {
            inputs[i].dataset.state = 'valid'
          } else {
            return
          }
        })
      }
      // ERROR -END
    }
  }
// CHECK IF FORM IS VALID BEFORE POSTING _____________ */
  formValidator(data, map, panorama, service, formID, inputClass, inputID, errorMsg, confirmMsg) {
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
    if ($(`#${formID}`).html().indexOf('invalid') == -1) {
      this.postNewPlace(data, map, panorama, service, formID, confirmMsg)
    } else {
      $('#errorMsg').html(`${errorMsg}`)
      let anchor = document.getElementById('errorMsg')
      anchor.scrollIntoView({behavior: 'smooth'})
      for (let i = 0; i < inputsNb; i++) {
        $('body').on('click', `#${inputID+i}`, function() {
          if (inputs[i].dataset.state = 'invalid') {
            inputs[i].dataset.state = 'valid'
          } else {
            return
          }
        })
      }
    }
  }
// FORM AUTO-COMPLETE ________________________________ */
  autoComplete(map, data) {
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
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("Nous n'avons pas trouvé de résultat pour : '" + place.name + "'");
        return;
      }
      // If the place has a geometry viewport, use it on the map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport)
      } else { // else center map on place location
        map.setCenter(place.geometry.location)
        map.setZoom(17)
      }

      newPlaceMarker.setPosition(place.geometry.location)
      newPlaceMarker.setVisible(true)

      newPlaceId = place.place_id
      newPlaceName = place.name
      newPlaceVicinity = place.vicinity
      newPlaceGeometry = place.geometry.location
      newPlaceRatingsNb = place.user_ratings_total
      newPlaceRating = place.rating

      let alreadyHere = (data) => {
          return newPlaceId != data.id
      }
      let checkPlace = () => {
        let testCondition = data.every(alreadyHere)
        if (testCondition == true) {
          that.display.autoCompleteUpdate(place, infowindow)
        } else {
          newPlaceMarker.setVisible(false)
          $('#errorMsg').html(`${error[2].msg}`).addClass(newPlaceId)
        }
      }
      checkPlace()
    })
    return infowindow, newPlaceId, newPlaceName, newPlaceVicinity, newPlaceGeometry, newPlaceRatingsNb, newPlaceRating
  }
// ADD A NEW RESTAURANT TO DATA ______________________ */
  postNewPlace(data, map, panorama, service, formID, confirmMsg) {
    // stocké dans constants.js
    placeInfos = {
      place_id: newPlaceId,
      name: newPlaceName,
      vicinity: newPlaceVicinity,
      geometry: {location: newPlaceGeometry},
      user_ratings_total: newPlaceRatingsNb,
      rating: newPlaceRating
    }
    let n = data.length
    data[n] = new Place(placeInfos, map, panorama, service)
    data[n].reviews = [{author_name: $(`#newRestaurant2`).val(),
                        language: '',
                        profilte_photo_url: '',
                        rating: parseInt($(`#newRestaurant3`).val()),
                        relative_time_description: '',
                        text: $(`#newRestaurant4`).val(),
                        time: ''}]
    newPlaceMarker.setVisible(false)
    infowindow.close()

    $('.pending').last().addClass('completed')
    setTimeout(function() {
      $('.pending').remove()
      $('#errorMsg').remove()
      $(`#${formID}`).remove()
      $('#rightNav').append(`${confirmMsg}`)
      let anchor = document.getElementById('cm')
      anchor.scrollIntoView({behavior: 'smooth'})
    }, 800)
  }
// FILTER BY SCORE AND/OR MAP BOUNDARIES _____________ */
  // CHECK IF PLACE IS WITHIN MAP'S LIMITS
  checkPos(place) {
    return place.map.getBounds().contains(place.marker.getPosition())
  }
  // CHECK IF PLACE'S AVERAGESCORE IS BETWEEN MIN & MAX VALUE
  checkScore(place) {
    let min = $('#minRating').val()
    let max = $('#maxRating').val()
    if (Number(place.averageScore) >= Number(min) && Number(place.averageScore) <= Number(max)) {
      return true
    } else {
      return false
    }
  }
  // IF AT LEAST ONE OF THE 2 FILTERS RETURNS FALSE > DO NOT DISPLAY
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
