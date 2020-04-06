$(function() {
  localStorage.getItem('map', 'pano')
  // let go          = new Go()
  let place       = new Place()
  let aboutMap    = new Gmap()
  let filter      = new Filter()
  let data        = []

/*(fonctionne pas dans un fichier à part)*/
  const getData = async () => {
    let customInit =  { method: 'GET',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        mode:   'no-cors',
                        cache:  'default'
                      }
    let jsonFile = 'http://127.0.0.1/OCP7/json.json'
    let response = await fetch(jsonFile, customInit)
    data         = await response.json()
  }

  // ----------------------------- APPELS -----------------------------
  function main() {
    // Factorisation
    let pR = place.restaurants
    // Appel des méthodes
    place.process(data)
    aboutMap.createMarker(pR.length, place)
    aboutMap.isVisible(place)

    filter.click(aboutMap, pR.length, pR, aboutMap.markers)

  }

  const master = async () => {
    const waitData      = await getData()
    const locationRdy   = await geoLoc()
    const createObjects = await main()
  }

  master()

})
