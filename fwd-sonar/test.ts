// Sonar Sensor Tests
// Type: compilation
//  distance(): number
//  isPastThreshold(threshold: number, direction: fwdEnums.OverUnder): boolean
if (fwdSensors.sonar1.isPastThreshold(0, fwdEnums.OverUnder.Over)) {
    basic.showNumber(fwdSensors.sonar1.distance())
}
