
import {AppActions} from "./constants/actions/app-action-constants";
import {handleAction, State} from "./core/decorators";
import {ModelBase} from "./core/ModelBase";
import {UserModel} from "./models/UserModel";

@State
export class AppState extends ModelBase {

    helloValue:string = "hummm";
    currentUser:UserModel;
    apiValue:string;

    @handleAction(AppActions.UPDATE_HELLO_MESSAGE)
    private handleChangeStateToHello(value:string):void {
        this.helloValue = value;
    }

    @handleAction(AppActions.UPDATE_CURRENT_USER)
    private updateCurrentUser(user:IUser):void {

        if (user) {
            this.currentUser = new UserModel(user);
        }
        else {
            this.currentUser = null;
        }
    }

    @handleAction(AppActions.UPDATE_API_VALUE)
    private updateAPIValue(val:string):void {
        this.apiValue = val;
    }

}