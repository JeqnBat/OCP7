// NUMBER OF STARS & MARKER ICON _____________________*/
const starNb = 5
const markerPNG = 'png/marker.png'
// ADD NEW COMMENT/RESTAURANT FORMS __________________*/
const form = [
  {'id': 'newRestaurantForm'},
  {'id': 'addCommentForm'}
]
const input = [
  {'Class': '.form-control', 'id': 'newRestaurant'},
  {'Class': '.form-control', 'id': 'newRating'},
]
const error = [
  {'msg': `<div class="text-center mt-4">
           <span class="text-danger">Merci de compléter tous les champs !</span>
           </div>`
  },
  {'msg': `<div class="text-center mt-4">
           <span class="text-danger">Merci de compléter tous les champs !</span>
           </div>`
  }
]
const confirm = [
  {'msg': `<div class="mt-5 text-center confirMsg">
           <span class="display-4">Le restaurant a bien été ajouté !</span>
           </div>`
  },
  {'msg': `<span class="mx-auto">Votre commentaire a bien été enregistré !</span>`
  }
]
// MAIN DOM ELEMENTS _________________________________*/
const domElements = [
  {'mainDiv': `<div id="map" class="h-100 w-100"></div>
               <div id="navColumn" class="h-100 text-dark">
                 <div id="streetView" class="w-100 h-25">
                   <div id="streetViewBlinder" class="w-100 h-100"></div>
                 </div>
                 <div id="nav" class="d-flex justify-content-center align-items-start">
                   <div id="leftNav" class="row no-gutters h-100 w-100">
                     <div id="filter" class="w-50 p-2 point8 text-center my-auto">
                       <span>FILTRER PAR NOTE :<br>
                       <label for="minRating">min</label>
                       <input class="button" type="number" id="minRating" name="minRating" min="0" max="5" value="1">
                       <label for="maxRating">max</label>
                       <input class="button" type="number" id="maxRating" name="maxRating" min="0" max="5" value="5">
                       </span>
                     </div>
                     <div id="addRestaurantButton" class="w-50 p-2 text-center my-auto">
                       <span class="h6 addButton">✚</span><span class="point8"> AJOUTER UN RESTAURANT</span>
                     </div>
                     <div id="content" class="row no-gutters w-100"></div>
                   </div>
                   <div id="rightNav" class="d-flex flex-column h-100 w-100">
                   </div>
                 </div>
               </div>
               <div id="toggler" class="d-flex justify-content-center align-items-center"><div>‣</div></div>
               </div>`,
  // ADD NEW RESTAURANT FORM
  'newRestaurantForm': `<span id="backToNav" class="pointLeft pt-4">◀ revenir à la navigation</span>
                        <div id="errorMsg"></div>
                        <form id="newRestaurantForm">
                          <div class="form-group px-4 mt-4">
                            <label for="newRestaurant0">Nom du restaurant</label>
                            <input type="text" class="form-control" id="newRestaurant0">
                          </div>
                          <div class="form-group px-4">
                            <label for="newRestaurant1">Adresse</label>
                            <input type="text" class="form-control" id="newRestaurant1" aria-describedby="nameHelp">
                            <small id="nameHelp" class="form-text text-muted">ex: place Rio de Janeiro, 75008 Paris.</small>
                          </div>
                          <div class="form-group px-4">
                            <label for="newRestaurant2">Note</label>
                            <input type="number" class="form-control button" id="newRestaurant2" min="0" max="5">
                          </div>
                          <div class="form-group px-4">
                            <label for="newRestaurant3">Commentaire</label>
                            <textarea type="text" class="form-control" id="newRestaurant3"></textarea>
                          </div>
                          <button id="postNewRestaurant" type="submit" class="btn btn-primary mr-auto m-4">Envoyer</button>
                        </form>`,
  }
]
