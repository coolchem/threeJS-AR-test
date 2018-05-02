
import {ActionDispatcher} from "../core/ActionDispatcher";
import {AppState} from "../AppState";

export abstract class ManagerBase {

    protected actionDispatcher:ActionDispatcher;
    protected appState:AppState;

    constructor(appState:AppState, actionDispatcher:ActionDispatcher) {
        this.actionDispatcher = actionDispatcher;
        this.appState = appState;
    }

    protected perform(actionName:string, ...argArray: any[]):void {
        this.actionDispatcher.perform(actionName, ...argArray);
    }

}