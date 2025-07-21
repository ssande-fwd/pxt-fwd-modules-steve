namespace fwdLights {
    /**
     * A Character display module.
     **/
    //% fixedInstances blockGap=8
    export class CharacterDisplayClient extends jacdac.Client {
        private readonly _enabled: jacdac.RegisterClient<[boolean]>
        private readonly _message: jacdac.RegisterClient<[string]>

        constructor(role: string) {
            super(fwdLights.SRV_CHARACTER_SCREEN, role)

            this._enabled = super.addRegister<[boolean]>(
                fwdLights.CharacterDisplayReg.Enabled,
                fwdLights.CharacterDisplayRegPack.Enabled
            )
            this._message = super.addRegister<[string]>(
                fwdLights.CharacterDisplayReg.Message,
                fwdLights.CharacterDisplayRegPack.Message
            )
        }

        /**
         * Sets the text
         * @param text String to display
         */
        //% blockId=jacdac_characterdisplay_set_message_text block="show %characterdisplay string %text"
        //% group="Display"
        //% weight=100
        showString(text: string) {
            this.setMessage(text)
        }

        /**
         * Displays the number.
         * Enables the display if needed.
         */
        //% blockId=jacdac_characterdisplay_set_message_number block="show %characterdisplay number %text"
        //% group="Display"
        //% weight=99
        showNumber(value: number) {
            this.showString(isNaN(value) ? "?" : value.toString())
        }

        /**
         * Determines if the character display is active.
         */
        //% callInDebugger
        //% group="Display"
        //% block="%characterdisplay enabled"
        //% blockId=jacdac_characterdisplay_enabled___get
        //% weight=90
        enabled(): boolean {
            super.start()
            const values = this._enabled.pauseUntilValues() as any[]
            return !!values[0]
        }

        /**
         * Determines if the character display is active.
         */
        //% group="Display"
        //% blockId=jacdac_characterdisplay_enabled___set
        //% block="set %characterdisplay %value=toggleOnOff"
        //% weight=89
        setEnabled(value: boolean) {
            super.start()
            const values = this._enabled.values as any[]
            values[0] = value ? 1 : 0
            this._enabled.values = values as [boolean]
        }

        /**
         * Character to show.
         */
        //% callInDebugger
        //% group="Display"
        //% weight=98
        message(): string {
            super.start()
            const values = this._message.pauseUntilValues() as any[]
            return values[0]
        }

        /**
         * Characters to show.
         */
        //% group="Display"
        //% weight=97
        setMessage(value: string) {
            super.start()
            // this.setEnabled(true)
            const values = this._message.values as any[]
            values[0] = value
            this._message.values = values as [string]
            pause(20)
        }

        /**
         * Clears all text from the display.
         */
        //% group="Display"
        //% blockId=jacdac_characterscreen_clear_cmd
        //% block="clear %characterdisplay"
        //% weight=90
        clear(): void {
            super.start()
            super.sendCommand(
                jacdac.JDPacket.onlyHeader(fwdLights.CharacterScreenCmd.Clear)
            )
            pause(20)
        }

        /**
         * Returns the cursor to the upper-left corner.
         */
        //% group="Display"
        //% blockId=jacdac_characterscreen_home_cmd
        //% block="return cursor to home on %characterdisplay"
        //% weight=89
        home(): void {
            super.start()
            super.sendCommand(
                jacdac.JDPacket.onlyHeader(fwdLights.CharacterScreenCmd.Home)
            )
            pause(20)
        }

        /**
         * Set X, Y position of the print cursor
         * @param x column (0-based)
         * @param y row (0-based)
         */
        //% blockId=jacdac_characterscreen_setcursor
        //% block="set cursor of %characterdisplay|to x %x y %y"
        //% x.defl=0
        //% y.defl=0
        //% weight=88
        //% group="Display"
        setCursor(x: number, y: number): void {
            super.start() // optional but harmless
            super.sendCommand(
                jacdac.JDPacket.from(
                    fwdLights.CharacterScreenCmd.SetCursor,
                    jacdac.jdpack(fwdLights.CharacterScreenCmdPack.SetCursor, [
                        x,
                        y,
                    ])
                )
            )
            pause(20)
        }
    }

    //% fixedInstance whenUsed weight=1 block="character display1"
    export const characterDisplay1 = new CharacterDisplayClient(
        "character Display1"
    )
}
