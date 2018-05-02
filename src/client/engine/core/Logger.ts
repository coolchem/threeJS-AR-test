
export class Logger implements ILogger {

    log(message:string, data?:any) {

        console.log(message, data ? data : "");
    }
}