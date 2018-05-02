
import {Logger} from "./Logger";
import {HttpClient} from "./HttpClient";
import {ActionDispatcher} from "./ActionDispatcher";
import {Http} from "./Http";

export const logger:ILogger = new Logger();
export const httpClient:HttpClient = new HttpClient(new Http());
export const actionDispatcher:ActionDispatcher = new ActionDispatcher();