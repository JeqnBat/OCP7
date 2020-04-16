class Event {
  constructor() {
    this.display = new Display()
    this.operator = new Operator()
  }

  logoClick(init) {
    let that = this
    $('#logo').click(function() {
      that.display.transition(domElements)
      setTimeout(function() {
        $('#home').remove()
        init()
      }, 900)
    })
  }

  togglerClick() {
    $('#toggler').click(function() {
      let toggler = parseInt($(this).css('left'))
      if (toggler > 0) {
        $('#toggler').css('left', '0')
        $('#toggler').css('transform', 'scaleX(1)')
        $('#navColumn').css('left', '-29vw')
      } else {
        $('#toggler').css('left', '29vw')
        $('#toggler').css('transform', 'scaleX(-1)')
        $('#navColumn').css('left', '0')
      }
    })
  }

  markerClick(marker, name, address, ratings, avg, lat, lng, pano) {
    let that = this
    marker.addListener('click', function() {
      $('#leftNav').addClass('margin-left-100')
      $('#rightNav').addClass('margin-right-0')
      avg = that.operator.renderScore(ratings, avg)
      that.display.showDetails(name, address, ratings)
      that.display.showStars(name, avg, ratings)
      let latLng = new google.maps.LatLng(lat, lng)
      pano.setPosition(latLng)
    })
  }
  markerMouseOver(marker, infoWindow) {
    marker.addListener('mouseover', function() {
      infoWindow.open(marker.get('map'), marker)
    })
    marker.addListener('mouseout', function() {
      infoWindow.close()
    })
  }

  miniatureClick(name, address, ratings, avg, lat, lng, pano) {
    let that = this
    $('body').on('click', `#mini${name}`, function() {
      $('#leftNav').addClass('margin-left-100')
      $('#rightNav').addClass('margin-right-0')
      avg = that.operator.renderScore(ratings, avg)
      that.display.showDetails(name, address, ratings, ratings)
      that.display.showStars(name, avg, ratings)
      let latLng = new google.maps.LatLng(lat, lng)
      pano.setPosition(latLng)
    })
  }
  addCommentClick(name) {
    $('body').on('click', `#addComment${name}`, function() {
      let anchor = document.getElementById('anchor')
      $(`#addComment${name}`).remove()
      $('#commentSection').removeClass('d-none')
      anchor.scrollIntoView({behavior: "smooth"})
    })
  }

  // poster le commentaire
  postCommentClick(name, ratings, avg, address, infoWindow) {
    let that = this
    $('body').on('click', `#postComment${name}`, function() {
      that.operator.postComment(name, ratings, avg, address)
      avg = that.operator.renderScore(ratings, avg)
      that.display.showDetails(name, address, ratings)
      that.display.showStars(name, avg, ratings)
      let content = that.display.infoWindow(name, avg, ratings, address)
      infoWindow.setContent(content)
      $(`#addComment${name}`).remove()
      $('#rightNav').append('<span class="mx-auto">Votre commentaire a bien été enregistré !</span>')
    })
  }
  // filtres de navigation
  scoreFilterClick(avg, marker, map, name, address, ratings) {
    let that = this
    $('body').on('click', '#filter', function() {
      avg = that.operator.renderScore(ratings, avg)
      that.operator.filter(avg, marker, map, name, address, ratings)
    })
  }

  mapFilterDrag(avg, marker, map, name, address, ratings) {
    let that = this
    google.maps.event.addListener(map, 'idle', function() {
      avg = that.operator.renderScore(ratings, avg)
      that.operator.filter(avg, marker, map, name, address, ratings)
    })
  }

  backToNavClick(avg, marker, map, name, address, ratings) {
    let that = this
    $('body').on('click', '#backToNav', function() {
      $('#leftNav').removeClass('margin-left-100')
      $('#rightNav').removeClass('margin-right-0')
      that.operator.filter(avg, marker, map, name, address, ratings)
    })
  }

  addRestaurantClick() {
    let that = this
    $('body').on('mouseenter mouseleave', '#addRestaurant', function() {
      $('.addButton').addClass('.addButtonSpin')
    })
  }

}
