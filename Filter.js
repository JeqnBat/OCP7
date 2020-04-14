class Filter {
  constructor() {
  }

  // post(name, ratings, length, avg, address) {
  //   let comment = {
  //     stars: parseInt($(`#score${name}`).val()),
  //     comment: $(`#comment${name}`).val()
  //   }
  //   let ratings = ratings
  //   let n = length
  //   ratings[n] = comment
  //   this.renderScore()
  //   let content = this.display.infoWindow(name, avg, length, address)
  //   this.display.showDetails(name, address, length, ratings)
  //   this.infoWindow.setContent(content)
  // }


  filter() {
    let classInstance = this
    function setConditions() {
      function process(avg) {
        let min = $('#minRating').val()
        let max = $('#maxRating').val()
        if (Number(avg) >= Number(min) && Number(avg) <= Number(max)) {
          return true
        } else {
          return false
        }
      }
      function checkPos(marker) {
        return map.getBounds().contains(marker.getPosition())
      }
      if (process(classInstance.averageScore) == false || checkPos(classInstance.marker) == false) {
        classInstance.marker.setVisible(false)
        classInstance.hideMiniature()
      } else {
          if (classInstance.marker.visible == false) {
            classInstance.marker.setAnimation(google.maps.Animation.DROP)
            classInstance.marker.setVisible(true)
          } else {
            return
          }
          if ($('#content').html().indexOf(`mini${classInstance.name}`) == -1 && $('#backToNav').length == 0) {
            classInstance.showMiniature()
            classInstance.showStars()
          } else {
            return
          }
      }
    }
    $('#filter').click(function() {
      setConditions()
    })
    google.maps.event.addListener(map, 'idle', function() {
      setConditions()
    })
  }
}
