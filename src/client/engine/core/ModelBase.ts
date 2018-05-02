
import {EventDispatcher} from "./EventDispatcher";
import {ActionDispatcher} from "./ActionDispatcher";
import {actionDispatcher} from "./index";

export abstract class ModelBase implements IModel {

    protected ed:EventDispatcher = new EventDispatcher();

    private _actionsMap:any = {};
    protected actionDispatcher:ActionDispatcher;
    protected actionsList:string[];

    constructor() {
        this.actionDispatcher = actionDispatcher;
    }

    flush(): void {

        for (let action in this._actionsMap) {
            this.actionDispatcher.unregisterAction(action as string, this._actionsMap[action]);
        }

    }

    subscribeTo(propertyName:string, callback:(value:string, oldValue?:string) => any, context?:any):void {
        this.ed.addEventListener(propertyName, callback, context);
    }
}