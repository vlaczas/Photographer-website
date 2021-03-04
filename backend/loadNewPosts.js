const axios = require('axios');
const fs = require('fs');

const options = {
  method: 'GET',
  url: 'https://easy-instagram-service.p.rapidapi.com/username',
  params: { username: 'chasowska.anna', random: 'x8n3nsj2' },
  headers: {
    'x-rapidapi-key': '89b8f586bemsh9481f0bf43e08f7p199505jsnf1f1f52312f2',
    'x-rapidapi-host': 'easy-instagram-service.p.rapidapi.com',
  },
};

axios
  .request(options)
  .then((response) => {
    fs.writeFileSync(
      '../public/js/jsons/data.json',
      JSON.stringify(response.data)
    );
  })
  .catch(function (error) {
    console.error(error);
  });
