class Display {
  constructor() {
  }
// ANIMATION FROM HOMEPAGE TO MAIN LAYOUT ______________ */
  transition(init) {
    $('#main').addClass('visible')
    $('#home').addClass('visible')
    $('#main').html(domElements[0].mainDiv)
    $('#map').addClass('fadeIn')
    $('#navColumn').addClass('fadeIn')
    $('#toggler').addClass('fadeIn')
    setTimeout(function() {
      $('#home').remove()
      init()
    }, 800)
  }
// IF GEOLOC IS NOT ACTIVATED : DISPLAY THIS MESSAGE ___ */
  geoLocErrorMsg() {
    $('#main').prepend(
      `<div id="geoLocErrorMsg" class="d-flex flex-column justify-content-center align-items-center h-100 w-100 bg-dark text-light text-center">
      <span class="display-1 exclamationMark">!</span>
      <span class="h3">La géolocalisation doit être activée pour utiliser notre application</span>
      <span>modifiez les paramètres de votre navigateur pour y accéder</span>
      </div>`)
    setTimeout(function() {
      $('#geoLocErrorMsg').addClass('fade')
    }, 100)
  }
// TOGGLER BUTTON ANIMATION ____________________________ */
  togglerSlideLeft() {
    $('#toggler').css('left', '0')
    $('#toggler').css('transform', 'scaleX(1)')
    $('#navColumn').addClass('slideLeft')
  }
  togglerSlideRight() {
    $('#toggler').css('left', '29vw')
    $('#toggler').css('transform', 'scaleX(-1)')
    $('#navColumn').removeClass('slideLeft')
  }
// ANCHOR'S SMOOTH SLIDE _______________________________ */
  anchorSlide(divID) {
    let anchor = document.getElementById(divID)
    anchor.scrollIntoView({behavior: 'smooth'})
  }
// PLACE MARKER'S INFOWINDOW ___________________________ */
  infoWindow(place) {
    let content =  `<div>
                    <span class="font-weight-bold">${place.name} </span><br>
                    <span>${place.averageScore.toFixed(1)} étoile(s) . ${place.reviewsNb} commentaires</span> <br>
                    <span class="font-italic">${place.address}</span>
                    </div>`
    return content
  }
// PLACE'S MINIATURE DISPLAY ___________________________ */
  showMiniature(place) {
    let miniature = `<div class="miniature p-3 w-50" id="mini${place.id}">
                     <span class="name${place.id} h5 text-primary">${place.name}</span><br>
                     <span class="score${place.id} orange"></span><br>
                     <span class="address${place.id}">${place.address}</span><br>
                     </div>`
    $('#content').append(miniature)
  }
  hideMiniature(place) {
    $(`#mini${place.id}`).remove('')
  }
// STARS RATING SYSTEM __________________________________ */
  showStars(place) {
    let scoreDiv  = `.score${place.id}`
    let starFull  = `<span>★</span>`
    let starEmpty = `<span>☆</span>`
    let avgScore  = `<span class="text-black-50">${place.averageScore.toFixed(1)} </span>`
    let commentNb = `<span class="text-black-50"> (${place.reviewsNb})</span>`
    $(scoreDiv).html(avgScore)
    for (let i = 0; i < starNb; i++) {
      if (i < place.averageScore) {
        $(scoreDiv).append(starFull)
      } else {
        $(scoreDiv).append(starEmpty)
      }
    }
    $(scoreDiv).append(commentNb)
  }
// NAVIGATION COLUMN SLIDE FROM RIGHT TO LEFT __________ */
  navColumnSlideLeft(place) {
    let that = this
    $('#leftNav').addClass('slideLeft')
    $('#rightNav').addClass('slideLeft')
    setTimeout(function() {
      that.anchorSlide('streetView')
    }, 400)
    setTimeout(function() {
      place.pano.setPosition(place.latLng)
      place.map.panTo(place.latLng)
      place.infoWindow.open(place.marker.get('map'), place.marker)
    }, 700)
  }
// DISPLAY PLACE'S INFORMATIONS ________________________ */
  showDetails(place) {
    let header = `<span id="backToNav" class="pointLeft pt-4">◀ revenir à la navigation</span>
                  <div id="title${place.id}" class="d-flex flex-column p-4 w-100" item="${place.id}" >
                    <span class="orange display-4">${place.name}</span>
                    <span class="text-primary score${place.id}"></span>
                    <span class="text-muted">${place.address}</span>
                    <hr>
                    <span class="text-primary h5 mb-2">Commentaires</span>`
    // ADD NEW COMMENT FORM
    let form   = `<button id="addComment${place.id}" type="submit" class="btn btn-primary mx-auto mt-4 mb-2">ajouter un commentaire</button>
                  <div id="commentSection" class="d-none p-4 w-100">
                    <div id="errorMsg"></div>
                    <br>
                    <form id="addCommentForm">
                      <div class="form-group">
                        <input type="text" id="newRating0" class="form-control w-50 p-3" placeholder="nom">
                      </div>
                      <div class="form-group">
                        <input type="number" id="newRating1" class="scoreButton form-control pl-3" min="0" max="5" value="" placeholder="note">
                      </div>
                      <div class="form-group">
                        <textarea id="newRating2" class="form-control p-3" placeholder="commentaire"></textarea>
                      </div>
                      <button id="postComment${place.id}" type="submit" class="btn btn-primary">ajouter</button>
                    </form>
                    <div id="anchor"></div>`
    $('#rightNav').html(header)
    // DISPLAY PLACE COMMENTS
    for (let i = 0; i < place.reviews.length; i++) {
      let allComments = `<span class="orange point8 mt-3">#${i+1} de <span class='font-weight-bold'>${place.reviews[i].author_name}</span></span>
                         <span class="text-dark pl-2">${place.reviews[i].text}</span>
                         <span class="text-muted point8 ml-5">a noté <span class="orange">${place.reviews[i].rating}</span> sur 5</span>
                        </div>`
      $(`[item=${place.id}]`).append(allComments)
    }

    $('#rightNav').append(form)
    $('#streetViewBlinder').addClass('fadeOut')
    setTimeout(function() {
      $('#streetViewBlinder').remove()
    }, 700)
  }
// ADD COMMENT & CONFIRM MSG ANIMATIONS ________________ */
  addCommentAnim(place) {
    let that = this
    $(`#addComment${place.id}`).remove()
    $('#commentSection').removeClass('d-none')
    that.anchorSlide('anchor')
  }
  newCommentConfirm(place, confirmMsg) {
    let that = this
    $(`#addComment${place.id}`).remove()
    $(`[item=${place.id}]`).prepend(`${confirmMsg}`)
    that.anchorSlide('backToNav')
  }
  newCommentError(errorMsg, inputID) {
    let that = this
    $('#errorMsg').html(`${errorMsg}`)
    that.anchorSlide('errorMsg')
  }
// APPEND 'ADD NEW RESTAURANT' FORM ____________________ */
  newRestaurantForm() {
    let that = this
    $('#rightNav').html(domElements[0].newRestaurantForm)
    $('#leftNav').addClass('slideLeft')
    $('#rightNav').addClass('slideLeft')
  }
  autoCompleteUpdate(place, infowindow) {
    let that = this
    let content = `<span>${place.name}</span> <br>
                   <span>${place.formatted_address}</span>`
    infowindow.setContent(content)
    infowindow.open(map, newPlaceMarker)
    $('#newRestaurant1').val(place.formatted_address)
    $('.pending').first().addClass('completed')
    $('#newRestaurantForm').children().removeClass('d-none')
    setTimeout(function() {
      that.anchorSlide('errorMsg')
    }, 800)
  }
  autoCompleteFail(newPlaceMarker) {
    newPlaceMarker.setVisible(false)
    $('#errorMsg').html(`${error[2].msg}`).addClass(newPlaceId)
  }
// 'BACK TO NAV' BUTTON CLICK ANIMATION ________________ */
  backToNavAnim() {
    $('#leftNav').removeClass('slideLeft')
    $('#rightNav').removeClass('slideLeft')
  }
// NEW PLACE ADDED CONFIRMATION ANIMATION ______________ */
  newPlaceAddedAnim(formID, confirmMsg) {
    let that = this
    newPlaceMarker.setVisible(false)
    infowindow.close()
    $('.pending').last().addClass('completed')
    setTimeout(function() {
      $('.pending').remove()
      $('#errorMsg').remove()
      $(`#${formID}`).remove()
      $('#rightNav').append(`${confirmMsg}`)
      that.anchorSlide('cm')
    }, 800)
  }
}
