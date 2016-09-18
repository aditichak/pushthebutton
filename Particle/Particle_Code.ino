// This #include statement was automatically added by the Particle IDE.
#include "HttpClient/HttpClient.h"

// This #include statement was automatically added by the Particle IDE.
#include "InternetButton/InternetButton.h"

   // Next time to contact the server
HttpClient http;


http_header_t headers[] = {
    //  { "Content-Type", "application/json" },
    //  { "Accept" , "application/json" },
    { "Accept" , "*/*"},
    { NULL, NULL } // NOTE: Always terminate headers will NULL
};



/* How about we make this interactive? */

InternetButton b = InternetButton();




void setup() {
    // Tell b to get everything ready to go
    // Use b.begin(1); if you have the original SparkButton, which does not have a buzzer or a plastic enclosure
    // to use, just add a '1' between the parentheses in the code below.
    b.begin();
    Serial.begin(9600);


  
}



void loop(){

    
    // When you click the second button (at the 3 o'clock position) let's turn that LED on
    if(b.buttonOn(2) && b.buttonOn(1) && b.buttonOn(3) && b.buttonOn(4)){
        
        b.ledOn(1, 0, 255, 0);
        b.ledOn(2, 0, 255, 0);
        b.ledOn(3, 0, 255, 0);
        b.ledOn(4, 0, 255, 0);
        b.ledOn(5, 0, 255, 0);
        b.ledOn(6, 0, 255, 0);
        b.ledOn(7, 0, 255, 0);
        b.ledOn(8, 0, 255, 0);
        b.ledOn(9, 0, 255, 0);
        b.ledOn(10, 0, 255, 0);
        b.ledOn(11, 0, 255, 0);
        b.ledOn(12, 0, 255, 0);
        
        
        String ip = WiFi.gatewayIP();


        Particle.publish("ip_address",ip, PRIVATE);
        Particle.publish("button_push", "true");
        delay(2000);
        
    }
    // And if the button's not on, then the LED should be off
    else {
        
        b.ledOff(12);
        b.ledOff(11);
        b.ledOff(10);
        b.ledOff(9);
        b.ledOff(8);
        b.ledOff(7);
        b.ledOff(6);
        b.ledOff(5);
        b.ledOff(4);
        b.ledOff(3);
        b.ledOff(2);
        b.ledOff(1);
        
    }

    /* Much like the LEDs, there are also functions to check if all the buttons are on- b.allButtonsOn()
    or if all the buttons are off- b.allButtonsOff() */
}
