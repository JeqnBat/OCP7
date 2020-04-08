class Place {
  constructor() {
    this.restaurants = []
  }

// CREATION DES OBJETS RESTAURANT _________________ */
  process(data) {
    for (let i = 0; i < data.length; i++) {
      this.restaurants[i] = new Restaurant(data[i].restaurantName, data[i].address, data[i].lat, data[i].long, data[i].ratings)
    }
  }

}
