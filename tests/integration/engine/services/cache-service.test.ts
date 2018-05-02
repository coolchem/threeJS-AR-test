
import cacheService = require("../../../../src/client/engine/services/cache-service");

let count:number = 0;

function getCacheKey():string {

    count += 1;

    return "testCache" + count;
}

function getCacheNamespace():string {

    count += 1;

    return "testCacheNamespace" + count;
}

describe("cache-service integration tests", () => {

    describe("store and remove", ( ) => {

        it("should be able to store and remove value from browser cache", () => {

            let cacheKey = getCacheKey();

            cacheService.store(cacheKey, "testValue");

            expect(cacheService.getFromStore(cacheKey)).toEqual("testValue");

            cacheService.remove(cacheKey);

            expect(cacheService.getFromStore(cacheKey)).not.toEqual("testValue");

        });

        it("should be able to store and remove value from browser cache for specified namespace", () => {

            let cacheKey = getCacheKey();
            let nameSpace = getCacheNamespace();

            cacheService.store(cacheKey, "testValue", nameSpace);

            expect(cacheService.getFromStore(cacheKey, nameSpace)).toEqual("testValue");

            cacheService.remove(cacheKey, nameSpace);

            expect(cacheService.getFromStore(cacheKey, nameSpace)).not.toEqual("testValue");

        });

    });

    describe("storeSession and removeSession", ( ) => {

        it("should be able to store and remove value from browser session cache", () => {

            let cacheKey = getCacheKey();

            cacheService.storeSession(cacheKey, "testValue");

            expect(cacheService.getFromSession(cacheKey)).toEqual("testValue");

            cacheService.removeSession(cacheKey);

            expect(cacheService.getFromSession(cacheKey)).not.toEqual("testValue");

        });

        it("should be able to store and remove value from browser session cache for specified namespace", () => {

            let cacheKey = getCacheKey();
            let nameSpace = getCacheNamespace();

            cacheService.storeSession(cacheKey, "testValue", nameSpace);

            expect(cacheService.getFromSession(cacheKey, nameSpace)).toEqual("testValue");

            cacheService.removeSession(cacheKey, nameSpace);

            expect(cacheService.getFromSession(cacheKey, nameSpace)).not.toEqual("testValue");

        });

    });

});