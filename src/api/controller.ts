
let async = require("async");
const noble = require("noble");

let peripheralIdOrAddress = "346627572c4c4fcebcd59f49cea41383";

noble.on("stateChange", function(state) {
    if (state === "poweredOn") {
        noble.startScanning();
    } else {
        noble.stopScanning();
    }
});

noble.on("discover", function(peripheral) {
    if (peripheral.id === peripheralIdOrAddress || peripheral.address === peripheralIdOrAddress) {
        noble.stopScanning();

        console.log("peripheral with ID " + peripheral.id + " found");
        let advertisement = peripheral.advertisement;

        let localName = advertisement.localName;
        let txPowerLevel = advertisement.txPowerLevel;
        let manufacturerData = advertisement.manufacturerData;
        let serviceData = advertisement.serviceData;
        let serviceUuids = advertisement.serviceUuids;

        if (localName) {
            console.log("  Local Name        = " + localName);
        }

        if (txPowerLevel) {
            console.log("  TX Power Level    = " + txPowerLevel);
        }

        if (manufacturerData) {
            console.log("  Manufacturer Data = " + manufacturerData.toString("hex"));
        }

        if (serviceData) {
            console.log("  Service Data      = " + JSON.stringify(serviceData, null, 2));
        }

        if (serviceUuids) {
            console.log("  Service UUIDs     = " + serviceUuids);
        }

        console.log();

        explore(peripheral);
    }
});

function explore(peripheral) {
    console.log("services and characteristics:");

    peripheral.on("disconnect", function() {
        process.exit(0);
    });

    peripheral.connect(function(error) {
        peripheral.discoverServices([], function(error, services) {
            let serviceIndex = 0;

            async.whilst(
                function () {
                    return (serviceIndex < services.length);
                },
                function(callback) {
                    let service = services[serviceIndex];
                    let serviceInfo = service.uuid;

                    if (service.name) {
                        serviceInfo += " (" + service.name + ")";
                    }
                    console.log(serviceInfo);

                    service.discoverCharacteristics([], function(error, characteristics) {
                        let characteristicIndex = 0;

                        async.whilst(
                            function () {
                                return (characteristicIndex < characteristics.length);
                            },
                            function(callback) {
                                let characteristic = characteristics[characteristicIndex];
                                let characteristicInfo = "  " + characteristic.uuid;

                                if (characteristic.name) {
                                    characteristicInfo += " (" + characteristic.name + ")";
                                }

                                async.series([
                                    function(callback) {
                                        characteristic.discoverDescriptors(function(error, descriptors) {
                                            async.detect(
                                                descriptors,
                                                function(descriptor, callback) {
                                                    if (descriptor.uuid === "2901") {
                                                        return callback(descriptor);
                                                    } else {
                                                        return callback();
                                                    }
                                                },
                                                function(userDescriptionDescriptor) {
                                                    if (userDescriptionDescriptor) {
                                                        userDescriptionDescriptor.readValue(function(error, data) {
                                                            if (data) {
                                                                characteristicInfo += " (" + data.toString() + ")";
                                                            }
                                                            callback();
                                                        });
                                                    } else {
                                                        callback();
                                                    }
                                                }
                                            );
                                        });
                                    },
                                    function(callback) {
                                        characteristicInfo += "\n    properties  " + characteristic.properties.join(", ");

                                        if (characteristic.properties.indexOf("read") !== -1) {
                                            characteristic.read(function(error, data) {
                                                if (data) {
                                                    let string1 = data.toString("ascii");

                                                    characteristicInfo += "\n    value       " + data.toString("hex") + " | '" + string1 + "'";
                                                }
                                                callback();
                                            });
                                        } else {
                                            callback();
                                        }
                                    },
                                    function() {
                                        console.log(characteristicInfo);
                                        characteristicIndex++;
                                        callback();
                                    }
                                ]);
                            },
                            function(error) {
                                serviceIndex++;
                                callback();
                            }
                        );
                    });
                },
                function (err) {
                    peripheral.disconnect();
                }
            );
        });
    });
}

/*
noble.on("stateChange", function(state) {
    if (state === "poweredOn") {
        noble.startScanning();
    } else {
        noble.stopScanning();
    }
});

noble.on("discover", function(peripheral) {
    console.log("peripheral discovered (" + peripheral.id +
        " with address <" + peripheral.address +  ", " + peripheral.addressType + ">," +
        " connectable " + peripheral.connectable + "," +
        " RSSI " + peripheral.rssi + ":");
    console.log("\thello my local name is:");
    console.log("\t\t" + peripheral.advertisement.localName);
    console.log("\tcan I interest you in any of the following advertised services:");
    console.log("\t\t" + JSON.stringify(peripheral.advertisement.serviceUuids));

    let serviceData = peripheral.advertisement.serviceData;
    if (serviceData && serviceData.length) {
        console.log("\there is my service data:");
        for (let i in serviceData) {
            console.log("\t\t" + JSON.stringify(serviceData[i].uuid) + ": " + JSON.stringify(serviceData[i].data.toString("hex")));
        }
    }
    if (peripheral.advertisement.manufacturerData) {
        console.log("\there is my manufacturer data:");
        console.log("\t\t" + JSON.stringify(peripheral.advertisement.manufacturerData.toString("hex")));
    }
    if (peripheral.advertisement.txPowerLevel !== undefined) {
        console.log("\tmy TX power level is:");
        console.log("\t\t" + peripheral.advertisement.txPowerLevel);
    }

    console.log();
});*/
