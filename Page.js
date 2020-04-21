class Page {
  constructor() {
    this.userEvent = new Event()
    this.googleAPIcall = new Call()
    this.restaurants = []
  }
// PAGE INITIALIZATION SEQUENCE ______________________ */
  init() {
    const loadingSequence = async () => {
      const dataRdy   = await this.googleAPIcall.API()
      const gMapRdy   = await this.googleAPIcall.initMap()
      const geoLocRdy = await this.googleAPIcall.geoLoc()
      this.createPlaces(this.googleAPIcall.data, this.googleAPIcall.map, this.googleAPIcall.pano, form[0].id, input[0].Class, input[0].id, error[0].msg, confirm[0].msg)
      this.userEvent.togglerClick()
    }
    this.userEvent.logoClick(loadingSequence)

  }
// PLACE OBJECTS CREATION ____________________________ */
  createPlaces(fromData, wMap, wPanorama, form, inputClass, inputID, error, confirm) {
    for (let i = 0; i < fromData.length; i++) {
      this.restaurants[i] = new Place(fromData[i], wMap, wPanorama)
    }
    this.userEvent.openNewPlaceForm(fromData, wMap, wPanorama, form, inputClass, inputID, error, confirm)
  }

}
