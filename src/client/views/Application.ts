
let THREE = require("three");

export class Application {

    private appNode:HTMLElement;

    private scene;
    private camera;
    private renderer;

    private cube;
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

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        appNode.appendChild( this.renderer.domElement );

    }

    initialize():void {

        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );
        this.camera.position.z = 5;

        this.animate();

    }

    animate() {
        requestAnimationFrame( () => {
            this.animate();
        } );
        this.cube.rotation.x += 0.02;
        this.cube.rotation.y += 0.02;

        this.renderer.render( this.scene, this.camera );
    }
}