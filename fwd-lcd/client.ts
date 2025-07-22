namespace fwdLights {
    /**
     * Initializing the LCD makes it's blocks work more reliably in "on start".
     * Initialization will delay your program execution by 3 seconds.
     */
    //% block="initialize LCD's"
    //% blockId=fwd_lcd_initialize
    //% group="LCD"
    export function initialize() {
        pause(3000)
    }

    //% fixedInstances blockGap=8
    export class LCDClient extends jacdac.Client {
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

            this.setEnabled(true)
        }

        /**
         * Prints the provided number on the designated line of the LCD. Limited to 16 characters.
         * A number over 16 characters is replaced with the message ">16 chars".
         * An invalid line parameter triggers the message "err:!1-2" on line 1.
         * @param number1 the number to print
         * @param line the line to print the number on
         */
        //% block="print number $number1 on line $line of $this"
        //% line.min=1 line.max=2 line.defl=1
        //% blockId=fwd_lcd_print_line_number
        //% group="LCD"
        printLineNumber(number1: number, line: number) {
            let string1 = number1.toString()

            if (string1.length > 16) {
                string1 = ">16 chars"
            }
            this.printLineString(string1, line)
        }

        /**
         * Prints the provided text on the designated line of the LCD. Limited to 16 characters.
         * A string over 16 characters gets truncated.
         * An invalid line parameter triggers the message "err:!1-2" on line 1.
         * @param message the message to print
         * @param line the line to print the message on
         */
        //% block="print string $message on line $line of $this"
        //% line.min=1 line.max=2 line.defl=1
        //% blockId=fwd_lcd_print_line_string
        //% group="LCD"
        printLineString(message: string, line: number) {
            line -= 1

            if (message.length > 16) {
                message = message.substr(0, 16)
            }

            if (line < 0 || line > 1) {
                this.setCursor(0, 0)
                this.setMessage("                ")
                this.setCursor(0, 0)
                this.setMessage("err:!1-2")
            } else {
                this.setCursor(0, line)
                this.setMessage("                ")
                this.setCursor(0, line)
                this.setMessage(message)
            }
        }

        /**
         * Prints the provided number on the designated quadrant of the LCD. Limited to 8 characters.
         * A number over 8 characters is replaced with the message ">8 chars".
         * An invalid quadrant parameter triggers the message "err:!1-4" in quadrant 1.
         * @param number1 the number to print
         * @param quadrant the quadrant to print the number on
         */
        //% block="print number $number1 on quadrant $quadrant of $this"
        //% quadrant.min=1 quadrant.max=4 quadrant.defl=1
        //% blockId=fwd_lcd_print_quadrant_number
        //% group="LCD"
        printQuadrantNumber(number1: number, quadrant: number) {
            let string1 = number1.toString()

            if (string1.length > 8) {
                string1 = ">8 chars"
            }
            this.printQuadrantString(string1, quadrant)
        }

        /**
         * Prints the provided text on the designated quadrant of the LCD. Limited to 8 characters.
         * A string over 8 characters gets truncated.
         * An invalid quadrant parameter triggers the message "err:!1-4" in quadrant 1.
         * @param message the message to print
         * @param quadrant the quadrant to print the message on
         */
        //% block="print string $message on quadrant $quadrant of $this"
        //% quadrant.min=1 quadrant.max=4 quadrant.defl=1
        //% blockId=fwd_lcd_print_quadrant_string
        //% group="LCD"
        printQuadrantString(message: string, quadrant: number) {
            let col = 0
            let row = 0

            if (message.length > 8) {
                message = message.substr(0, 8)
            }

            switch (quadrant) {
                case 1:
                    break
                case 2:
                    col = 16 - message.length
                    row = 0
                    break
                case 3:
                    col = 0
                    row = 1
                    break
                case 4:
                    col = 16 - message.length
                    row = 1
                    break
                default:
                    message = "err:!1-4"
            }

            this.setCursor(col, row)
            this.setMessage("        ")
            this.setCursor(col, row)
            this.setMessage(message)
        }

        setEnabled(value: boolean) {
            super.start()
            const values = this._enabled.values as any[]
            values[0] = value ? 1 : 0
            this._enabled.values = values as [boolean]
        }

        setMessage(value: string) {
            super.start()
            const values = this._message.values as any[]
            values[0] = value
            this._message.values = values as [string]
            pause(100)
        }

        clear(): void {
            super.start()
            super.sendCommand(
                jacdac.JDPacket.onlyHeader(fwdLights.CharacterScreenCmd.Clear)
            )
        }

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
        }
    }

    //% fixedInstance whenUsed
    export const lcd1 = new LCDClient("lcd1")
    //% fixedInstance whenUsed
    export const lcd2 = new LCDClient("lcd2")
    //% fixedInstance whenUsed
    export const lcd3 = new LCDClient("lcd3")
    //% fixedInstance whenUsed
    export const lcd4 = new LCDClient("lcd4")
}
