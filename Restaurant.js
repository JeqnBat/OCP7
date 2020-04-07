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
    this.showMiniature()
    this.showStars()
    this.click()
  }

// MÉTHODES ________________________________________*/
  // calcul de la moyenne du restaurant
  avgRating() {
    for (let i = 0; i < this.ratings.length; i++) {
      this.averageRating += this.ratings[i].stars/this.ratings.length
    }
  }
  // création des markers google maps
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

  }// ______________ FIN DES MARKERS ______________


  // affiche la miniature du restaurant
  showMiniature() {
    let miniature = `<div class="p-2 col-sm-6" item="mini${this.name}">
                    ${this.name}<br>
                    ${this.address}<br>
                    <span class="score${this.name}" data-toggle="tooltip" title="note moyenne : ${this.averageRating}"></span>
                    </div>`
    $('#content').append(miniature)
  }
  // cache la miniature
  hideMiniature(name) {
    $(`[item=mini${name}]`).remove()
  }
  // affiche la fiche détaillée d'un restaurant
  showDetails() {
    let header = `<div class="cover p-2 col-sm-12" item="${this.name}">
                  Nom : ${this.name}<br>
                  Adresse : ${this.address}<br>
                  <span class="score${this.name}">Note moyenne : </span>
                  <hr>`
    let form   = `<button id="addComment" type="submit" class="btn btn-primary">ajouter un commentaire</button>
                  <div id="commentsection" class="d-none p-2 col-sm-12">
                  <label for="comment">Ajouter un commentaire</label>
                  <textarea id="comment${this.name}" class="form-control"></textarea>
                  <label for="star">Note</label><br>
                  <input type="number" id="note${this.name}" min="0" max="5" value="1"><br>
                  <button id="postComment" type="submit" class="btn btn-primary">envoyer</button>
                  </div>
                  `
    $('#content').html(header)
    this.showStars()
    // affichage des commentaires
    for (let i = 0; i < this.ratings.length; i++) {
      let commentBody = `<span>commentaire #${i+1}</span><br>
                        <span>${this.ratings[i].comment}</span><br>
                        <span class="score${this.name}${i}">note : ${this.ratings[i].stars}</span><br>
                        <br>
                        </div>`
      $(`[item=${this.name}]`).append(commentBody)

    }
    // onclick du bouton "ajouter un commentaire"
    $('#content').on('click', '#addComment', function() {
      $('#commentsection').removeClass('d-none')
    })
    // Commentaires à saisir par le user
    $('#content:last-child').append(form)
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

  // envoyer son commentaire
  post() {
    // griser le bouton tant que les deux champs ont pas une valeur
    let comment = $(`#comment${this.name}`).val()
    let score   = $(`#note${this.name}`).val()
    let classInstance = this
    $('#content').on('click', '#postComment', function() {
      comment = $(`#comment${classInstance.name}`).val()
      score   = $(`#note${classInstance.name}`).val()
    })
  }


  // FILTRE __________________________________________*/
  click() {
    let classInstance = this
    $('#filter').click(function() {
      if (classInstance.inBounds(classInstance.marker) == false || classInstance.process() == false) {
        console.log(`${classInstance.name} est caché`)
      } else {
        console.log(`${classInstance.name} est pas caché`)
      }
    })
  }
  process() {
    let min = $('#minRating').val()
    let max = $('#maxRating').val()
    if (this.averageRating >= min && this.averageRating <= max) {
      return true
    } else {
      return false
    }
  }

  inBounds() {
    function checkPos(marker) {
      return map.getBounds().contains(marker.getPosition())
    }
    let classInstance = this
    google.maps.event.addListener(map, 'dragend', function() {
      if (classInstance.inBounds(classInstance.marker) == false || classInstance.click() == false) {
        console.log(`${this.name} est caché`)
      } else {
        console.log(`${this.name} est pas caché`)
      }
    })
  }

  filter() {
    if (classInstance.inBounds(classInstance.marker) == false || classInstance.click() == false) {
      console.log(`${this.name} est caché`)
    } else {
      console.log(`${this.name} est pas caché`)
    }
  }

}
