// Temperature Sensor Tests
// Type: functional
//  temperature(): number
//  isPastThreshold(threshold: number, direction: fwdEnums.OverUnder): boolean
console.log("temperature: " + fwdSensors.temperature1.temperature())
input.onButtonPressed(Button.A, function () {
    if (fwdSensors.temperature1.isPastThreshold(25, fwdEnums.OverUnder.Over)) {
        console.log(fwdSensors.temperature1.temperature() + " is over 25°C")
    }
    if (fwdSensors.temperature1.isPastThreshold(25, fwdEnums.OverUnder.Under)) {
        console.log(fwdSensors.temperature1.temperature() + " is under 25°C")
    }
    basic.pause(1000)
})
