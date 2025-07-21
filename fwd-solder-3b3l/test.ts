// Smart Soldering Button Tests
// Type: functional
//  onEvent(event: jacdac.ButtonEvent, handler: () => void)
//  holdDuration(): number
//  isPressed(): boolean
console.log("Button pressed? " + fwdButtons.BTN1.isPressed())
fwdButtons.BTN1.onEvent(jacdac.ButtonEvent.Down, () =>
    console.log("buttondown")
)
fwdButtons.BTN1.onEvent(jacdac.ButtonEvent.Up, () => console.log("buttonup"))
fwdButtons.BTN1.onEvent(jacdac.ButtonEvent.Hold, () =>
    console.log("Hold Duration: " + fwdButtons.BTN1.holdDuration())
)

// Smart Soldering Light Tests
// Type: functional
//  setOnOff(on: boolean)
fwdLights.RED.setOnOff(false) // need a client block in on start to trigger simulator / role manager behaviors
input.onButtonPressed(Button.A, function () {
    console.log("Test Start")
    basic.pause(1000)
    fwdLights.RED.setOnOff(true)
    console.log("Light on? " + fwdLights.RED.isOn())
    basic.pause(1000)
    fwdLights.RED.setOnOff(false)
    console.log("Light on? " + fwdLights.RED.isOn())
    basic.pause(1000)
    console.log("Test End")
})
