
import hiService = require("../../../../src/client/engine/services/hi-service");
import Spy = jasmine.Spy;

describe("hi-service unit tests", () => {

    describe("sayHi", ( ) => {

        it("should resolve with hi", ( done ) => {

            let logSpy:Spy = spyOn(console, "log");

            hiService.sayHi().then((result) => {

                expect(result).toEqual("hi");
                expect(logSpy).toHaveBeenCalledWith("hi-service saying hi...");
                done();
            });
        });

    });
});