const starNb = 5
const markerPNG = 'png/marker.png'

const domElements = [
  {"mainDiv":
  `<div id="map" class="h-100 w-100"></div>
    <div id="one" class="h-100 text-dark">
      <div id="StreetView" class="col-12 h-25"></div>
      <div id="filter" class="d-flex justify-content-center align-items-center nav p-2">
        <p>FILTRER PAR NOTE :<br>
        <label for="minRating">min</label>
        <input class="button" type="number" id="minRating" name="minRating" min="0" max="5" value="1">
        <label for="maxRating">max</label>
        <input class="button" type="number" id="maxRating" name="maxRating" min="0" max="5" value="5">
        </p>
      </div>
      <div id="content" class="row no-gutters"></div>
      <div id="anchor"></div>
    </div>
    <div id="toggler" class="d-flex justify-content-center align-items-center"><div>‣</div></div>
  </div>`,
  },
]
