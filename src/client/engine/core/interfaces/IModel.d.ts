
declare interface IModel {

    subscribeTo(propertyName:string, callback:(value:string, oldValue?:string) => any, context?:any):void
    flush():void;
}