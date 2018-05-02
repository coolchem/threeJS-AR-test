
import {AjaxRequest, AjaxResponse} from "rxjs/Rx";
import {Observable} from "rxjs/Observable";

declare interface IHttp {

    get(url:string, headers?:Object):Observable<AjaxResponse>;
    post(url: string, body?: any, headers?: Object): Observable<AjaxResponse>;
    put(url: string, body?: any, headers?: Object): Observable<AjaxResponse>;
    delete(url: string, headers?: Object): Observable<AjaxResponse>;
    patch(url: string, body?: any, headers?: Object): Observable<AjaxResponse>;
    head(url:string, headers?:Object):Observable<AjaxResponse>;
    request(req:AjaxRequest):Observable<AjaxResponse>;
}
