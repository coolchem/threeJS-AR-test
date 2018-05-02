
import helloService = require("../../../../src/client/engine/services/hello-service");
import Spy = jasmine.Spy;

describe("hello-service unit tests", () => {

    describe("sayHelloAndHi", () => {

        it("should return hello", () => {

            let logSpy:Spy = spyOn(console, "log");

            let result:string = helloService.sayHello();
            expect(result).toEqual("hello");
            expect(logSpy).toHaveBeenCalledWith("hello-service saying hello...");
        });

    });
});