$(function() {
// test API Call with ajax
  var settings = {
    "url": "https://www.potterapi.com/v1/characters/5a0fa4daae5bc100213c232e?key=$2a$10$8aGIy84sCcJiJvYuK.DnHekNSW9WLzjaVqKZ3.bjKema7dXkuiF6.",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(response.name);
  });

});
