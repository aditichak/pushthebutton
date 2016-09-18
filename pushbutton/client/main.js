import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http'

import './main.html';
var Particle = require('particle-api-js');

SMS = new Mongo.Collection('sms');
Template.sendSMS.helpers({
});

// Client
var Counts = new Meteor.Collection('count');
Meteor.subscribe('count', function(posts){
  console.log("found event");
});



Template.sendSMS.events({
  'click button': function (event, template) {
    Meteor.call('button_push', function(err, results) {
      console.log(results);
    });
    Meteor.call("getNumbers", function(error, results) {
      //results.data should be a JSON object
      var allUsers = JSON.parse(results.content);
      for (var user in allUsers) {
        var userContacts = allUsers[user]["contacts"];
        for (var contact in userContacts) {
          console.log(userContacts[contact]);
          var phoneNumber = userContacts[contact];
          var smsOptions =  {
            to: phoneNumber,
            message: "Hey, I'm not doing so well right now with the drinking. Can you come over ASAP? I'm at home."
          };
          // Meteor.call('sendSMS', smsOptions, function (err, result) {
          //   if (err) {
          //         alert("There was an error sending the message. See the console for more info");
          //         console.warn("There was an error sending the message.", smsOptions, err);
          //         return;
          //   }
          //   alert("Message sent successfully. See the console for more info.");
          //   //   // log out the db object that was created.
          //   console.log("Message sent. Result: ", result);
          // });
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
