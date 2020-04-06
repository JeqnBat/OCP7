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

  showMiniature(name, address, avg) {
    if ($('#content').html().indexOf(`${name}`) == -1) {
      $('#content').append(`
        <div class="p-2 col-sm-6" item="mini${name}">
        ${name}<br>
        ${address}<br>
        ${avg}<br>
        <span id="score${name}"></span>
        </div>
        `)
    } else {
      $(`[item=mini${name}]`).css('color', 'blue')
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
      <p class="averageRating">Note moyenne : ${this.averageRating}</p>
      <hr>
    `)
    // Nouvelle boucle pour process l'array dans l'array
    for (let j = 0; j < this.ratings.length; j++) {
      $(`[item=${this.name}]`).append(`
      Commentaire :<br>
      ${this.ratings[j].comment}<br>
      Note : ${this.ratings[j].stars}<br>
      <br>
      </div>`)
    }
    $('#content:last-child').append(`
    <div class="comment p-2 col-sm-12" item=${this.name}>
    <label for="comment">Ajouter un commentaire</label>
    <textarea id="comment${this.name}" class="form-control"></textarea>
    <label for="star">Note</label><br>
    <input type="number" id="note${this.name}" min="0" max="5" value="1"><br>
    <button type="submit" class="btn btn-primary" name="${this.name}">envoyer</button>
    </div>`)
  }

}
