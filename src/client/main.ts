
import {Application} from "./views/views";

let appNode:HTMLDivElement = document.getElementById("app") as HTMLDivElement;

let application:Application = new Application(appNode);

application.initialize();