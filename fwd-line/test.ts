// Line Follower Tests
// Type: compilation
//  onLineSensorStateChange(handler: () => void): void
//  lineSensorState(): fwdEnums.OnOff
//  isLineSensorState(state: fwdEnums.OnOff): boolean
fwdSensors.line1.onLineSensorStateChange(function () {
    if (fwdSensors.line1.isLineSensorState(fwdEnums.OnOff.Off)) {
        basic.showNumber(fwdSensors.line1.lineSensorState())
    }
})
