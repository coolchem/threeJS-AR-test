
const THREE = require("three");
declare const window;

window.THREE = THREE;
require("../libs/VRControls.js");
require("../libs/three.ar.min.js");

export class Application {

    private appNode:HTMLElement;

    vrDisplay;
    vrFrameData;
    vrControls;
    arView;
    canvas;
    camera;
    scene;
    renderer;
    cube;
    colors = [
        new THREE.Color( 0xffffff ),
        new THREE.Color( 0xffff00 ),
        new THREE.Color( 0xff00ff ),
        new THREE.Color( 0xff0000 ),
        new THREE.Color( 0x00ffff ),
        new THREE.Color( 0x00ff00 ),
        new THREE.Color( 0x0000ff ),
        new THREE.Color( 0x000000 )
    ];

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
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        appNode.appendChild( this.renderer.domElement );

    }

    initialize():void {

        /**
         * Use the `getARDisplay()` utility to leverage the WebVR API
         * to see if there are any AR-capable WebVR VRDisplays. Returns
         * a valid display if found. Otherwise, display the unsupported
         * browser message.
         */
        THREE.ARUtils.getARDisplay().then( (display) => {
            if (display) {
                this.vrFrameData = new VRFrameData();
                this.vrDisplay = display;
                this.init();
            } else {
                THREE.ARUtils.displayUnsupportedMessage();
            }
        });

        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshNormalMaterial();
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );
        this.camera.position.z = 5;

    }

    init() {
        // Turn on the debugging panel
        let arDebug = new THREE.ARDebug(this.vrDisplay);
        document.body.appendChild(arDebug.getElement());

        // Setup the three.js rendering environment
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        console.log("setRenderer size", window.innerWidth, window.innerHeight);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.autoClear = false;
        this.canvas = this.renderer.domElement;
        document.body.appendChild(this.canvas);
        this.scene = new THREE.Scene();

        // Creating the ARView, which is the object that handles
        // the rendering of the camera stream behind the three.js
        // scene
        this.arView = new THREE.ARView(this.vrDisplay, this.renderer);

        // The ARPerspectiveCamera is very similar to THREE.PerspectiveCamera,
        // except when using an AR-capable browser, the camera uses
        // the projection matrix provided from the device, so that the
        // perspective camera's depth planes and field of view matches
        // the physical camera on the device.
        this.camera = new THREE.ARPerspectiveCamera(
            this.vrDisplay,
            60,
            window.innerWidth / window.innerHeight,
            this.vrDisplay.depthNear,
            this.vrDisplay.depthFar
        );

        // VRControls is a utility from three.js that applies the device's
        // orientation/position to the perspective camera, keeping our
        // real world and virtual world in sync.
        this.vrControls = new THREE.VRControls(this.camera);

        // Create the cube geometry that we'll copy and place in the
        // scene when the user clicks the screen
        let geometry = new THREE.BoxGeometry( 0.05, 0.05, 0.05 );
        let faceIndices = ["a", "b", "c"];
        for (let i = 0; i < geometry.faces.length; i++) {
            let f  = geometry.faces[i];
            for (let j = 0; j < 3; j++) {
                let vertexIndex = f[faceIndices[ j ]];
                f.vertexColors[j] = this.colors[vertexIndex];
            }
        }
        let material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
        this.cube = new THREE.Mesh(geometry, material);

        // Bind our event handlers
        window.addEventListener("resize", () => {
            this.onWindowResize();
        }, false);
        this.canvas.addEventListener("touchstart", () => {
            this.onClick();
        }, false);

        // Kick off the render loop!
        this.update();
    }

    onClick () {
        // Fetch the pose data from the current frame
        let pose = this.vrFrameData.pose;

        // Convert the pose orientation and position into
        // THREE.Quaternion and THREE.Vector3 respectively
        let ori = new THREE.Quaternion(
            pose.orientation[0],
            pose.orientation[1],
            pose.orientation[2],
            pose.orientation[3]
        );

        let pos = new THREE.Vector3(
            pose.position[0],
            pose.position[1],
            pose.position[2]
        );

        let dirMtx = new THREE.Matrix4();
        dirMtx.makeRotationFromQuaternion(ori);

        let push = new THREE.Vector3(0, 0, -1.0);
        push.transformDirection(dirMtx);
        pos.addScaledVector(push, 0.125);

        // Clone our cube object and place it at the camera's
        // current position
        let clone = this.cube.clone();
        this.scene.add(clone);
        clone.position.copy(pos);
        clone.quaternion.copy(ori);
    }

    onWindowResize () {
        console.log("setRenderer size", window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    update() {
        // Clears color from the frame before rendering the camera (arView) or scene.
        this.renderer.clearColor();

        // Render the device's camera stream on screen first of all.
        // It allows to get the right pose synchronized with the right frame.
        // this.arView.render();

        // Update our camera projection matrix in the event that
        // the near or far planes have updated
        this.camera.updateProjectionMatrix();

        // From the WebVR API, populate `vrFrameData` with
        // updated information for the frame
        this.vrDisplay.getFrameData(this.vrFrameData);

        // Update our perspective camera's positioning
        this.vrControls.update();

        // Render our three.js virtual scene
        this.renderer.clearDepth();
        this.renderer.render(this.scene, this.camera);

        // Kick off the requestAnimationFrame to call this function
        // when a new VRDisplay frame is rendered
        this.vrDisplay.requestAnimationFrame(() => {
            this.update();
        });
    }
}