# PushTheButton

The purpose of this application is to give people dealing with addictions an easy and thought-free method of notifying their support network when they need help. 

At the push of a button, text messages are sent to their sponsers informing that their sponsee is struggling and needs help, along with the current location of the sponsee. 

**Future Work:** Application will allow people in recovery keep track of the number of days they have remained abstinent and how often they feel the urge to misuse substances and relapse. 

## Integrations
Internet Button, 
Twilio,
~~Spotify~~,
Firebase

##TODO -
- [x] Make GET request from app to firebase and retrieve user's payload
- [x] Make GET request from app to internet button and retrieve ip address
- [x] POST request to Twilio to contact sponsers
- [ ] ~~POST request to Spotify to play song~~
- [x] Make GET request from app to freegeoip to get latlng
- [x] Retrieve formatted address from latlng
- [x] Finish up user input views
- [ ] Connect front end to server side app
- [ ] Enable 1-click launch across button and web app
