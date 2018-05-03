
import * as express from "express";
import * as WebSocket from "ws";

import "./controller";

const ioHook = require("iohook");

ioHook.on("keydown", event => {

    if (webSocket) {
        wss.clients
            .forEach(client => {
                if (client) {
                    client.send(JSON.stringify(event));
                }
        });
    }

});
ioHook.start(false);

let server;
let env = process.env.NODE_ENV || "development";
let wss;
let webSocket:WebSocket;

export function start(port?:number, plugins?:Array<any>):void {
    let httpPort = port;

    if (!httpPort || httpPort === 0) {
        httpPort = 3000;
    }

    let app = express();

    if (plugins) {
        plugins.forEach((plugin) => {
            app.use(plugin);
        });
    }

    if (env === "development") {

        app.use(express.static("./"));
        app.use(express.static("src/client"));
        app.use("/node_modules", express.static("node_modules"));

    }
    else {
        app.use(express.static("dist/client"));
    }

    app.get("/api/value", function (req, res) {

        res.send(JSON.stringify("Hello From Api!"));
    });

    server = app.listen(httpPort);

    wss = new WebSocket.Server({ server });

    wss.on("connection", (ws: WebSocket) => {

        webSocket = ws;

        // connection is up, let's add a simple simple event
        webSocket.on("message", (message: string) => {

            // log the received message and send it back to the client
            console.log("received: %s", message);
            webSocket.send(`Hello, you sent -> ${message}`);
        });

        // send immediatly a feedback to the incoming connection
        webSocket.send("Hi there, I am a WebSocket server");
    });

    console.log("Server started at port: " + port);

    return server;
}

export function close() {

    server.close();
}

if (env !== "development") {

    start( parseInt(process.env.PORT));
}
