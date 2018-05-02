import {ManagerBase} from "./ManagerBase";
import {AppActions} from "../constants/actions/app-action-constants";
import {UserActions} from "../constants/actions/user-action-constants";

export class UserManager extends ManagerBase {

    changeUser(username: string):void {

        if (username)
            this.perform(AppActions.UPDATE_CURRENT_USER, {username:username});

    }

    changeUserFirstName(firstName: string):void {

        this.perform(UserActions.UPDATE_USER_FIRST_NAME, firstName);

    }

}