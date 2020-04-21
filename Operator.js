class Operator {
  constructor() {
    this.display = new Display()
  }
// CALCULATE AVERAGE SCORE ___________________________ */
  renderScore(place) {
    let sum = 0
    for (let i = 0; i < place.ratings.length; i++) {
      sum += place.ratings[i].stars
    }
    place.averageScore = (sum / place.ratings.length).toFixed(1)
    return place.averageScore
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
      let comment = {
        stars: parseInt($(`#${inputID}0`).val()),
        comment: $(`#${inputID}1`).val()
      }
      let n = place.ratings.length
      place.ratings[n] = comment
      // POST -END
      place.averageScore = this.renderScore(place)
      this.display.showDetails(place)
      this.display.showStars(place)
      let content = this.display.infoWindow(place)
      place.infoWindow.setContent(content)
      $(`#addComment${place.itemName}`).remove()
      $(`[item=${place.itemName}]`).prepend(`${confirmMsg}`)
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
  formValidator(data, map, panorama, formID, inputClass, inputID, errorMsg, confirmMsg) {
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
      this.postNewPlace(data, map, panorama, formID, confirmMsg)
    } else {
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
    }
  }
// FORM AUTO-COMPLETE ________________________________ */
  autoComplete(map) {
    let nameInput = document.getElementById('newRestaurant0')
    let options = {
                types: [('establishment')],
                componentRestrictions: {country: "fr"}
            }
    let nameAutocomplete = new google.maps.places.Autocomplete(nameInput, options)
    nameAutocomplete.setFields(
           ['address_components', 'geometry', 'name', 'formatted_address', 'place_id'])
    let infowindow = new google.maps.InfoWindow()
    let content = ''
    newMarker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29),
      animation: google.maps.Animation.DROP,
      icon: marker.blue
    })
    nameAutocomplete.addListener('place_changed', function() {
      nameAutocomplete.bindTo('bounds', map)
      infowindow.close()
      newMarker.setVisible(false)
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
      newMarker.setPosition(place.geometry.location)
      newMarker.setVisible(true)

      lat = place.geometry.location.lat()
      lng = place.geometry.location.lng()
      name = place.name
      name.substr(0, name.indexOf(','))
      address = place.formatted_address

      content = `<span>${place.name}</span> <br>
                 <span>${place.formatted_address}</span>`
      infowindow.setContent(content)
      infowindow.open(map, newMarker)
      // display ici
      $('#newRestaurant1').val(place.formatted_address)
      $('.pending').first().removeClass('pending').addClass('completed')
      $('#newRestaurantForm').children().removeClass('d-none')
      let anchor = document.getElementById('postNewRestaurant')
      setTimeout(function() {
        anchor.scrollIntoView({behavior: 'smooth'})
      }, 800)
    })
    return lat, lng, name, address, newMarker
  }
// ADD A NEW RESTAURANT TO DATA ______________________ */
  postNewPlace(data, map, panorama, formID, confirmMsg) {
    let star = parseInt($(`#newRestaurant2`).val())
    let comment = $(`#newRestaurant3`).val()
    let coords = {
      restaurantName: name,
      address: address,
      lat: lat,
      long: lng,
      ratings: [
        { stars: star,
          comment: comment
        }
      ]
    }
    let n = data.length
    data[n] = new Place(coords, map, panorama)

    newMarker.setVisible(false)

    $('.completed').remove()
    $(`#${formID}`).remove()
    $('#errorMsg').remove()
    $('#rightNav').append(`${confirmMsg}`)
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
        if ($(`#mini${place.itemName}`).length == 0 && $(`.backToNav`).length == 0 ) {
          this.display.showMiniature(place)
          this.display.showStars(place)
        }
    }
  }

}
