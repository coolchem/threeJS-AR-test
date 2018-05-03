
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

        let connection = new WebSocket(`ws://${window.location.host}`);

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
            let data = JSON.parse(e.data);
            if (data.rawcode === 126) {
                this.cube.position.z = this.cube.position.z + 1;
               // this.mousewheel(1);
            } else if (data.rawcode === 125) {
               // this.mousewheel(-1);

                this.cube.position.z = this.cube.position.z - 1;
            }
            // console.log(e.data);
        };

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 1000000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        appNode.appendChild( this.renderer.domElement );

    }

    mousewheel( e ) {
    let d = e;
    d = ((d > 0) ? 1 :-1);

    let cPos = this.camera.position;
    if (isNaN(cPos.x) || isNaN(cPos.y) || isNaN(cPos.y))
        return;

    let r = cPos.x * cPos.x + cPos.y * cPos.y;
    let sqr = Math.sqrt(r);
    let sqrZ = Math.sqrt(cPos.z * cPos.z + r);

    let nx = cPos.x + ((r === 0) ? 0 :(d * cPos.x / sqr));
    let ny = cPos.y + ((r === 0) ? 0 :(d * cPos.y / sqr));
    let nz = cPos.z + ((sqrZ === 0) ? 0 :(d * cPos.z / sqrZ));

    if (isNaN(nx) || isNaN(ny) || isNaN(nz))
        return;

    cPos.x = nx;
    cPos.y = ny;
    cPos.z = nz;
}

    initialize():void {

        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshNormalMaterial();
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );
        this.camera.position.z = 0;

        this.animate();

    }

    animate() {
        requestAnimationFrame( () => {
            this.animate();
        } );
        this.cube.rotation.x += 0.008;
        this.cube.rotation.y += 0.008;

        this.renderer.render( this.scene, this.camera );
    }
}