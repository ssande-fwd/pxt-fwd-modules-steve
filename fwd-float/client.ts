namespace fwdSensors {
    //% fixedInstances
    export class FwdFloatClient extends modules.ButtonClient {
        constructor(role: string) {
            super(role)
        }

        /**
         * Code to run when the chosen event occurs.
         * @param event raised or lowered
         * @param handler the code to run
         */
        //% group="Float"
        //% block="on $this $event"
        //% blockId=fwd_float_on_change
        onFloatChange(event: fwdEnums.RaisedLowered, handler: () => void) {
            if (event === fwdEnums.RaisedLowered.Raised) {
                super.onEvent(jacdac.ButtonEvent.Up, handler)
            } else if (event === fwdEnums.RaisedLowered.Lowered) {
                super.onEvent(jacdac.ButtonEvent.Down, handler)
            }
        }

        /**
         * Returns the sensor state, 1 is raised and 0 is lowered.
         */
        //% group="Float"
        //% block="$this state"
        //% blockId=fwd_float_state
        floatState(): number {
            if (super.pressed()) {
                return fwdEnums.RaisedLowered.Lowered
            } else {
                return fwdEnums.RaisedLowered.Raised
            }
        }

        /**
         * Returns true if the sensor is in the designated state.
         * @param state raised or lowered
         */
        //% group="Float"
        //% block="$this is $state"
        //% blockId=fwd_float_state_conditional
        floatStateConditional(state: fwdEnums.RaisedLowered): boolean {
            if (state === fwdEnums.RaisedLowered.Raised) {
                return !super.pressed()
            } else {
                return super.pressed()
            }
        }
    }

    //% fixedInstance whenUsed
    export const float1 = new FwdFloatClient("float1")
    //% fixedInstance whenUsed
    export const float2 = new FwdFloatClient("float2")
    //% fixedInstance whenUsed
    export const float3 = new FwdFloatClient("float3")
    //% fixedInstance whenUsed
    export const float4 = new FwdFloatClient("float4")
}
