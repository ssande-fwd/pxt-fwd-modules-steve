// pH Sensor Tests
// Type: functional
//  ph(): number
//  isPastThreshold(threshold: number, direction: ThresholdDirection): boolean
//  calibrate(standard1: number, reading1: number, standard2: number, reading2: number): void
console.log("ph: " + fwdSensors.ph1.ph())
input.onButtonPressed(Button.A, function () {
    if (fwdSensors.ph1.isPastThreshold(7, fwdEnums.OverUnder.Over)) {
        console.log(fwdSensors.ph1.ph() + " is over 7")
    }
    if (fwdSensors.ph1.isPastThreshold(7, fwdEnums.OverUnder.Under)) {
        console.log(fwdSensors.ph1.ph() + " is under 7")
    }
    basic.pause(1000)
})
input.onButtonPressed(Button.B, function () {
    fwdSensors.ph1.calibrate(4, 5, 7, 8)
})
