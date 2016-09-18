import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http'

import './main.html';
var Particle = require('particle-api-js');
var particle = new Particle();

var address = "";

SMS = new Mongo.Collection('sms');
Template.sendSMS.helpers({
});

// Client

Template.sendSMS.events({
  'click button': function (event, template) {
    Meteor.call('button_push', function(err, results) {
      console.log(results.data.results[1].formatted_address);
      address = results.data.results[1].formatted_address;
    });
    Meteor.call("getNumbers", function(error, results) {
      //results.data should be a JSON object
      var allUsers = JSON.parse(results.content);
      for (var user in allUsers) {
        var userNumber = allUsers[user]["phone"];
        var reason = allUsers[user]["reasons"];
        var userName = allUsers[user]["name"];
        var smsOptions =  {
          to: userNumber,
          message: "Hey " + userName + " your friends are on their way. In the mean time, this one of the reasons you quit drinking: " + reason
        };

        Meteor.call('sendSMS', smsOptions, function (err, result) {
          if (err) {
            alert("There was an error sending the message. See the console for more info");
            console.warn("There was an error sending the message.", smsOptions, err);
            return;
          }
          alert("Message sent successfully. See the console for more info.");
          //   // log out the db object that was created.
          console.log("Message sent. Result: ", result);
        });
        var userContacts = allUsers[user]["contacts"];
        for (var contact in userContacts) {
          console.log(userContacts[contact]);
          var phoneNumber = userContacts[contact];
          var smsOptions =  {
            to: phoneNumber,
            message: "Hey, I'm not doing so well right now with the drinking. Can you come over ASAP? I'm at " + address
          };
          Meteor.call('sendSMS', smsOptions, function (err, result) {
            if (err) {
                  alert("There was an error sending the message. See the console for more info");
                  console.warn("There was an error sending the message.", smsOptions, err);
                  return;
            }
            alert("Message sent successfully. See the console for more info.");
            //   // log out the db object that was created.
            console.log("Message sent. Result: ", result);
          });
          }
        }
      })
  }
    });


Template.smsLog.helpers({
  sms: function () {
    return SMS.find({}, {sort: {dateCreated: -1}});
  },
  isOutgoing: function () {
    return this.type === "outgoing"
  }
});
