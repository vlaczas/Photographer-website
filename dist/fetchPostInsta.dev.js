"use strict";

fetch("https://easy-instagram-service.p.rapidapi.com/username?username=lytvynenko_anna&random=x8n3nsj2", {
  "method": "GET",
  "headers": {
    "x-rapidapi-key": "89b8f586bemsh9481f0bf43e08f7p199505jsnf1f1f52312f2",
    "x-rapidapi-host": "easy-instagram-service.p.rapidapi.com"
  }
}).then(function (response) {
  return response.json();
}).then(function (data) {
  return console.log(data);
})["catch"](function (err) {
  console.error(err);
});