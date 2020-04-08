class Restaurant {
  constructor(name, address, lat, lng, ratings) {
    this.name = name
    this.address = address
    this.lat = lat
    this.lng = lng
    this.ratings = ratings
    this.averageRating = 0
    this.marker = 0

    this.avgRating()
    this.createMarker()
    this.filter()
  }

// CALCUL DE LA MOYENNE DU RESTAURANT ______________*/
  avgRating() {
    let sum = 0
    for (let i = 0; i < this.ratings.length; i++) {
      sum += this.ratings[i].stars
    }
    this.averageRating = (sum / this.ratings.length).toFixed(1)
  }
// CRÉATION DES MARKERS GMAP _______________________*/
  createMarker(number, place) {
    let classInstance = this // pour les event listeners
    let markerPNG = 'png/marker.png'
    let latLng = new google.maps.LatLng(this.lat, this.lng)
    let marker = this.marker
    this.marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: this.name,
      visible: true,
      animation: google.maps.Animation.DROP,
      icon: markerPNG
    })
    // infowindow sur chaque marker
    let content = `<div>
                  <span class="font-weight-bold">${this.name} </span><br>
                  ${this.averageRating} étoile(s) <br>
                  <span class="font-italic">${this.address}</span>
                  </div>`
    let infowindow = new google.maps.InfoWindow({
      content: content
    })
    // gestion événementielle des markers
    this.marker.addListener('click', function() {
      classInstance.showDetails()
      latLng = new google.maps.LatLng(classInstance.lat, classInstance.lng)
      pano.setPosition(latLng)
    })

    this.marker.addListener('mouseover', function() {
      infowindow.open(classInstance.marker.get('map'), classInstance.marker)
    })
    this.marker.addListener('mouseout', function() {
      infowindow.close()
    })
  }
// AFFICHAGE DU RESTAURANT DANS LE DOM _____________*/
  showMiniature() {
    let miniature = `<div class="p-2 col-sm-6" item="mini${this.name}">
                    ${this.name}<br>
                    ${this.address}<br>
                    <span class="score${this.name}" data-toggle="tooltip" title="note moyenne : ${this.averageRating}"></span>
                    </div>`
    $('#content').append(miniature)
    let classInstance = this
    $(`[item=mini${this.name}]`).on('click', function() {
      classInstance.showDetails()
    })
  }
  hideMiniature() {
    $(`[item="mini${this.name}"]`).remove('')
  }
  // affiche la fiche détaillée d'un restaurant
  showDetails() {
    let classInstance = this
    let header = `<span id="backToNav" class="p-2 col-sm-12">☚ revenir à la navigation</span>
                  <div class="p-2 col-sm-12" item="${this.name}">
                  Nom : ${this.name}<br>
                  Adresse : ${this.address}<br>
                  <span class="score${this.name}">Note moyenne : </span>
                  <hr>`
    let form   = `<button id="addComment" type="submit" class="btn btn-primary mx-auto">ajouter un commentaire</button>
                  <div id="commentsection" class="d-none p-2 col-sm-12">
                  <label for="comment">Ajouter un commentaire</label>
                  <textarea id="comment${this.name}" class="form-control"></textarea>
                  <label for="star">Note</label><br>
                  <input type="number" id="score${this.name}" min="0" max="5" value="1"><br>
                  <button id="postComment" type="submit" class="btn btn-primary">envoyer</button>
                  `
    $('#content').html(header)
    this.showStars()
    // affichage des commentaires
    for (let i = 0; i < this.ratings.length; i++) {
      let body = `<span>commentaire #${i+1}</span><br>
                  <span>${this.ratings[i].comment}</span><br>
                  <span class="score${this.name}${i}">note : ${this.ratings[i].stars}</span><br>
                  <br>
                  </div>`
      $(`[item=${classInstance.name}]`).append(body)
    }
    // onclick du span backToNav
    $('#backToNav').on('click', function() {
      $('#content').html('')
      classInstance.filter()
    })
    // onclick du bouton "ajouter un commentaire"
    $('#content').on('click', '#addComment', function() {
      $('#commentsection').removeClass('d-none')
      $('#addComment').remove()
    })
    // commentaires à saisir par le user
    $('#content:last-child').append(form)
    // poster le commentaire
    $('#postComment').click(function() {
      classInstance.post()
      $('#addComment').remove()
      $('#content').append('<span class="mx-auto">Votre commentaire a bien été enregistré !</span>')
    })
  }
  // compteur à étoiles
  showStars() {
    let starNb = 5
    $(`.score${this.name}`).append(`<span>${this.averageRating} </span>`)
    for (let i = 0; i < starNb; i++) {
      if (i < this.averageRating) {
        $(`.score${this.name}`).append(`
          <span>★</span>
          `)
      } else {
        $(`.score${this.name}`).append(`
          <span>☆</span>
          `)
      }
    }
    $(`.score${this.name}`).append(`<span> (${this.ratings.length})</span>`)
  }
// DOUBLE FILTRE - RATINGS / LOCATION ______________*/
  filter() {
    // 1. fonctions
    function process(avg) {
      let min = $('#minRating').val()
      let max = $('#maxRating').val()
      if (avg >= min && avg <= max) {
        return true
      } else {
        return false
      }
    }
    function checkPos(marker) {
      return map.getBounds().contains(marker.getPosition())
    }
    let classInstance = this
    function setConditions() {
      if (process(classInstance.averageRating) == false || checkPos(classInstance.marker) == false) {
        classInstance.marker.setVisible(false)
        classInstance.hideMiniature()
      } else {
        classInstance.marker.setVisible(true)
          if ($('#content').html().indexOf(`mini${classInstance.name}`) == -1 && $('#backToNav').length == 0) {
            classInstance.showMiniature()
            classInstance.showStars()
          } else {
            return
          }
      }
    }
    // 2. eventsHandlers
    $('#filter').click(function() {
      setConditions()
    })
    google.maps.event.addListener(map, 'idle', function() {
      setConditions()
    })
  }
// DÉPÔT D'UN COMMENTAIRE __________________________*/
  post() {
    let comment = {stars: parseInt($(`#score${this.name}`).val()), comment: $(`#comment${this.name}`).val()}
    let ratings = this.ratings
    let n = this.ratings.length
    ratings[n] = comment
    this.avgRating()
    this.showDetails()
  }

}
// faire tous mes eventshandler avec une variable pour la div sélectionnée et :
// case 1, case 2 , case 3 etc
