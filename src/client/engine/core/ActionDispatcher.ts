
import {Errors} from "../constants/error-constants";

class HandlerObject {

    private _handler:Function;
    private _context:any;

    get handler():Function {
        return this._handler;
    }

    get context():any {
        return this._context;
    }

    constructor(handler:Function, context:any) {
        this._handler = handler;
        this._context = context;
    }
}

export class ActionDispatcher {

    protected actionHandlers:any = {};

    protected getHandler(actionName:string):HandlerObject {

        let handlerObject:HandlerObject = this.actionHandlers[actionName];

        if (handlerObject) {

            return handlerObject;
        }
        return null;
    }

    hasAction(actionName:string):boolean {
        return this.getHandler(actionName) !== null;
    }

    registerAction(actionName:string, handler:Function, context?:any):void {

        if (!this.isValidActionName(actionName))
            throw new Error(Errors.ERROR_REGISTERING_ACTION_NAME_NOT_TYPE_STRING);

        if (handler === undefined || handler === null)
            throw new Error(Errors.ERROR_REGISTERING_ACTION_NO_HANDLER_GIVEN);

        if (typeof handler !== "function")
            throw new Error(Errors.ERROR_REGISTERING_ACTION_HANDLER_NOT_TYPE_FUNCTION);

        let handler1:HandlerObject = this.getHandler(actionName);

        if (handler1)
            throw new Error(Errors.ERROR_REGISTERING_ACTION_ONLY_ONE_HANDLER_ALLOWED);
        else
            this.actionHandlers[actionName] = new HandlerObject(handler, context);
    }

    perform(actionName:any, ...argArray: any[]):void {

        if (!this.isValidActionName(actionName))
            throw new Error(Errors.ERROR_TAKING_ACTION_ACTION_NAME_NOT_TYPE_STRING);

        let handler1:HandlerObject = this.getHandler(actionName);

        if (handler1) {

            let handler:Function = handler1.handler;
            let context:any = handler1.context;

            handler.call(context, ...argArray);
        }
    }

    unregisterAction(actionName:string, handler:Function):void {
        if (!this.isValidActionName(actionName))
            throw new Error(Errors.ERROR_UNREGISTERING_ACTION_NAME_NOT_TYPE_STRING);

        if (handler === undefined || handler === null)
            throw new Error(Errors.ERROR_UNREGISTERING_ACTION_NO_HANDLER_GIVEN);

        if (typeof handler !== "function")
            throw new Error(Errors.ERROR_UNREGISTERING_ACTION_HANDLER_NOT_TYPE_FUNCTION);

        this.actionHandlers[actionName] = null;
    }

    protected isValidActionName(eventName:string):boolean {

        return eventName !== undefined && eventName !== null && typeof eventName === "string";
    }
}