class Event {
  constructor() {
    this.display = new Display()
    this.operator = new Operator()
  }
// MAIN LOGO CLICK ___________________________________*/
  logoClick(init) {
    let that = this
    $('#logo').click(function() {
      that.display.transition()
      setTimeout(function() {
        $('#home').remove()
        init()
      }, 900)
    })
  }
// NAV COLUMN SIDE BUTTON CLICK ______________________*/
  togglerClick() {
    let that = this
    $('#toggler').click(function() {
      let toggler = parseInt($(this).css('left'))
      if (toggler > 0) {
        that.display.slideLeft()
      } else {
        that.display.slideRight()
      }
    })
  }
// CLICK ON ONE GMAP MARKER __________________________*/
  markerClick(marker, name, address, ratings, avg, lat, lng, pano) {
    let that = this
    marker.addListener('click', function() {
      $('#leftNav').addClass('margin-left-100')
      $('#rightNav').addClass('margin-right-0')
      avg = that.operator.renderScore(ratings, avg)
      that.display.showDetails(name, address, ratings)
      that.display.showStars(name, avg, ratings)
      let latLng = new google.maps.LatLng(lat, lng)
      setTimeout(function() {
        pano.setPosition(latLng)
      }, 500)
    })
  }
// MOUSEOVER . MOUSEOUT GMAP MARKER __________________*/
  markerMouseOver(marker, infoWindow) {
    marker.addListener('mouseover', function() {
      infoWindow.open(marker.get('map'), marker)
    })
    marker.addListener('mouseout', function() {
      infoWindow.close()
    })
  }
// CLICK ON MINIATURE DISPLAYED IN NAV COLUMN ________*/
  miniatureClick(name, address, ratings, avg, lat, lng, pano) {
    let that = this
    $('body').on('click', `#mini${name}`, function() {
      $('#leftNav').addClass('margin-left-100')
      $('#rightNav').addClass('margin-right-0')
      avg = that.operator.renderScore(ratings, avg)
      that.display.showDetails(name, address, ratings, ratings)
      that.display.showStars(name, avg, ratings)
      let latLng = new google.maps.LatLng(lat, lng)
      setTimeout(function() {
        pano.setPosition(latLng)
      }, 500)
    })
  }
// 'ADD NEW COMMENT' BUTTON CLICK ____________________*/
  addCommentClick(name, ratings, avg, address, infoWindow, formID, inputClass, inputID, errorMsg, confirmMsg) {
    let that = this
    $('body').on('click', `#addComment${name}`, function() {
      let anchor = document.getElementById('anchor')
      $(`#addComment${name}`).remove()
      $('#commentSection').removeClass('d-none')
      anchor.scrollIntoView({behavior: "smooth"})
      let formTag = document.getElementById(`${form[1].id}`)
      // POST NEW COMMENT
      formTag.addEventListener('submit', evt => {
        evt.preventDefault()
        that.operator.postComment(name, ratings, avg, address, formID, inputClass, inputID, errorMsg, confirmMsg, infoWindow)
      })
    })
  }
// NAVIGATION FILTER (1) : SCORE FILTER ______________*/
  scoreFilterClick(avg, marker, map, name, address, ratings) {
    let that = this
    $('body').on('click', '#filter', function() {
      avg = that.operator.renderScore(ratings, avg)
      that.operator.filter(avg, marker, map, name, address, ratings)
    })
  }
// NAVIGATION FILTER (2) : MAP LIMITS FILTER _________*/
  mapFilterDrag(avg, marker, map, name, address, ratings) {
    let that = this
    google.maps.event.addListener(map, 'idle', function() {
      avg = that.operator.renderScore(ratings, avg)
      that.operator.filter(avg, marker, map, name, address, ratings)
    })
  }
// 'BACK TO NAVIGATION' BUTTON CLICK _________________*/
  backToNavClick(avg, marker, map, name, address, ratings) {
    let that = this
    $('body').on('click', '#backToNav', function() {
      $('#leftNav').removeClass('margin-left-100')
      $('#rightNav').removeClass('margin-right-0')
      that.operator.filter(avg, marker, map, name, address, ratings)
    })
  }
// 'ADD NEW RESTAURANT' BUTTON CLICK _________________*/
  openNewPlaceForm(data, formID, inputClass, inputID, errorMsg, confirmMsg) {
    let that = this
    $('body').on('click', '#addRestaurantButton', function() {
      $('#leftNav').addClass('margin-left-100')
      $('#rightNav').addClass('margin-right-0')
      that.display.newRestaurantForm()
      that.postNewPlace(data, formID, inputClass, inputID, errorMsg, confirmMsg)
    })
  }
// 'SUBMIT' NEW RESTAURANT ___________________________*/
  postNewPlace(data, formID, inputClass, inputID, errorMsg, confirmMsg) {
    let that = this
    let formTag = document.getElementById(`${form[0].id}`)
    formTag.addEventListener('submit', evt => {
      evt.preventDefault()
      that.operator.formValidator(data, formID, inputClass, inputID, errorMsg, confirmMsg)
    })
  }
// ALL EVENTS CALLED BY 'PLACE' GROUPED IN 1 _________*/
  placeEvents(marker, name, address, ratings, avg, lat, lng, map, pano, infoWindow, formID, inputClass, inputID, errorMsg, confirmMsg) {
    this.markerClick(marker, name, address, ratings, avg, lat, lng, pano)
    this.miniatureClick(name, address, ratings, avg, lat, lng, pano)
    this.markerMouseOver(marker, infoWindow)
    this.addCommentClick(name, ratings, avg, address, infoWindow, formID, inputClass, inputID, errorMsg, confirmMsg)
    this.scoreFilterClick(avg, marker, map, name, address, ratings)
    this.mapFilterDrag(avg, marker, map, name, address, ratings)
    this.backToNavClick(avg, marker, map, name, address, ratings)
  }

}
