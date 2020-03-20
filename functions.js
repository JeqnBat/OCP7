$(function() {
// test API Call with ajax
  // var settings = {
  //   "url": "http://127.0.0.1/OCP7/json.json",
  //   "method": "GET",
  //   "timeout": 0,
  // };
  //
  // $.ajax(settings).done(function (response) {
  //   console.log(response);
  // });

  // Méthode fetch
  let customInit =  { method: 'GET',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      mode: 'no-cors',
                      cache: 'default'
                    };

  let jsonFile = 'http://127.0.0.1/OCP7/json.json';

  fetch(jsonFile, customInit)
    .then(function(resp) {
      return resp.json();
    })
    .then(function(data) {
      console.log(data);
      console.log(data.restaurant[0].address);
    });

  // avec les fonctions fléchées
  // fetch(jsonFile, {mode: 'no-cors'})
  //   .then(response => {
  //     response.json()
  //   })
  //   .then(data => {
  //     console.log("LOL")
  //   })
  //   .catch(err => {
  //     console.log('KIKOO')
  //   });


  // var myObj = JSON.parse(jsonFile);
  // document.getElementById("right").innerHTML = myObj.restaurant[0].address;
});
