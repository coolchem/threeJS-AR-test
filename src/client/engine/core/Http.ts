
import {Observable} from "rxjs";
import {Resources} from "../constants/resource-constants";
import {IHttp} from "./interfaces/IHttp";
import {ajax, AjaxRequest, AjaxResponse} from "rxjs/ajax";

let whatwgFetch = require("whatwg-fetch");

declare const fetch:any;

export class Http implements IHttp {

    get(url:string, headers?:Object):Observable<AjaxResponse> {

        let req:AjaxRequest = {};
        req.headers = headers;
        req.url = url;
        req.method = Resources.request.methods.GET;
        return  this.request(req);
    }

    post(url: string, body?: any, headers?: Object): Observable<AjaxResponse> {

        let req:AjaxRequest = {};
        req.headers = headers;
        req.url = url;
        req.body = body;
        req.method = Resources.request.methods.POST;

        return  this.request(req);
    }
    put(url: string, body?: any, headers?: Object): Observable<AjaxResponse> {

        let req:AjaxRequest = {};
        req.headers = headers;
        req.url = url;
        req.body = body;
        req.method = Resources.request.methods.PUT;

        return  this.request(req);
    }

    patch(url: string, body?: any, headers?: Object): Observable<AjaxResponse> {
        let req:AjaxRequest = {};
        req.headers = headers;
        req.url = url;
        req.body = body;
        req.method = Resources.request.methods.POST;

        return  this.request(req);
    }

    delete(url: string, headers?: Object): Observable<AjaxResponse> {
        let req:AjaxRequest = {};
        req.headers = headers;
        req.url = url;
        req.method = Resources.request.methods.DELETE;
        return  this.request(req);
    }

    head(url:string, headers?:Object):Observable<AjaxResponse> {

        let req:AjaxRequest = {};
        req.headers = headers;
        req.url = url;
        req.method = Resources.request.methods.HEAD;

        return  this.request(req);
    }

    request(request:AjaxRequest):Observable<AjaxResponse> {

        return ajax(request);
    }

}