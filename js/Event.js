/**
 * <b>DESCR:</b><br>
 * 'Event' class deals w/ all the event listeners of the
 * application.
 *
 * @constructor
 */
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
/**
 * <b>DESCR:</b><br>
 * Triggers transition between homescreen & main page after
 * the main logo is clicked.
 *
 * @param {init} function a callback to execute after display.transition()
 */
  logoClick(init, msg) {
    $('#logo').click(() => {
      this.display.transition(init)
      this.display.simpleJack(msg)
    })
  }
// NAV COLUMN SIDE BUTTON CLICK ________________________ */
/**
 * <b>DESCR:</b><br>
 * Moves the toggler button to the left if it is right, or
 * to the right if it is left when clicked.
 */
  togglerClick() {
    $('#toggler').click(() => {
      let toggler = parseInt($(this).css('left'))
      if (toggler > 0) {
        this.display.togglerSlideLeft()
      } else {
        this.display.togglerSlideRight()
      }
    })
  }
// CLICK ON ONE MARKER _________________________________ */
/**
 * <b>DESCR:</b><br>
 * Gets details from a place and displays them in the navigation
 * column when a marker's place is clicked.
 *
 * @param {place} object the place object w/ all its properties
 */
  markerClick(place) {
    place.marker.addListener('click', () => {
      this.waitForDetails(place)
      this.display.navColumnSlideLeft(place)
    })
  }
// MOUSEOVER . MOUSEOUT GMAP MARKER ____________________ */
/**
 * <b>DESCR:</b><br>
 * When hovered, marker's infowindow shows limited amount
 * of information about its place.
 *
 * @param {place} object the place object w/ all its properties
 */
  markerMouseOver(place) {
    place.marker.addListener('mouseover', () => {
      place.infoWindow.open(place.marker.get('map'), place.marker)
    })
    place.marker.addListener('mouseout', () => {
      place.infoWindow.close()
    })
  }
// CLICK ON MINIATURE IN NAV COLUMN ____________________ */
/**
 * <b>DESCR:</b><br>
 * Gets details from a place and displays them in the navigation
 * column when a miniature is clicked on the left nav column.
 *
 * @param {object} place the place object w/ all its properties
 */
  miniatureClick(place) {
    $('body').on('click', `#mini${place.id}`, () => {
      this.waitForDetails(place)
      this.display.navColumnSlideLeft(place)
    })
  }
// NAVIGATION FILTER (1) : SCORE FILTER ________________ */
/**
 * <b>DESCR:</b><br>
 * Runs the 'operator.filter()' both on the map and the navigation
 * column everytime the score filter DIV is clicked.
 *
 * @param {place} object the place object w/ all its properties
 */
  scoreFilterClick(place) {
    $('body').on('click', '#filter', () => {
      this.operator.filter(place)
    })
  }
// NAVIGATION FILTER (2) : MAP'S LIMITS FILTER _________ */
/**
 * <b>DESCR:</b><br>
 * Runs the 'operator.filter()' both on the map and the navigation
 * column everytime the GMAP is dragged.
 *
 * @param {place} object the place object w/ all its properties
 */
  mapDragFilter(place) {
    google.maps.event.addListener(place.map, 'dragend', () => {
      this.operator.filter(place)
    })
  }
// MAPDRAG TO FIND NEW PLACES __________________________ */
/**
 * <b>DESCR:</b><br>
 * Searches for new places everytime the GMAP is dragged.
 *
 * @param {place} object the place object w/ all its properties
 * @param {pano} object the streetview panorama object w/ all its properties
 * @param {service} object the google services object w/ all its properties
 */
  mapDragPlaces(map, pano, service) {
    google.maps.event.addListener(map, 'dragend', () => {
      this.googleAPI.searchMorePlaces(map, pano, service)
    })
  }
// 'ADD NEW COMMENT' BUTTON CLICK ______________________ */
  addCommentClick(place, formID, inputClass, inputID, errorMsg, confirmMsg) {
    $('body').on('click', `#addComment${place.id}`, () => {
      this.display.addCommentAnim(place)
      // POST NEW COMMENT
      let formTag = document.getElementById(`${form[1].id}`)
      formTag.addEventListener('submit', evt => {
        evt.preventDefault()
        this.operator.postComment(place, formID, inputClass, inputID, errorMsg, confirmMsg)
      })
    })
  }
// 'BACK TO NAVIGATION' BUTTON CLICK ___________________ */
  backToNavClick(place) {
    $('body').on('click', '#backToNav', () => {
      this.display.backToNavAnim()
      this.operator.filter(place)
      if (place.infoWindow) {
        place.infoWindow.close()
      }
    })
  }
// 'ADD NEW RESTAURANT' BUTTON CLICK ___________________ */
  openNewPlaceForm(map, panorama, service, formID, inputClass, inputID, errorMsg, confirmMsg) {
    $('body').on('click', '#addRestaurantButton', () => {
      this.display.newRestaurantForm()
      this.operator.autoComplete(map)
      this.submitNewPlace(map, panorama, service, formID, inputClass, inputID, errorMsg, confirmMsg)
    })
  }
// 'SUBMIT' NEW RESTAURANT _____________________________ */
  submitNewPlace(map, panorama, service, formID, inputClass, inputID, errorMsg, confirmMsg) {
    let formTag = document.getElementById(`${form[0].id}`)
    formTag.addEventListener('submit', evt => {
      evt.preventDefault()
      this.operator.postNewPlace(map, panorama, service, formID, inputClass, inputID, errorMsg, confirmMsg)
    })
  }
// NEW RESTAURANT ERROR & ADD NEW COMMENT ______________ */
  addCommentMsg(place) {
    $('body').on('click', `.${place.id}`, () => {
      this.waitForDetails(place)
      setTimeout(() => {
        place.pano.setPosition(place.latLng)
        this.display.anchorSlide(`addComment${place.id}`)
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
