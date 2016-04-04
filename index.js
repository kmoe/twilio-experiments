var config = require('./config.json');

// var twilioClient = require('twilio')(config.accountSid, config.authToken);

// twilioClient.messages.create({
//   to: config.phoneNumbers.katy,
//   from: config.phoneNumbers.self,
//   body: "another message 2",
// }, function(err, message) {
//   console.log(message.sid);
// });


var PriceCalculator = require('twilio-price-calculator');

var priceCalculator = new PriceCalculator(config.accountSid, config.authToken);


priceCalculator.calculatePhoneNumberPrice(config.phoneNumbers.self)
  .then(function(price) {
    console.log(price);
  })
  .catch(function(error) {
    console.error(error);
  });


priceCalculator.calculateVoicePrice(config.phoneNumbers.self, config.phoneNumbers.katy)
  .then(function(price) {
    console.log(price);
  })
  .catch(function(error) {
    console.error(error);
  });

priceCalculator.calculateSmsPrice(config.phoneNumbers.self, config.phoneNumbers.katy)
  .then(function(price) {
    console.log(price);
  })
  .catch(function(error) {
    console.error(error);
  });
