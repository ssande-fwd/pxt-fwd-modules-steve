// Float Tests
// Type: functional
//  onFloatChange(state: FloatState, handler: () => void)
//  floatStateConditional(state: FloatState): boolean
//  floatState(): string
fwdSensors.float1.onFloatChange(fwdEnums.RaisedLowered.Raised, () => {
    console.log("Event: raised")
})
fwdSensors.float1.onFloatChange(fwdEnums.RaisedLowered.Lowered, () => {
    console.log("Event: lowered")
})
basic.forever(() => {
    if (
        fwdSensors.float1.floatStateConditional(fwdEnums.RaisedLowered.Raised)
    ) {
        console.log("State: " + fwdSensors.float1.floatState())
    }
    if (
        fwdSensors.float1.floatStateConditional(fwdEnums.RaisedLowered.Lowered)
    ) {
        console.log("State: " + fwdSensors.float1.floatState())
    }
    basic.pause(1000)
})
