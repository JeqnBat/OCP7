// NUMBER OF STARS & MARKER ICONS ______________________ */
const starNb = 5
const marker = {'orange': 'png/marker.png',
                'blue'  : 'png/markerBlue.png',
                'title' : 'Vous êtes ici'
               }
// PLACES MAIN ARRAY ___________________________________ */
let restaurants = []
// NEW PLACE VARIABLES _________________________________ */
let placeInfos = {}
let infowindow
let newPlaceMarker
let newPlaceId
let newPlaceName
let newPlaceVicinity
let newPlaceGeometry
let newPlaceRatingsNb
let newPlaceRating
// FORM VALIDATOR INPUTS ARRAY _________________________ */
let inputs = []
// ADD NEW COMMENT/RESTAURANT FORMS ____________________ */
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
  ,
  {'msg': `<div class="m-4">
           <span class="text-danger">Ce restaurant est déjà présent dans notre base de données !</span><br><br>
           <span class="addCommentMsg"> ➜ Vous pouvez y déposer un commentaire</span>
           </div>`
  }
]
const confirm = [
  {'msg': `<div id="cm" class="mt-5 text-center confirMsg">
           <span class="display-4">Le restaurant a bien été ajouté !</span>
           </div>`
  },
  {'msg': `<span class="mx-auto">Votre commentaire a bien été enregistré !</span>`
  }
]
// MAIN DOM ELEMENTS ___________________________________ */
const domElements = [
  {'mainDiv': `<div id="map" class="h-100 w-100"></div>
               <div id="navColumn" class="h-100 text-dark">
                 <div id="streetView" class="w-100 h-25">
                   <div id="streetViewBlinder" class="w-100 h-100"></div>
                 </div>
                 <div id="nav" class="d-flex justify-content-start align-items-start">
                   <div id="leftNav" class="row no-gutters col-12">
                     <div id="filter" class="w-50 p-2 point8 text-center my-auto">
                       <span>FILTRER PAR NOTE :<br>
                       <label for="minRating">min</label>
                       <input class="filterButton" type="number" id="minRating" name="minRating" min="0" max="5" value="1">
                       <label for="maxRating">max</label>
                       <input class="filterButton" type="number" id="maxRating" name="maxRating" min="0" max="5" value="5">
                       </span>
                     </div>
                     <div id="addRestaurantButton" class="w-50 p-1 text-center my-auto">
                       <span class="h6 addButton">✚</span><span class="point8"> AJOUTER UN RESTAURANT</span>
                     </div>
                     <div id="content" class="row no-gutters w-100"></div>
                   </div>
                     <div id="rightNav" class="d-flex flex-column col-12"></div>
                   </div>
                  </div>
                  <div id="toggler" class="d-flex justify-content-center align-items-center"><div>‣</div></div>
                 </div>`,
  // ADD NEW RESTAURANT FORM
  'newRestaurantForm': `<span id="backToNav" class="pointLeft pt-4">◀ revenir à la navigation</span>
                        <div class="pending mx-4 mt-4">
                          <span class="display-4 pl-2">1.</span><br>
                          <span>Saisissez le nom du restaurant</span>
                        </div>
                        <form id="newRestaurantForm">
                          <div class="form-group px-4 mt-4">
                            <label for="newRestaurant0" class="d-none">Nom du restaurant</label>
                            <input type="text" class="form-control" id="newRestaurant0" placeholder="ex: le bouillon Pigalle">
                          </div>
                          <div class="form-group px-4 d-none">
                            <label for="newRestaurant1" class="text-primary">Adresse</label>
                            <input type="text" class="form-control" id="newRestaurant1">
                          </div>
                          <div id="errorMsg"></div>
                          <div class="pending d-none mx-4 mb-3">
                            <span class="display-4 pl-2">2.</span><br>
                            <span>Laissez votre nom, votre note et votre commentaire</span>
                          </div>
                          <div class="form-group px-4 d-none">
                            <input type="text" id="newRestaurant2" class="form-control w-50 p-3" placeholder="nom">
                          </div>
                          <div class="form-group px-4 d-none">
                            <input type="number" class="form-control scoreButton pl-3" id="newRestaurant3" min="0" max="5" value="" placeholder="note">
                          </div>
                          <div class="form-group px-4 d-none">
                            <textarea type="text" class="form-control" id="newRestaurant4" placeholder="commentaire"></textarea>
                          </div>
                          <button id="postNewRestaurant" type="submit" class="btn btn-primary mr-auto m-4 d-none">Envoyer</button>
                        </form>`,
  }
]
