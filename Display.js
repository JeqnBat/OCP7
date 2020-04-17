class Display {
  constructor() {
    this.domElements = domElements
  }

  transition(domElements) {
    $('#main').addClass('top')
    $('#main').html(this.domElements[0].mainDiv)
    $('#map').addClass('fadeIn')
    $('#navColumn').addClass('fadeIn')
    $('#toggler').addClass('fadeIn')
  }

  infoWindow(name, avg, ratings, address) {
    let content =  `<div>
                    <span class="font-weight-bold">${name} </span><br>
                    <span>${avg} étoile(s) . ${ratings.length} commentaires</span> <br>
                    <span class="font-italic">${address}</span>
                    </div>`
    return content
  }
  showMiniature(name, address) {
    let miniature = `<div class="miniature p-3 col-sm-6" id="mini${name}">
                    <span class="name${name} h4 orange">${name}</span><br>
                    <span class="score${name} text-primary"></span><br>
                    <span class="address${name}">${address}</span><br>
                    </div>`
    $('#content').append(miniature)
  }
  hideMiniature(name) {
    $(`#mini${name}`).remove('')
  }
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

  showDetails(name, address, ratings) {
    let header = `<span id="backToNav" class="pointLeft pt-4">◀ revenir à la navigation</span>
                  <div class="d-flex flex-column p-4 col-sm-12" item="${name}">
                    <span class="title display-3 name${name}">${name}</span>
                    <span class="score${name} text-primary"></span>
                    <span class="text-muted address${name}">${address}</span>
                    <hr>
                    <span class="text-primary h5 mb-2">Commentaires</span>`
    let form   = `<button id="addComment${name}" type="submit" class="btn btn-primary mx-auto mt-4 mb-2">ajouter un commentaire</button>
                  <div id="commentSection" class="d-none p-4 col-12">
                  <div class="form-group">
                    <label for="score${name}">Note</label><br>
                    <input type="number" id="score${name}" class="button" min="0" max="5" value="5">
                  </div>
                  <div class="form-group">
                    <label for="comment${name}">Commentaire</label>
                    <textarea id="comment${name}" class="form-control p-3"></textarea>
                  </div>
                  <button id="postComment${name}" type="submit" class="btn btn-primary">ajouter</button>
                  <div id="anchor"></div>`
    $('#rightNav').html(header)
    // display comments
    for (let i = 0; i < ratings.length; i++) {
      let allComments = `<span class="orange point8 mt-3">#${i+1}</span>
                         <span class="text-body">${ratings[i].comment}</span>
                         <span class="score${name}${i} text-muted point8 ml-5">a noté <span class="orange">${ratings[i].stars}</span> sur 5</span>
                         </div>`
      $(`[item=${name}]`).append(allComments)
    }
    // formulaire de saisi
    $('#rightNav').append(form)
  }
  displayNewRestaurantForm() {
    $('#rightNav').html(this.domElements[0].newRestaurantForm)
  }
}
