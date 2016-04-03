var config = require('./config.json');

// var twilioClient = require('twilio')(config.accountSid, config.authToken);

// twilioClient.messages.create({
//   to: config.phoneNumbers.katy,
//   from: config.phoneNumbers.self,
//   body: "another message 2",
// }, function(err, message) {
//   console.log(message.sid);
// });


var PriceCalculator = require('./src/PriceCalculator');

var priceCalculator = new PriceCalculator(config.accountSid, config.authToken);

// priceCalculator.calculateSmsCost(config.phoneNumbers.self, config.phoneNumbers.katy);

priceCalculator.calculatePhoneNumberPrice(config.phoneNumbers.self)
  .then(function(price) {
    console.log(price);
  })
  .catch(function(error) {
    console.error(error);
  });
