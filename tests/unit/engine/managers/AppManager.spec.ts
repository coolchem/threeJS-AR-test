
import {AppManager} from "../../../../src/client/engine/managers/AppManager";
import {actionDispatcher} from "../../../../src/client/engine/core/index";
import {appState} from "../../../../src/client/engine/engine";

describe("AppManager unit tests", () => {

    let appManager:AppManager;

    beforeEach(() => {
        appManager = new AppManager(appState, actionDispatcher);
    });
    describe("sayHelloHi", () => {

        it("should perform action ", (done) => {

            appManager.sayHelloHi();

            done();

        });

        it("should reject with error, if assistant rejects with error", (done) => {

            appManager.sayHelloHi();
            done();
        });

    });
});