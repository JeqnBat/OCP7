class Display {
  constructor() {
  }
// ANIMATION FROM HOMEPAGE TO MAIN LAYOUT ____________ */
  transition() {
    $('#main').addClass('top')
    $('#main').html(domElements[0].mainDiv)
    $('#map').addClass('fadeIn')
    $('#navColumn').addClass('fadeIn')
    $('#toggler').addClass('fadeIn')
  }
// TOGGLER BUTTON ANIMATION __________________________ */
  slideLeft() {
    $('#toggler').css('left', '0')
    $('#toggler').css('transform', 'scaleX(1)')
    $('#navColumn').css('left', '-29vw')
  }
  slideRight() {
    $('#toggler').css('left', '29vw')
    $('#toggler').css('transform', 'scaleX(-1)')
    $('#navColumn').css('left', '0')
  }
// MARKER'S INFOWINDOW DISPLAY _______________________ */
  infoWindow(place) {
    let content =  `<div>
                    <span class="font-weight-bold">${place.name} </span><br>
                    <span>${place.averageScore} étoile(s) . ${place.reviewsNb} commentaires</span> <br>
                    <span class="font-italic">${place.address}</span>
                    </div>`
    return content
  }
// PLACE'S MINIATURE DISPLAY _________________________ */
  showMiniature(place) {
    let miniature = `<div class="miniature p-3 w-50" id="mini${place.id}">
                     <span class="name${place.id} h5 orange">${place.name}</span><br>
                     <span class="score${place.id} text-primary"></span><br>
                     <span class="address${place.id}">${place.address}</span><br>
                     </div>`
    $('#content').append(miniature)
  }
  hideMiniature(place) {
    $(`#mini${place.id}`).remove('')
  }
// STARS RATING SYSTEM ________________________________ */
  showStars(place) {
    let scoreDiv  = `.score${place.id}`
    let starFull  = `<span>★</span>`
    let starEmpty = `<span>☆</span>`
    let avgScore  = `<span class="text-black-50">${place.averageScore} </span>`
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
// DISPLAY PLACE'S INFORMATIONS ______________________ */
  showDetails(place) {
    let header = `<span id="backToNav" class="pointLeft pt-4">◀ revenir à la navigation</span>
                  <div class="d-flex flex-column p-4 w-100" item="${place.id}">
                    <span class="title display-4 name${place.id}">${place.name}</span>
                    <span class="score${place.id} text-primary"></span>
                    <span class="text-muted address${place.id}">${place.address}</span>
                    <hr>
                    <span class="text-primary h5 mb-2">Commentaires</span>`
    // ADD NEW COMMENT FORM
    let form   = `<button id="addComment${place.id}" type="submit" class="btn btn-primary mx-auto mt-4 mb-2">ajouter un commentaire</button>
                  <div id="commentSection" class="d-none p-4 w-100">
                    <div id="errorMsg"></div>
                    <form id="addCommentForm">
                      <div class="form-group">
                        <label for="newRating0">Note</label><br>
                        <input type="number" id="newRating0" class="button form-control" min="0" max="5" value="">
                      </div>
                      <div class="form-group">
                        <label for="newRating1">Commentaire</label>
                        <textarea id="newRating1" class="form-control p-3"></textarea>
                      </div>
                      <button id="postComment${place.id}" type="submit" class="btn btn-primary">ajouter</button>
                    </form>
                    <div id="anchor"></div>`
    $('#rightNav').html(header)
    // DISPLAY PLACE COMMENTS
    for (let i = 0; i < displayedReviewsNb; i++) {
      let allComments = `<span class="orange point8 mt-3">#${i+1}</span>
                         <span class="text-body">aa</span>
                         <span class="score${place.id}${i} text-muted point8 ml-5">a noté <span class="orange">aa</span> sur 5</span>
                        </div>`
      $(`[item=${place.id}]`).append(allComments)
    }

    $('#rightNav').append(form)
    $('#streetViewBlinder').addClass('fadeOut')
    setTimeout(function() {
      $('#streetViewBlinder').remove()
    }, 700)
  }
// APPEND 'ADD NEW RESTAURANT' FORM __________________ */
  newRestaurantForm() {
    $('#rightNav').html(domElements[0].newRestaurantForm)
  }

  autoCompleteUpdate(place, infowindow) {
    let content = `<span>${place.name}</span> <br>
                   <span>${place.formatted_address}</span>`
    infowindow.setContent(content)
    infowindow.open(map, newMarker)

    $('#newRestaurant1').val(place.formatted_address)
    $('.pending').first().addClass('completed')
    $('#newRestaurantForm').children().removeClass('d-none')
    let anchor = document.getElementById('postNewRestaurant')
    setTimeout(function() {
      anchor.scrollIntoView({behavior: 'smooth'})
    }, 800)
  }

}
