// Solar Sensor Tests
// Type: compilation
//  lightLevel(): number
//  isPastThreshold(threshold: number, direction: fwdEnums.OverUnder): boolean
if (fwdSensors.solar1.isPastThreshold(5, fwdEnums.OverUnder.Over)) {
    basic.showNumber(fwdSensors.solar1.lightLevel())
}
