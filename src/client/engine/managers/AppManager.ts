
import {ManagerBase} from "./ManagerBase";
import {AppActions} from "../constants/actions/app-action-constants";
import {getValueFromApi, sayHi} from "../services/hi-service";
import {sayHello} from "../services/hello-service";
import {UserActions} from "../constants/actions/user-action-constants";

export class AppManager extends ManagerBase {

    sayHelloHi():void {

        let hello:string = sayHello();

        sayHi().then((result) => {
            let newResult = hello + " " + result;
            this.perform(AppActions.UPDATE_HELLO_MESSAGE, newResult);
            return newResult;
        });

    }

    getValueFromApi():void {
        getValueFromApi().subscribe((value) => {
            this.perform(AppActions.UPDATE_API_VALUE, value);
        });
    }
}