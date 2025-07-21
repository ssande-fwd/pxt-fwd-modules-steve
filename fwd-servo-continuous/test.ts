// Continuous Servo Tests
// Type: compilation
//  conSetEnabled(servo: fwdBase.FwdServoClient, state: boolean): void
//  setSpeed(servo: fwdBase.FwdServoClient, speed: number): void
//  getSpeed(servo: fwdBase.FwdServoClient): number
//  conIsEnabled(servo: fwdBase.FwdServoClient): boolean
//  setupDriving(left: fwdBase.FwdServoClient, right: fwdBase.FwdServoClient, bias = 0)
//  drive(direction: fwdEnums.ForwardReverse, speed: number)
//  stop()
//  turn(angle: number)
fwdMotors.setupDriving(fwdBase.leftServo, fwdBase.leftServo)
fwdMotors.conSetEnabled(fwdBase.leftServo, false)
fwdMotors.setSpeed(fwdBase.leftServo, 0)
if (fwdMotors.conIsEnabled(fwdBase.leftServo)) {
    fwdMotors.drive(fwdEnums.ForwardReverse.Forward, 50)
    fwdMotors.turn(0)
    basic.showNumber(fwdMotors.getSpeed(fwdBase.leftServo))
    fwdMotors.stop()
}
