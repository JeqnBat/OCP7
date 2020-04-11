$(function() {

  localStorage.getItem('map', 'pano')

  let place  = new Place()
  let data   = []

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

// APPELS __________________________________________*/
  function main() {
    place.process(data)
  }

  const master = async () => {
    const waitData      = await getData()
    const locationRdy   = await geoLoc()
    main()
  }

  init(master)


})
