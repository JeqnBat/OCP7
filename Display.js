class Display {
  constructor() {
    this.filter = new Filter()
    this.domElements = domElements
  }

  transition(domElements) {
    $('#main').addClass('top')
    $('#main').html(this.domElements[0].mainDiv)
    $('#map').addClass('fadeIn')
    $('#one').addClass('fadeIn')
    $('#toggler').addClass('fadeIn')
  }

  infoWindow(name, avg, length, address) {
    let content =  `<div>
                    <span class="font-weight-bold">${name} </span><br>
                    <span>${avg} étoile(s) . ${length} commentaires</span> <br>
                    <span class="font-italic">${address}</span>
                    </div>`
    return content
  }

  showMiniature(name, address) {
    let miniature = `<div class="p-2 col-sm-6" item="mini${name}">
                    <span class="name${name}">${name}</span><br>
                    <span class="score${name} text-warning"></span><br>
                    <span class="address${name}">${address}</span><br>
                    </div>`
    $('#content').append(miniature)
  }
  hideMiniature(name) {
    $(`[item="mini${name}"]`).remove('')
  }
  showStars(name, avg, length) {
    let scoreDiv  = `.score${name}`
    let starFull  = `<span>★</span>`
    let starEmpty = `<span>☆</span>`
    let avgScore  = `<span class="text-dark">${avg} </span>`
    let commentNb = `<span class="text-dark"> (${length})</span>`
    $(scoreDiv).append(avgScore)
    for (let i = 0; i < starNb; i++) {
      if (i < avg) {
        $(scoreDiv).append(starFull)
      } else {
        $(scoreDiv).append(starEmpty)
      }
    }
    $(scoreDiv).append(commentNb)
  }

  showDetails(name, address, length, ratings) {
    let header = `<span id="backToNav" class="back2nav p-4">◀ revenir à la navigation</span>
                  <div class="p-4 col-sm-12" item="${name}">
                  <span class="title name${name}">${name}</span><br>
                  <span class="score${name} text-warning"></span><br>
                  <span class="text-muted address${name}">${address}</span><br>
                  <hr>`
    let form   = `<button id="addComment" type="submit" class="btn btn-primary mx-auto">ajouter un commentaire</button>
                  <div id="commentsection" class="d-none p-4 col-sm-12">
                  <label for="comment">Ajouter un commentaire</label>
                  <textarea id="comment${name}" class="form-control p-3"></textarea>
                  <label for="star">Note</label><br>
                  <input type="number" id="score${name}" class="button" min="0" max="5" value="1"><br>
                  <button id="postComment" type="submit" class="btn btn-primary">envoyer</button>
                  `
    $('#content').html(header)
    // display comments
    for (let i = 0; i < length; i++) {
      let body = `<span>commentaire #${i+1}</span><br>
                  <span>${ratings[i].comment}</span><br>
                  <span class="score${name}${i}">note : ${ratings[i].stars}</span><br>
                  <br>
                  </div>`
      $(`[item=${name}]`).append(body)
    }
    // formulaire de saisi
    $('#content').append(form)
  }
}
