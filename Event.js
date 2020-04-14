class Event {
  constructor() {
    this.display = new Display()
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
        $('#one').css('left', '-29vw')
      } else {
        $('#toggler').css('left', '29vw')
        $('#toggler').css('transform', 'scaleX(-1)')
        $('#one').css('left', '0')
      }
    })
  }

  markerClick(marker, name, address, length, ratings, avg, lat, lng, pano) {
    let that = this
    marker.addListener('click', function() {
      that.display.showDetails(name, address, length, ratings)
      that.display.showStars(name, avg, length)
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

  miniatureClick(name, address, length, ratings, avg) {
    let that = this
    $(`[item=mini${name}]`).click(function() {
      that.display.showDetails(name, address, length, ratings)
      that.display.showStars(name, avg, length)
    })
  }

  backToNavClick() {
    $('body').on('click', '#backToNav', function() {
      $('#content').html('')
      // classInstance.filter()
    })
  }

  addCommentClick() {
    let anchor = document.getElementById('anchor')
    $('body').on('click', '#addComment', function() {
      $('#addComment').remove()
      $('#commentsection').removeClass('d-none')
      anchor.scrollIntoView()
    })
  }

  // poster le commentaire
  postCommentClick() {
    $('body').on('click', `#postComment`, function() {
      this.post()
      $('#addComment').remove()
      $('#content').append('<span class="mx-auto">Votre commentaire a bien été enregistré !</span>')
    })
  }

}
