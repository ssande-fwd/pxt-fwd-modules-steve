// Dial Tests
// Type: functional
//  position()
//  onRotated(direction: DialDirection, handler: () => void): void
fwdButtons.dial1.onRotated(fwdEnums.ClockwiseCounterclockwise.Clockwise, () =>
    console.log("turned -> position " + fwdButtons.dial1.position())
)
fwdButtons.dial1.onRotated(
    fwdEnums.ClockwiseCounterclockwise.Counterclockwise,
    () => console.log("turned <- position " + +fwdButtons.dial1.position())
)

// Dial Button tests
// Type: functional
//  onEvent(event: jacdac.ButtonEvent, handler: () => void)
//  holdDuration(): number
//  isPressed(): boolean
console.log("Button pressed? " + fwdButtons.dialButton1.isPressed())
fwdButtons.dialButton1.onEvent(jacdac.ButtonEvent.Down, () =>
    console.log("dialdown")
)
fwdButtons.dialButton1.onEvent(jacdac.ButtonEvent.Up, () =>
    console.log("dialup")
)
fwdButtons.dialButton1.onEvent(jacdac.ButtonEvent.Hold, () =>
    console.log("Hold Duration: " + fwdButtons.dialButton1.holdDuration())
)
