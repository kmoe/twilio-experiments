var config = require('./config.json');

var twilioClient = require('twilio')(config.accountSid, config.authToken);

twilioClient.messages.create({
  to: config.phoneNumbers.katy,
  from: config.phoneNumbers.self,
  body: "another message 2",
}, function(err, message) {
  console.log(message.sid);
});
