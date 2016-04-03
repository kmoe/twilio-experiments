var config = require('../config.json');
var Q = require('q');
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
  this.lookupsClient.phoneNumbers(desiredPhoneNumber).get({
    type: 'carrier'
  }, function(error, number) {
    this.lookupsClient.phoneNumbers(toPhoneNumber).get({
      type: 'carrier'
    }, function(error, number) {

    })
  }.bind(this));
}

PriceCalculator.prototype.calculatePhoneNumberPrice = function(desiredPhoneNumber, callback) {

  var deferred = Q.defer();

  this.lookupsClient.phoneNumbers(desiredPhoneNumber).get({
    type: 'carrier'
  }, function(error, number) {
    if (error) {
      return deferred.reject(error);
    }
    this.pricingClient.phoneNumbers.countries(number.country_code).get(function(error, country) {
        if (error) {
          return deferred.reject(error);
        }
        var numberType = country.phoneNumberPrices.filter(function(p) {
          return p.numberType === number.carrier.type;
        });
        if (!numberType[0]) {
          return deferred.reject('Number type not found');
        }
        return deferred.resolve(numberType[0].currentPrice);
    });
  }.bind(this));


  return deferred.promise;
}

module.exports = PriceCalculator;
