class Event {
  constructor() {
    this.display = new Display()
    this.operator = new Operator()
    this.googleAPI = new API()

    this.waitForDetails = async (place) => {
      await this.googleAPI.getDetails(place)
      this.display.showDetails(place)
      this.display.showStars(place)
    }
  }
// MAIN LOGO CLICK _____________________________________ */
  logoClick(init) {
    let that = this
    $('#logo').click(function() {
      that.display.transition(init)
    })
  }
// NAV COLUMN SIDE BUTTON CLICK ________________________ */
  togglerClick() {
    let that = this
    $('#toggler').click(function() {
      let toggler = parseInt($(this).css('left'))
      if (toggler > 0) {
        that.display.togglerSlideLeft()
      } else {
        that.display.togglerSlideRight()
      }
    })
  }
// CLICK ON ONE MARKER _________________________________ */
  markerClick(place) {
    let that = this
    place.marker.addListener('click', function() {
      that.waitForDetails(place)
      that.display.navColumnSlideLeft(place)
    })
  }
// MOUSEOVER . MOUSEOUT GMAP MARKER ____________________ */
  markerMouseOver(place) {
    place.marker.addListener('mouseover', function() {
      place.infoWindow.open(place.marker.get('map'), place.marker)
    })
    place.marker.addListener('mouseout', function() {
      place.infoWindow.close()
    })
  }
// CLICK ON MINIATURE IN NAV COLUMN ____________________ */
  miniatureClick(place) {
    let that = this
    $('body').on('click', `#mini${place.id}`, function() {
      that.waitForDetails(place)
      that.display.navColumnSlideLeft(place)
    })
  }
// NAVIGATION FILTER (1) : SCORE FILTER ________________ */
  scoreFilterClick(place) {
    let that = this
    $('body').on('click', '#filter', function() {
      that.operator.filter(place)
    })
  }
// NAVIGATION FILTER (2) : MAP'S LIMITS FILTER _________ */
  mapDragFilter(place) {
    let that = this
    google.maps.event.addListener(place.map, 'dragend', function() {
      that.operator.filter(place)
    })
  }
// MAPDRAG TO FIND NEW PLACES __________________________ */
  mapDragPlaces(map, pano, service) {
    let that = this
    google.maps.event.addListener(map, 'dragend', function() {
      that.googleAPI.searchMorePlaces(map, pano, service)
    })
  }
// 'ADD NEW COMMENT' BUTTON CLICK ______________________ */
  addCommentClick(place, formID, inputClass, inputID, errorMsg, confirmMsg) {
    let that = this
    $('body').on('click', `#addComment${place.id}`, function() {
      that.display.addCommentAnim(place)
      // POST NEW COMMENT
      let formTag = document.getElementById(`${form[1].id}`)
      formTag.addEventListener('submit', evt => {
        evt.preventDefault()
        that.operator.postComment(place, formID, inputClass, inputID, errorMsg, confirmMsg)
      })
    })
  }
// 'BACK TO NAVIGATION' BUTTON CLICK ___________________ */
  backToNavClick(place) {
    let that = this
    $('body').on('click', '#backToNav', function() {
      that.display.backToNavAnim()
      that.operator.filter(place)
      if (place.infoWindow) {
        place.infoWindow.close()
      }
    })
  }
// 'ADD NEW RESTAURANT' BUTTON CLICK ___________________ */
  openNewPlaceForm(map, panorama, service, formID, inputClass, inputID, errorMsg, confirmMsg) {
    let that = this
    $('body').on('click', '#addRestaurantButton', function() {
      that.display.newRestaurantForm()
      that.operator.autoComplete(map)
      that.submitNewPlace(map, panorama, service, formID, inputClass, inputID, errorMsg, confirmMsg)
    })
  }
// 'SUBMIT' NEW RESTAURANT _____________________________ */
  submitNewPlace(map, panorama, service, formID, inputClass, inputID, errorMsg, confirmMsg) {
    let that = this
    let formTag = document.getElementById(`${form[0].id}`)
    formTag.addEventListener('submit', evt => {
      evt.preventDefault()
      that.operator.postNewPlace(map, panorama, service, formID, inputClass, inputID, errorMsg, confirmMsg)
    })
  }
// NEW RESTAURANT ERROR & ADD NEW COMMENT ______________ */
  addCommentMsg(place) {
    let that = this
    $('body').on('click', `.${place.id}`, function() {
      that.waitForDetails(place)
      setTimeout(function() {
        place.pano.setPosition(place.latLng)
        that.display.anchorSlide(`addComment${place.id}`)
      }, 300)
    })
  }
// ALL EVENTS CALLED BY 'PLACE' GROUPED IN 1 __________ */
  placeEvents(place, infoWindow, formID, inputClass, inputID, errorMsg, confirmMsg) {
    this.markerClick(place)
    this.miniatureClick(place)
    this.addCommentMsg(place)
    this.markerMouseOver(place, infoWindow)
    this.addCommentClick(place, infoWindow, formID, inputClass, inputID, errorMsg, confirmMsg)
    this.scoreFilterClick(place)
    this.mapDragFilter(place)
    this.backToNavClick(place)
  }

}
