class Place {
  constructor() {
    this.restaurants = []
  }

  process(data) {
    for (let i = 0; i < data.length; i++) {
      this.restaurants[i] = new Restaurant(data[i].restaurantName, data[i].address, data[i].lat, data[i].long)
      for (let j = 0; j < data[i].ratings.length; j++) {
        this.restaurants[i].ratings[j] = new Rating(data[i].ratings[j].stars, data[i].ratings[j].comment)
      }
    }
  }

}
