
declare interface IEventDispatcher {
    dispatchEvent(eventName:string, ...args: any[]):void;
    addEventListener(eventName:string, callback: (...args:any[]) => any, context?:any):void;
    removeEventListener(eventName:string, callback:Function):void;
    hasListeners(eventName:string):boolean;
}