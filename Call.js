class Call {
  constructor() {
    this.map
    this.pano
    this.data
  }
// CALL API __________________________________________*/
  API() {
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
      this.data    = await response.json()
    }
    return getData()
  }
// CALL GMAP _________________________________________*/
  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    })
    this.pano = new google.maps.StreetViewPanorama(document.getElementById('streetView'), {
      position: {lat: 37.869260, lng: -122.254811},
      pov: {heading: 165, pitch: 0},
      zoom: 1,
    })
    return this.map, this.pano
  }
// CALL NAVIGATOR GEOLOCATION FUNCTION _______________*/
  geoLoc() {
    let map = this.map
    let pano = this.pano
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      //...
    }

    function success(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        map.setCenter(pos)
        map.setZoom(17)
        pano.setPosition(pos)
    }
    function error(error) {
        console.log(`${error.code}`)
    }
  }
  
}
