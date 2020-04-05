class Filter {
  constructor() {
  }

  click(map, length, place, markers) {
    $('#filter').click(function() {
      let min
      let max

      min = $('#minRating').val()
      max = $('#maxRating').val()

      for (let i = 0; i < length; i++) {
        if (place[i].averageRating >= min && place[i].averageRating <= max) {
          $(`[item=${place[i].name}]`).css('display', '')
          markers[i].setVisible(true)
        } else {
          $(`[item=${place[i].name}]`).css('display', 'none')
          markers[i].setVisible(false)
        }
      }
    })
  }

}
