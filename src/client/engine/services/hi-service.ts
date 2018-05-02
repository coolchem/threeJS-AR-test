
import {httpClient} from "../core";
import {Resources} from "../constants/resource-constants";
import {Observable} from "rxjs/internal/Observable";
import {AjaxResponse} from "rxjs/ajax";
import {map} from "rxjs/operators";
export function sayHi():Promise<string> {

    console.log("hi-service saying hi...");
    return Promise.resolve("hi");
}

export function getValueFromApi():Observable<string> {

    return httpClient.get(Resources.URL.base + "/api/value").pipe(map((result:AjaxResponse) => {
        return result.response;
    }));
}