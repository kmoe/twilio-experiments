var config = require('../config.json');
var twilio = require('twilio');
var PricingClient = require('twilio').PricingClient;
var LookupsClient = require('twilio').LookupsClient;

function PriceCalculator(accountSid, accountToken) {
  this.pricingClient = new PricingClient(accountSid, accountToken);
  this.lookupsClient = new LookupsClient(accountSid, accountToken);
}

PriceCalculator.prototype.calculateSmsPrice = function(fromPhoneNumber, toPhoneNumber) {
  this.lookupsClient.phoneNumbers(fromPhoneNumber).get({
    type: 'carrier'
  }, function(error, number) {
    console.log(number);
  });
}

PriceCalculator.prototype.calculateVoicePrice = function(fromPhoneNumber, toPhoneNumber) {

}

PriceCalculator.prototype.calculatePhoneNumberPrice = function(desiredPhoneNumber, callback) {
  this.lookupsClient.phoneNumbers(desiredPhoneNumber).get({
    type: 'carrier'
  }, function(error, number) {
    this.pricingClient.phoneNumbers.countries(number.country_code).get(function(err, country) {
        var numberType = country.phoneNumberPrices.filter(function(p) {
          return p.numberType === number.carrier.type;
        });
        callback(err, numberType[0].currentPrice);
    });
  }.bind(this));
}

module.exports = PriceCalculator;
