class Event {
  constructor() {
    this.display = new Display()
    this.operator = new Operator()
    this.googleAPI = new API()
  }
// MAIN LOGO CLICK ___________________________________ */
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
// NAV COLUMN SIDE BUTTON CLICK ______________________ */
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
// CLICK ON ONE MARKER _______________________________ */
  markerClick(place) {
    let that = this
    place.marker.addListener('click', function() {
      $('#leftNav').addClass('margin-left-100')
      $('#rightNav').addClass('margin-right-0')
      let a = async () => {
        await that.googleAPI.getDetails(place)
        console.log(place.reviews[0].author_name)
        that.display.showDetails(place)
        that.display.showStars(place)
      }
      setTimeout(function() {
        place.pano.setPosition(place.latLng)
      }, 400)
      a()
    })
  }
// MOUSEOVER . MOUSEOUT GMAP MARKER __________________ */
  markerMouseOver(place) {
    place.marker.addListener('mouseover', function() {
      place.infoWindow.open(place.marker.get('map'), place.marker)
    })
    place.marker.addListener('mouseout', function() {
      place.infoWindow.close()
    })
  }
// CLICK ON MINIATURE IN NAV COLUMN __________________ */
  miniatureClick(place) {
    let that = this
    $('body').on('click', `#mini${place.id}`, function() {
      $('#leftNav').addClass('margin-left-100')
      $('#rightNav').addClass('margin-right-0')
      let a = async () => {
        await that.googleAPI.getDetails(place)
        console.log(place.reviews[0].author_name)
        that.display.showDetails(place)
        that.display.showStars(place)
      }
      setTimeout(function() {
        place.pano.setPosition(place.latLng)
      }, 400)
      a()
    })
  }
// 'ADD NEW COMMENT' BUTTON CLICK ____________________ */
  addCommentClick(place, formID, inputClass, inputID, errorMsg, confirmMsg) {
    let that = this
    $('body').on('click', `#addComment${place.id}`, function() {
      let anchor = document.getElementById('anchor')
      $(`#addComment${place.id}`).remove()
      $('#commentSection').removeClass('d-none')
      anchor.scrollIntoView({behavior: "smooth"})
      let formTag = document.getElementById(`${form[1].id}`)
      // POST NEW COMMENT
      formTag.addEventListener('submit', evt => {
        evt.preventDefault()
        that.operator.postComment(place, formID, inputClass, inputID, errorMsg, confirmMsg)
      })
    })
  }
// NAVIGATION FILTER (1) : SCORE FILTER ______________ */
  scoreFilterClick(place) {
    let that = this
    $('body').on('click', '#filter', function() {
      that.operator.filter(place)
    })
  }
// NAVIGATION FILTER (2) : MAP LIMITS FILTER _________ */
  mapFilterDrag(place) {
    let that = this
    google.maps.event.addListener(place.map, 'idle', function() {
      that.operator.filter(place)
    })
  }
// 'BACK TO NAVIGATION' BUTTON CLICK _________________ */
  backToNavClick(place) {
    let that = this
    $('body').on('click', '#backToNav', function() {
      $('#leftNav').removeClass('margin-left-100')
      $('#rightNav').removeClass('margin-right-0')
      that.operator.filter(place)
    })
  }
// 'ADD NEW RESTAURANT' BUTTON CLICK _________________ */
  openNewPlaceForm(data, map, panorama, formID, inputClass, inputID, errorMsg, confirmMsg) {
    let that = this
    $('body').on('click', '#addRestaurantButton', function() {
      $('#leftNav').addClass('margin-left-100')
      $('#rightNav').addClass('margin-right-0')
      that.display.newRestaurantForm()
      that.operator.autoComplete(map)
      that.submitNewPlace(data, map, panorama, formID, inputClass, inputID, errorMsg, confirmMsg)
    })
  }
// 'SUBMIT' NEW RESTAURANT ___________________________ */
  submitNewPlace(data, map, panorama, formID, inputClass, inputID, errorMsg, confirmMsg) {
    let that = this
    let formTag = document.getElementById(`${form[0].id}`)
    formTag.addEventListener('submit', evt => {
      evt.preventDefault()
      that.operator.formValidator(data, map, panorama, formID, inputClass, inputID, errorMsg, confirmMsg)
    })
  }
// ALL EVENTS CALLED BY 'PLACE' GROUPED IN 1 _________ */
  placeEvents(place, infoWindow, formID, inputClass, inputID, errorMsg, confirmMsg) {
    this.markerClick(place)
    this.miniatureClick(place)
    this.markerMouseOver(place, infoWindow)
    this.addCommentClick(place, infoWindow, formID, inputClass, inputID, errorMsg, confirmMsg)
    this.scoreFilterClick(place)
    this.mapFilterDrag(place)
    this.backToNavClick(place)
  }

}
