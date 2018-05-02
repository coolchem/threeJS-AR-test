
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

export class EventDispatcher implements IEventDispatcher {

    protected handlers:any = {};

    dispatchEvent(eventName:string, ...args: any[]):void {

        if (!this.isValidActionOrEventName(eventName))
            throw new Error(Errors.ERROR_PUBLISHING_EVENT_NAME_NOT_TYPE_STRING);

        let handlers:Array<HandlerObject>;

        handlers = this.getHandlers(eventName);

        if (handlers) {

            for (let i = 0; i < handlers.length; i++) {
                let handler:HandlerObject = handlers[i];

                handler.handler.call(handler.context, ...args);
            }

        }

    }

    addEventListener(eventName:string, callback:(...args:any[]) => any, context?:any):void {

        if (!this.isValidActionOrEventName(eventName))
            throw new Error(Errors.ERROR_SUBSCRIBING_EVENT_NAME_NOT_TYPE_STRING);

        if (callback === undefined || callback === null)
            throw new Error(Errors.ERROR_NO_HANDLER_WHILE_SUBSCRIBING);

        if (typeof callback !== "function")
            throw new Error(Errors.ERROR_SUBSCRIBING_HANDLER_NOT_TYPE_FUNCTION);

        this.toggleSubscription(eventName, callback, true, context);

    }

    removeEventListener(eventName:string, callback:Function):void {

        if (!this.isValidActionOrEventName(eventName))
            throw new Error(Errors.ERROR_UNSUBSCRIBING_EVENT_NAME_NOT_TYPE_STRING);

        if (callback === undefined || callback === null)
            throw new Error(Errors.ERROR_NO_HANDLER_WHILE_UNSUBSCRIBING);

        if (typeof callback !== "function")
            throw new Error(Errors.ERROR_UNSUBSCRIBING_HANDLER_NOT_TYPE_FUNCTION);

        this.toggleSubscription(eventName, callback, false);

    }

    hasListeners(eventName:string):boolean {
        return this.handlers[eventName] !== undefined && this.handlers[eventName].length > 0;
    }

    private toggleSubscription(eventName:string, callback:Function, subscribe:boolean, context?:any):void {
        let handlers:Array<HandlerObject> = this.getHandlers(eventName);

        for (let i = 0; i < handlers.length ; i++) {

            let handler:HandlerObject = handlers[i];

            if (handler.handler === callback) {

                if (subscribe === false) {

                    handlers.splice(handlers.indexOf(handler), 1);
                }

                return;
            }
        }

        handlers.push(new HandlerObject(callback, context));
    }
    private getHandlers(eventName:string):Array<HandlerObject> {
        let handlers:Array<HandlerObject>;

        handlers = this.handlers[eventName];

        if (handlers === null || handlers === undefined)
            this.handlers[eventName] = handlers = [];

        return handlers;
    }

    hasEventListener(eventName:string):boolean {

        return this.handlers[eventName] !== undefined && this.handlers[eventName].length > 0;
    }

    protected isValidActionOrEventName(eventName:string):boolean {

        return eventName !== undefined && eventName !== null && typeof eventName === "string";
    }
}