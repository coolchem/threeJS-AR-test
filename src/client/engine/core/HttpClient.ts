
import {Observable} from "rxjs";
import {IHttp} from "./interfaces/IHttp";
import {AjaxRequest, AjaxResponse} from "rxjs/ajax";

let whatwgFetch = require("whatwg-fetch");

declare const fetch:any;

export class HttpClient {

    protected http:IHttp;

    constructor(http:IHttp) {
        this.http = http;
    }

    get(url:string, headers?:Object):Observable<AjaxResponse> {

        return  this.http.get(url, headers).map(checkStatus);
    }

    post(url:string, body?: any, headers?: Object): Observable<AjaxResponse> {

        return  this.http.post(url, body, headers).map(checkStatus);
    }

    put(url: string, body?: any, headers?: Object): Observable<AjaxResponse> {

        return this.http.put(url, body, headers).map(checkStatus);
    }

    patch(url:string, body?: any, headers?: Object): Observable<AjaxResponse> {

        return this.http.patch(url, body, headers).map(checkStatus);

    }

    delete(url:string, headers?: Object): Observable<AjaxResponse> {
        return this.http.delete(url, headers).map(checkStatus);
    }

    head(url:string, headers?:Object):Observable<AjaxResponse> {

        return this.http.put(url, headers).map(checkStatus);
    }

    request(url:string, method:string, body?: any, headers?: Object):Observable<AjaxResponse> {

        let req:AjaxRequest = {};
        req.url = url;
        req.method = method;
        req.headers = headers;
        req.body = body;

        return this.http.request(req).map(checkStatus);
    }

}

function checkStatus(response:AjaxResponse):any {
    if (response.status >= 200 && response.status < 300) {

        return response;
    } else {
        let error:any = new Error(response.responseText);
        error.response = response;
        throw error;
    }
}