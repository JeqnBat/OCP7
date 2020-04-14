class Page {
  constructor() {
    let map
    let pano
    this.events = new Event()
    this.calls = new Call(map, pano)
    this.restaurants = []
  }
// INITIALISATION DE LA PAGE ______________________ */
  init() {
    const loadingSequence = async () => {
      const dataRdy   = await this.calls.API()
      const gMapRdy   = await this.calls.initMap()
      const geoLocRdy = await this.calls.geoLoc()
      this.createObjects(this.calls.data, this.calls.map, this.calls.pano)
      this.events.togglerClick()
      this.events.backToNavClick()
      this.events.addCommentClick()
    }

    this.events.logoClick(loadingSequence)
  }

// CREATION DES OBJETS RESTAURANT _________________ */
  createObjects(fromData, wMap, wPanorama) {
    for (let i = 0; i < fromData.length; i++) {
      this.restaurants[i] = new Place(fromData[i].restaurantName, fromData[i].address, fromData[i].lat, fromData[i].long, fromData[i].ratings, wMap, wPanorama)
    }
  }

}
