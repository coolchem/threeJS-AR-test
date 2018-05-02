
import "core-js/es5";
import "core-js/es6";

// importing only required operators from rxjs
import "rxjs";

// importing all operators from rxjs
// import "rxjs/Rx";

// importing managers
import {AppManager} from "./managers/AppManager";
import {actionDispatcher} from "./core";
import {AppState} from "./AppState";
import {UserManager} from "./managers/UserManager";

// Stores
export const appState:AppState = new AppState();
// managers
export const appManager:AppManager = new AppManager(appState, actionDispatcher);
export const userManager:UserManager = new UserManager(appState, actionDispatcher);
