import {ModelBase} from "../core/ModelBase";
import {handleAction} from "../core/decorators";
import {UserActions} from "../constants/actions/user-action-constants";

export class UserModel extends ModelBase {

    user: IUser;

    userFirstName:string = "";

    constructor(user:IUser) {
        super();
        this.user = user;
    }

    @handleAction(UserActions.UPDATE_USER_FIRST_NAME)
    handleUserFirstNameUpdated(value:string):void {
        this.userFirstName = value;
    }
}