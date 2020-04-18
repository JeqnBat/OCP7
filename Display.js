class Display {
  constructor() {
  }
// ANIMATION FROM HOMEPAGE TO MAIN LAYOUT ____________*/
  transition() {
    $('#main').addClass('top')
    $('#main').html(domElements[0].mainDiv)
    $('#map').addClass('fadeIn')
    $('#navColumn').addClass('fadeIn')
    $('#toggler').addClass('fadeIn')
  }
// TOGGLER BUTTON ANIMATION __________________________*/
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
// MARKER'S INFOWINDOW DISPLAY _______________________*/
  infoWindow(name, avg, ratings, address) {
    let content =  `<div>
                    <span class="font-weight-bold">${name} </span><br>
                    <span>${avg} étoile(s) . ${ratings.length} commentaires</span> <br>
                    <span class="font-italic">${address}</span>
                    </div>`
    return content
  }
// PLACE'S MINIATURE DISPLAY _________________________*/
  showMiniature(name, address) {
    let miniature = `<div class="miniature p-3 w-50" id="mini${name}">
                     <span class="name${name} h4 orange">${name}</span><br>
                     <span class="score${name} text-primary"></span><br>
                     <span class="address${name}">${address}</span><br>
                     </div>`
    $('#content').append(miniature)
  }
  hideMiniature(name) {
    $(`#mini${name}`).remove('')
  }
// STARS RATING SYSTEM ________________________________*/
  showStars(name, avg, ratings) {
    let scoreDiv  = `.score${name}`
    let starFull  = `<span>★</span>`
    let starEmpty = `<span>☆</span>`
    let avgScore  = `<span class="text-black-50">${avg} </span>`
    let commentNb = `<span class="text-black-50"> (${ratings.length})</span>`
    $(scoreDiv).html(avgScore)
    for (let i = 0; i < starNb; i++) {
      if (i < avg) {
        $(scoreDiv).append(starFull)
      } else {
        $(scoreDiv).append(starEmpty)
      }
    }
    $(scoreDiv).append(commentNb)
  }
// DISPLAY PLACE'S INFORMATIONS ______________________*/
  showDetails(name, address, ratings) {
    let header = `<span id="backToNav" class="pointLeft pt-4">◀ revenir à la navigation</span>
                  <div class="d-flex flex-column p-4 w-100" item="${name}">
                    <span class="title display-3 name${name}">${name}</span>
                    <span class="score${name} text-primary"></span>
                    <span class="text-muted address${name}">${address}</span>
                    <hr>
                    <span class="text-primary h5 mb-2">Commentaires</span>`
    // ADD NEW COMMENT FORM
    let form   = `<button id="addComment${name}" type="submit" class="btn btn-primary mx-auto mt-4 mb-2">ajouter un commentaire</button>
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
                      <button id="postComment${name}" type="submit" class="btn btn-primary">ajouter</button>
                    </form>
                    <div id="anchor"></div>`
    $('#rightNav').html(header)
    // DISPLAY PLACE COMMENTS
    for (let i = 0; i < ratings.length; i++) {
      let allComments = `<span class="orange point8 mt-3">#${i+1}</span>
                         <span class="text-body">${ratings[i].comment}</span>
                         <span class="score${name}${i} text-muted point8 ml-5">a noté <span class="orange">${ratings[i].stars}</span> sur 5</span>
                        </div>`
      $(`[item=${name}]`).append(allComments)
    }

    $('#rightNav').append(form)
    $('#streetViewBlinder').addClass('fadeOut')
    setTimeout(function() {
      $('#streetViewBlinder').remove()
    }, 700)
  }
// APPEND 'ADD NEW RESTAURANT' FORM __________________*/
  newRestaurantForm() {
    $('#rightNav').html(domElements[0].newRestaurantForm)
  }
  
}
