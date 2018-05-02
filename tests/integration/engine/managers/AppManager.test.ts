
import {appManager, appState} from "../../../../src/client/engine/engine";

describe("AppManager integration tests", () => {

    describe("sayHelloAndHi", () => {

        it("should resolve with hello and hi", (done) => {

            appState.subscribeTo("helloValue", (result) => {
                if (result) {
                    expect(result).toEqual("hello hi");
                    done();
                }

            });

            appManager.sayHelloHi();

        });

    });
});