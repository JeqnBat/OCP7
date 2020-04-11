class Restaurant {
  constructor(name, address, lat, lng, ratings) {
    this.name = name
    this.address = address
    this.lat = lat
    this.lng = lng
    this.ratings = ratings
    this.averageScore = 0
    this.marker = ''
    this.infowindow = ''


    this.renderScore()
    this.createMarker()
    this.filter()
  }
// CALCUL DE LA MOYENNE DU RESTAURANT ______________*/
  renderScore() {
    let sum = 0
    for (let i = 0; i < this.ratings.length; i++) {
      sum += this.ratings[i].stars
    }
    this.averageScore = (sum / this.ratings.length).toFixed(1)
  }
// CRÉATION DES MARKERS GMAP _______________________*/
  createMarker() {
    let classInstance = this
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
    // INFOWINDOW
    let infowindow = this.infowindow
    let content = `<div>
                  <span class="font-weight-bold">${this.name} </span><br>
                  <span>${this.averageScore} étoile(s) . ${this.ratings.length} commentaires</span> <br>
                  <span class="font-italic">${this.address}</span>
                  </div>`
    this.infowindow = new google.maps.InfoWindow({
      content: content
    })
    // ONCLICK
    this.marker.addListener('click', function() {
      classInstance.showDetails()
      let latLng = new google.maps.LatLng(classInstance.lat, classInstance.lng)
      pano.setPosition(latLng)
    })
    // MOUSEOVER
    this.marker.addListener('mouseover', function() {
      classInstance.infowindow.open(classInstance.marker.get('map'), classInstance.marker)
    })
    this.marker.addListener('mouseout', function() {
      classInstance.infowindow.close()
    })
  }
// AFFICHAGE DE LA FICHE RESTAURANT ________________*/
  showMiniature() {
    let classInstance = this
    let miniature = `<div class="p-2 col-sm-6" item="mini${this.name}">
                    <span class="name${this.name}">${this.name}</span><br>
                    <span class="score${this.name}"></span><br>
                    <span class="address${this.name}">${this.address}</span><br>
                    </div>`
    $('#content').append(miniature)
    // Right Miniature Click
    $(`[item=mini${this.name}]`).click(function() {
      classInstance.showDetails()
    })
  }
  hideMiniature() {
    $(`[item="mini${this.name}"]`).remove('')
  }
  // affiche la fiche détaillée d'un restaurant
  showDetails() {
    let classInstance = this
    let anchor = document.getElementById('anchor')
    let header = `<span id="backToNav" class="p-2 col-sm-12">☚ revenir à la navigation</span>
                  <div class="p-2 col-sm-12" item="${this.name}">
                  <span class="name${this.name}">${this.name}</span><br>
                  <span class="score${this.name}"></span><br>
                  <span class="address${this.name}">${this.address}</span><br>
                  <hr>`
    let form   = `<button id="addComment" type="submit" class="btn btn-primary mx-auto">ajouter un commentaire</button>
                  <div id="commentsection" class="d-none p-2 col-sm-12">
                  <label for="comment">Ajouter un commentaire</label>
                  <textarea id="comment${this.name}" class="form-control p-3"></textarea>
                  <label for="star">Note</label><br>
                  <input type="number" id="score${this.name}" class="button" min="0" max="5" value="1"><br>
                  <button id="postComment" type="submit" class="btn btn-primary">envoyer</button>
                  `
    $('#content').html(header)
    this.showStars()
    $('#backToNav').click(function() {
      $('#content').html('')
      classInstance.filter()
    })
    // affichage des commentaires
    for (let i = 0; i < this.ratings.length; i++) {
      let body = `<span>commentaire #${i+1}</span><br>
                  <span>${this.ratings[i].comment}</span><br>
                  <span class="score${this.name}${i}">note : ${this.ratings[i].stars}</span><br>
                  <br>
                  </div>`
      $(`[item=${this.name}]`).append(body)
    }
    // commentaires à saisir par le user
    $('#content').append(form)
    // onclick du bouton "ajouter un commentaire"
    $('#addComment').click(function() {
      $('#addComment').remove()
      $('#commentsection').removeClass('d-none')
      anchor.scrollIntoView()
    })
    // poster le commentaire
    $('#postComment').click(function() {
      classInstance.post()
      $('#addComment').remove()
      $('#content').append('<span class="mx-auto">Votre commentaire a bien été enregistré !</span>')
    })
  }
  // compteur à étoiles
  showStars() {
    let starNb    = 5
    let starFull  = `<span>★</span>`
    let starEmpty = `<span>☆</span>`
    $(`.score${this.name}`).append(`<span>${this.averageScore} </span>`)
    for (let i = 0; i < starNb; i++) {
      if (i < this.averageScore) {
        $(`.score${this.name}`).append(starFull)
      } else {
        $(`.score${this.name}`).append(starEmpty)
      }
    }
    $(`.score${this.name}`).append(`<span> (${this.ratings.length})</span>`)
  }
// DÉPÔT D'UN COMMENTAIRE __________________________*/
  post() {
    let comment = {
      stars: parseInt($(`#score${this.name}`).val()),
      comment: $(`#comment${this.name}`).val()
    }
    let ratings = this.ratings
    let n = this.ratings.length
    ratings[n] = comment
    this.renderScore()
    this.showDetails()
    let content = `<div>
                  <span class="font-weight-bold">${this.name} </span><br>
                  <span>${this.averageScore} étoile(s) . ${this.ratings.length} commentaires</span> <br>
                  <span class="font-italic">${this.address}</span>
                  </div>`
    this.infowindow.setContent(content)
  }
// DOUBLE FILTRE - RATINGS / LOCATION ______________*/
  filter() {
    let classInstance = this
    function setConditions() {
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
      if (process(classInstance.averageScore) == false || checkPos(classInstance.marker) == false) {
        classInstance.marker.setVisible(false)
        classInstance.hideMiniature()
      } else {
          if (classInstance.marker.visible == false) {
            classInstance.marker.setAnimation(google.maps.Animation.DROP)
            classInstance.marker.setVisible(true)
          } else {
            return
          }
          if ($('#content').html().indexOf(`mini${classInstance.name}`) == -1 && $('#backToNav').length == 0) {
            classInstance.showMiniature()
            classInstance.showStars()
          } else {
            return
          }
      }
    }
    $('#filter').click(function() {
      setConditions()
    })
    google.maps.event.addListener(map, 'idle', function() {
      setConditions()
    })
  }

}
