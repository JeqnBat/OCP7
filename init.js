function init(master) {
  let mainElements = `<div id="map" class="h-100 w-100"></div>
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
                      </div>`

  $('body').on('click', '#toggler', function() {
    let toggler = parseInt($(this).css('left'))
    if (toggler > 0) {
      $('#toggler').css('left', '0')
      $('#toggler').css('transform', 'scaleX(1)')
      $('#one').css('left', '-29vw')
    } else {
      $('#toggler').css('left', '29vw')
      $('#toggler').css('transform', 'scaleX(-1)')
      $('#one').css('left', '0')
    }
  })

  $('#logo').click(function() {
    $('#main').addClass('top')
    $('#main').html(mainElements)
    $('#map').addClass('fadeIn')
    $('#one').addClass('fadeIn')
    $('#toggler').addClass('fadeIn')
    setTimeout(function() {
      $('#home').remove()
      initMap()
      master()
    }, 900)
  })

}
