// Positional Servo Tests
// Type: functional
// setAngleAndWait() doesn't work in the simulator, but does with physical hardware.
// The "ADD SIMULATORS" button will add a 180 servo instead of a 270
//  posSetEnabled(servo: fwdBase.FwdServoClient, state: boolean): void
//  setAngle(servo: fwdBase.FwdServoClient, angle: number): void
//  getAngle(servo: fwdBase.FwdServoClient): number
//  positionPresets(position: ServoClockPositions): number
//  posIsEnabled(servo: fwdBase.FwdServoClient): boolean
console.log("Enabled?: " + fwdMotors.posIsEnabled(fwdBase.leftServo))
basic.forever(() => {
    console.log("test start")
    fwdMotors.posSetEnabled(fwdBase.leftServo, true)
    console.log("Enabled?: " + fwdMotors.posIsEnabled(fwdBase.leftServo))
    basic.pause(3000)
    fwdMotors.setAngle(
        fwdBase.leftServo,
        fwdMotors.positionPresets(fwdMotors.ServoClockPositions.Position0)
    )
    console.log(fwdMotors.getAngle(fwdBase.leftServo))
    basic.pause(3000)
    fwdMotors.setAngle(
        fwdBase.leftServo,
        fwdMotors.positionPresets(fwdMotors.ServoClockPositions.Position9)
    )
    console.log(fwdMotors.getAngle(fwdBase.leftServo))
    basic.pause(3000)
    console.log("test end")
})
