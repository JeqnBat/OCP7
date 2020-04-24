class Page {
  constructor() {
    this.userEvent = new Event()
    this.googleAPI = new API()
    this.restaurants = []
  }
// PAGE INITIALIZATION SEQUENCE ______________________ */
  init() {
    const loadingSequence = async () => {
      await this.googleAPI.initMap()
      await this.googleAPI.geoLoc()
      await this.googleAPI.searchPlaces()
      this.createPlaces(this.googleAPI.places, this.googleAPI.map, this.googleAPI.pano, this.googleAPI.service, form[0].id, input[0].Class, input[0].id, error[0].msg, confirm[0].msg)
      this.userEvent.togglerClick()
    }
    this.userEvent.logoClick(loadingSequence)
  }
// PLACE OBJECTS CREATION ____________________________ */
  createPlaces(fromData, wMap, wPanorama, wService, form, inputClass, inputID, error, confirm) {
    for (let i = 0; i < fromData.length; i++) {
      this.restaurants[i] = new Place(fromData[i], wMap, wPanorama, wService)
    }
    this.userEvent.openNewPlaceForm(fromData, wMap, wPanorama, wService, form, inputClass, inputID, error, confirm)
  }

}
