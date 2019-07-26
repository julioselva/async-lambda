const axios = require('axios');

module.exports.main = async (event, context, callback) => {
  console.info(event);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(
        {
          success: true,
        },
        null,
        2
    ),
  });

  setTimeout(() => console.log('5 seconds timeout'), 5000);

  const {
    data: {bio},
  } = await axios.get('https://api.github.com/users/juliomsilva');

  console.info(bio);
  console.info(new Date());
};
