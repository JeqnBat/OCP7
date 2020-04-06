class Restaurant {
  constructor(name, address, lat, lng) {
    this.name = name
    this.address = address
    this.lat = lat
    this.lng = lng
    this.ratings = []
    this.averageRating = 0
  }

  avgRating() {
    let starNb = 5
    for (let i = 0; i < this.ratings.length; i++) {
      this.averageRating += this.ratings[i].stars/this.ratings.length
    }
  }

  showStars(name, avg) {
    let starNb = 5
    $(`#score${name}`).html('')
    for (let i = 0; i < starNb; i++) {
      if (i < avg) {
        $(`#score${name}`).append(`
          <span>★</span>
          `)
      } else {
        $(`#score${name}`).append(`
          <span>☆</span>
          `)
      }
    }
  }

  showStars(nb, avg) {
    let starNb = 5
    for (let i = 0; i < starNb; i++) {
      if (i < avg) {
        $(`.score${nb}`).append(`
          <span>★</span>
          `)
      } else {
        $(`.score${nb}`).append(`
          <span>☆</span>
          `)
      }
    }
  }

  showMiniature(name, address, avg) {
    if ($('#content').html().indexOf(`${name}`) == -1) {
      $('#content').append(`
        <div class="p-2 col-sm-6" item="mini${name}">
        ${name}<br>
        ${address}<br>
        <span class="score${name}" data-toggle="tooltip" title="note moyenne : ${avg}"></span>
        </div>
        `)
    } else {
      return
    }
  }

  hideMiniature(name) {
    $(`[item=mini${name}]`).remove()
  }

  showDetails() {
    $('#content').html(`
      <div class="cover p-2 col-sm-12" item="${this.name}">
      Nom : ${this.name}<br>
      Adresse : ${this.address}<br>
      <span>Note moyenne : ${this.averageRating}</span>
      <hr>
    `)
    // Nouvelle boucle pour process l'array dans l'array
    for (let i = 0; i < this.ratings.length; i++) {
      this.ratings[i].show(this.name)
      this.showStars(i, this.averageRating)
    }
    // onclick du bouton "ajouter un commentaire"
    $('#content').on('click', '#addComment', function() {
      $('#commentsection').removeClass('d-none')
    })
    // Commentaires à saisir par le user
    $('#content:last-child').append(`
      <button id="addComment" type="submit" class="btn btn-primary">ajouter un commentaire</button>
      <div id="commentsection" class="d-none p-2 col-sm-12">
      <label for="comment">Ajouter un commentaire</label>
      <textarea id="comment${this.name}" class="form-control"></textarea>
      <label for="star">Note</label><br>
      <input type="number" id="note${this.name}" min="0" max="5" value="1"><br>
      <button id="postComment" type="submit" class="btn btn-primary">envoyer</button>
      </div>
    `)
  }

  post() {
    // griser le bouton tant que les deux champs ont pas une valeur
    let comment = $(`#comment${this.name}`).val()
    let score   = $(`#note${this.name}`).val()
    let classInstance = this
    $('#content').on('click', '#postComment', function() {

      comment = $(`#comment${classInstance.name}`).val()
      score   = $(`#note${classInstance.name}`).val()

      console.log(this.name)
    })
  }

}
