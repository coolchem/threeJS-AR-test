
import "proxy-polyfill/proxy.min.js";
import {actionDispatcher} from "./index";
import {EventDispatcher} from "./EventDispatcher";
import {ModelBase} from "./ModelBase";

export function handleAction(actionName:string):any {

    return function (target: any, propertyKey: string):void {

        if (!target.actionsList) {
            target.actionsList = {};
        }

        target.actionsList[actionName] = target[propertyKey];

    };

}

export function State<T extends {new(...args:any[]):ModelBase}>(base:T) {

    return class State extends base {

        constructor(...args:any[]) {

            super(...args);
            return buildModelProxy(this);

        }
    };
}

function buildModelProxy(model:ModelBase):any {

    let proxy = new Proxy(model, {

        set(target: any, p:string, value:any, receiver:any):boolean {

            let oldValue:any = target[p];
            let newValue:any = value;

            if (value instanceof ModelBase) {

                let model:ModelBase = target[p];

                if (model)
                    target[p].flush();

                newValue = buildModelProxy(value);

            }

            if (process.env.NODE_ENV === "development") {

                if (value instanceof Object && !(value instanceof ModelBase))
                    Object.freeze(value);

                if (value instanceof Array) {

                    value.forEach(Object.freeze);
                }
            }

            target[p] = newValue;

            if (target["ed"])
                (target["ed"] as EventDispatcher).dispatchEvent(p, value, oldValue);

            return true;
        }
    });

    registerActions(model, proxy);

    return new Proxy(model, {

        set(target:any, p:string, value:any):boolean {

            if (process.env.NODE_ENV === "development") {

                throw new Error("Cannot change property of a model from outside. Model can change its properties via action handlers only");
            }
            console.warn("Attempting to set value on model externally. model will not be updated");

            return false;

        }
    });
}

function registerActions(model, proxy):void {

    if (model.actionsList) {

        for (let actionName in model.actionsList) {
            let actionHandler:any = model.actionsList[actionName];
            model._actionsMap[actionName] = actionHandler;
            actionDispatcher.registerAction(actionName, actionHandler, proxy);
        }
    }
}