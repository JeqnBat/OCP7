class Operator {
  constructor() {
    this.display = new Display()
  }
// CALCULATE AVERAGE SCORE ___________________________*/
  renderScore(ratings, avg) {
    let sum = 0
    for (let i = 0; i < ratings.length; i++) {
      sum += ratings[i].stars
    }
    avg = (sum / ratings.length).toFixed(1)
    return avg
  }
// POST A COMMENT ____________________________________*/
  postComment(name, ratings, avg, address, formID, inputClass, inputID, errorMsg, confirmMsg, infoWindow) {
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
      let n = ratings.length
      ratings[n] = comment
      // POST -END
      avg = this.renderScore(ratings, avg)
      this.display.showDetails(name, address, ratings)
      this.display.showStars(name, avg, ratings)
      let content = this.display.infoWindow(name, avg, ratings, address)
      infoWindow.setContent(content)
      $(`#addComment${name}`).remove()
      $(`[item=${name}]`).prepend(`${confirmMsg}`)
      // SUCCESS -END
    } else {
      // ERROR -START
      $('#errorMsg').html(`${errorMsg}`)
      let anchor = document.getElementById('errorMsg')
      anchor.scrollIntoView({behavior: "smooth"})
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
// CHECK IF FORM IS VALID BEFORE POSTING _____________*/
  formValidator(data, formID, inputClass, inputID, errorMsg, confirmMsg) {
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
      this.postNewPlace(data, formID, confirmMsg)
    } else {
      $('#errorMsg').html(`${errorMsg}`)
      let anchor = document.getElementById('errorMsg')
      anchor.scrollIntoView({behavior: "smooth"})
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
// ADD A NEW RESTAURANT TO DATA ______________________*/
  postNewPlace(data, formID, confirmMsg) {
    let coords = {
      restaurantName: $(`#newRestaurant0`).val(),
      address: $(`#newRestaurant1`).val(),
      lat: 'n/a',
      long: 'n/a',
      ratings: {
          stars: parseInt($(`#newRestaurant2`).val()),
          comment: $(`#newRestaurant3`).val()
      }
    }
    let n = data.length
    data[n] = coords

    $(`#${formID}`).remove()
    $('#errorMsg').remove()
    $('#rightNav').append(`${confirmMsg}`)
  }
// FILTER BY SCORE AND/OR MAP BOUNDARIES _____________*/
  // CHECK IF PLACE IS WITHIN MAP'S LIMITS
  checkPos(marker, map) {
    return map.getBounds().contains(marker.getPosition())
  }
  // CHECK IF PLACE'S AVERAGESCORE IS BETWEEN MIN & MAX VALUE
  checkScore(avg) {
    let min = $('#minRating').val()
    let max = $('#maxRating').val()
    if (Number(avg) >= Number(min) && Number(avg) <= Number(max)) {
      return true
    } else {
      return false
    }
  }
  // IF AT LEAST ONE OF THE 2 FILTERS RETURNS FALSE > DO NOT DISPLAY
  filter(avg, marker, map, name, address, ratings) {
    if (this.checkScore(avg) == false || this.checkPos(marker, map) == false) {
      marker.setVisible(false)
      this.display.hideMiniature(name)
    } else {
        if (marker.visible == false) {
          marker.setVisible(true)
          marker.setAnimation(google.maps.Animation.DROP)
        }
        if ($(`#mini${name}`).length == 0 && $(`.backToNav`).length == 0 ) {
          avg = this.renderScore(ratings, avg)
          this.display.showMiniature(name, address)
          this.display.showStars(name, avg, ratings)
        }
    }
  }

}
