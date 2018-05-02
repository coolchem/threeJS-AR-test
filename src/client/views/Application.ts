
let THREE = require("three");

export class Application {

    private appNode:HTMLElement;

    /*
     * This Is an application
     * */
    constructor(appNode:HTMLElement) {

        this.appNode = appNode;

        let connection = new WebSocket("ws://10.0.0.26:3000");

        // When the connection is open, send some data to the server
        connection.onopen = function () {
            connection.send("Ping"); // Send the message 'Ping' to the server
        };

        // Log errors
        connection.onerror = function (error) {
            console.log("WebSocket Error " + error);
        };

        // Log messages from the server
        connection.onmessage =  (e) => {
            console.log(e.data);
        };

    }

    initialize():void {

    }
}