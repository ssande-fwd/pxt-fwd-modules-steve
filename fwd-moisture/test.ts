// Moisture Sensor Tests
// Type: compilation
//  moistureLevel(): number
//  isPastThreshold(threshold: number, direction: fwdEnums.OverUnder): boolean
if (fwdSensors.moisture1.isPastThreshold(5, fwdEnums.OverUnder.Over)) {
    basic.showNumber(fwdSensors.moisture1.moistureLevel())
}
