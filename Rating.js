class Rating {
  constructor(stars, comment, number) {
    this.stars = stars
    this.comment = comment
    this.nb = number
  }

  // le display se fait ici
  show(placeName, nb) {
    let commentNb = this.nb + 1
    $(`[item=${placeName}]`).append(`
    #${commentNb}<br>
    ${this.comment}<br>
    <span class="score${this.nb}">
    ${this.stars} </span><br>
    <br>
    </div>`)
  }

}
