class Filter {
  constructor() {
  }

  click(map, length, place, markers) {
    $('#filter').click(function() {
      let min = $('#minRating').val()
      let max = $('#maxRating').val()
      for (let i = 0; i < length; i++) {
        if (place[i].averageRating >= min && place[i].averageRating <= max) {
          $(`[item=${place[i].name}]`).css('display', '')
          markers[i].setVisible(true)
        } else if ($('#content').html().indexOf(`${name}`) != -1) {
          $(`[item=${place[i].name}]`).css('display', '')
          markers[i].setVisible(false)
        } else {
          $(`[item=${place[i].name}]`).css('display', 'none')
          markers[i].setVisible(false)
        }
      }
    })
  }
}
