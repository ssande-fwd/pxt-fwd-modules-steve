// Voltage and Current Sensor Tests
// Type: functional
// The "ADD SIMULATORS" button doesn't work for this one. Need to manually add DC current/voltage measurement simulator.
//  <sensor>(): number
//  isPastThreshold(threshold: number, direction: ThresholdDirection): boolean
console.log("Voltage: " + fwdSensors.voltage1.voltage()) // this line just ensures client is detected immediately (input block interferes)
console.log("Current: " + fwdSensors.current1.current()) // this line just ensures client is detected immediately (input block interferes)
input.onButtonPressed(Button.A, function () {
    if (fwdSensors.voltage1.isPastThreshold(5, fwdEnums.OverUnder.Over)) {
        console.log(fwdSensors.voltage1.voltage() + " is over 5V")
    }
    if (fwdSensors.voltage1.isPastThreshold(5, fwdEnums.OverUnder.Under)) {
        console.log(fwdSensors.voltage1.voltage() + " is under 5V")
    }
    if (fwdSensors.current1.isPastThreshold(100, fwdEnums.OverUnder.Over)) {
        console.log(fwdSensors.current1.current() + " is over 100mA")
    }
    if (fwdSensors.current1.isPastThreshold(100, fwdEnums.OverUnder.Under)) {
        console.log(fwdSensors.current1.current() + " is under 100mA")
    }
})
