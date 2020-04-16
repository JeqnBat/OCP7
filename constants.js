const starNb = 5
const markerPNG = 'png/marker.png'

const domElements = [
  {"mainDiv":
  `<div id="map" class="h-100 w-100"></div>
    <div id="navColumn" class="h-100 text-dark">
      <div id="StreetView" class="col-12 h-25"></div>
      <div id="nav" class="d-flex justify-content-center align-items-start">
        <div id="leftNav" class="row no-gutters h-100 w-100">
          <div id="filter" class="col-6 p-2 point8 text-center my-auto">
            <span>FILTRER PAR NOTE :<br>
            <label for="minRating">min</label>
            <input class="button" type="number" id="minRating" name="minRating" min="0" max="5" value="1">
            <label for="maxRating">max</label>
            <input class="button" type="number" id="maxRating" name="maxRating" min="0" max="5" value="5">
            </span>
          </div>
          <div id="addRestaurant" class="col-6 p-2 text-center my-auto">
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
  },
]
