import { Meteor } from 'meteor/meteor';
var Particle = require('particle-api-js');

/// Create handle to sms collection in database.
SMS = new Mongo.Collection('sms');
var oauth = "";
var particle = new Particle();
var ip = "";

// Configure the Twilio client
var twilioClient = new Twilio({
    from: Meteor.settings.TWILIO.FROM,
    sid: Meteor.settings.TWILIO.SID,
    token: Meteor.settings.TWILIO.TOKEN
});
var getTwilioMessages = Meteor.wrapAsync(twilioClient.client.messages.list, twilioClient.client.messages);

particle.getEventStream({
    deviceId: '270036000647343138333038',
    auth: 'afbd932b7580f1005c4195c60b7065626697c6bb' }).then(
    function(stream) {
        stream.on('ip_address', function(data) {
            console.log("Event: " + data.data);
            ip = data.data;
        });
    });

Meteor.methods({
    'sendSMS': function (opts) {
        console.log("Attempting to send message with options", opts);
        try {
            var result = twilioClient.sendSMS({
                to: opts.to,
                body: opts.message
            });
        } catch (err) {
            throw new Meteor.error(err);
        }
        result.type = "outgoing";
        var smsId = SMS.insert(result);
        result._id = smsId;
        console.log("New message sent:", result);
        return result;
    },
    "getNumbers": function () {
        return Meteor.http.call("GET", "https://pushthebutton-e86b3.firebaseio.com/users.json");
    },
    "button_push": function () {
        //Get your devices events
        var results = Meteor.http.call("GET", "https://freegeoip.net/json/");
        var lat = results.data.latitude;
        var long = results.data.longitude;
        return Meteor.http.call("GET","https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyAHf4GgalKK0VgCjyzza781M9P7w9febvo");
    }
});


function updateMessages () {
    getTwilioMessages(function (err, data) {
        if (err) {
            console.warn("There was an error getting data from twilio", err);
            return
        }
        data.messages.forEach(function (message) {
            if (SMS.find({sid: message.sid}).count() > 0) {
                return;
            }
            if (message.from === Meteor.settings.TWILIO.FROM) {
                message.type = "outgoing";
            } else {
                message.type = "incoming";
            }
            SMS.insert(message);
        });
    });
}

updateMessages();
Meteor.setInterval(updateMessages, 60000);