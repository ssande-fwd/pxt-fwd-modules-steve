// Touch Sensor Tests
// Type: functional
//  onEvent(event: jacdac.ButtonEvent, handler: () => void)
//  holdDuration(): number
//  isPressed(): boolean
console.log("Button pressed? " + fwdButtons.touch1.isPressed())
fwdButtons.touch1.onEvent(jacdac.ButtonEvent.Down, () =>
    console.log("touchdown")
)
fwdButtons.touch1.onEvent(jacdac.ButtonEvent.Up, () => console.log("touchup"))
fwdButtons.touch1.onEvent(jacdac.ButtonEvent.Hold, () =>
    console.log("Hold Duration: " + fwdButtons.touch1.holdDuration())
)
