// JB PELLIER - OCP7 - FUNCTIONS.JS
$(function() {
/*
// APP DESCRIPTION _____________________________________ /
  .OBJECTS :
    1. PAGE
        .Includes ALL other objects.
        .Stores the init() sequence that loads the app.
        .Creates Instances of PLACE based on API results.
    2. API
        .Calls geoLoc() to retrieve user's coordinates
        .Calls google API & centers map on user's location
        .Queries google API for places surrounding user
    3. PLACE
        .Converts API results to Object properties
        .Creates its own marker on the map
    4. EVENT
        .Stores all events handlers
          ex: 1. logoClick
              2. togglerClick
              3. mapDrag
              4. filterClick
    5. OPERATOR
        .Calculates & returns place average rating
        .Filters places (both by ratings & location)
        .Checks forms & inputs validity
        .Posts new comment to an existing place
        .Adds new place to the app's main array
    6. DISPLAY
        .Stores all animations & transitions methods()
        .Customizes Dom Elements with place's ID and infos

  .constants.js
    Stores global variables.
      ex: 1. Restaurants[] (main app array - contains all the 'places' instances)
          2. domElements (portions of DOM elements stored here and used by display)
          3. Markers images (PNG)
          4. UI messages (confirm messages, error messages)
*/

// START TITLE ANIMATION
  setTimeout(function(){
    $('#title1').addClass('visible')
    $('#title2').addClass('visible')
  }, 300)
// INIT() CALLED ON LOGOCLICK
  let page = new Page()
  page.init()

})
