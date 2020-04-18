class Page {
  constructor() {
    this.events = new Event()
    this.calls = new Call()
    this.restaurants = []
    this.kg = 5
  }

// PAGE INITIALIZATION SEQUENCE ______________________*/
  init() {
    const loadingSequence = async () => {
      const dataRdy   = await this.calls.API()
      const gMapRdy   = await this.calls.initMap()
      const geoLocRdy = await this.calls.geoLoc()
      this.createObjects(this.calls.data, this.calls.map, this.calls.pano)
      this.events.togglerClick()
      this.events.openNewPlaceForm(this.calls.data, form[0].id, input[0].Class, input[0].id, error[0].msg, confirm[0].msg)
    }
    this.events.logoClick(loadingSequence)
  }
// PLACE OBJECTS CREATION ____________________________*/
  createObjects(fromData, wMap, wPanorama) {
    for (let i = 0; i < fromData.length; i++) {
      this.restaurants[i] = new Place(fromData[i].restaurantName, fromData[i].address, fromData[i].lat, fromData[i].long, fromData[i].ratings, wMap, wPanorama)
    }
  }

}
