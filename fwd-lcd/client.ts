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

            this.setEnabled(true)
        }

        /**
         * Prints the provided text on the designated line of the LCD. Limited to 16 characters.
         * @param message the message to print
         * @param line the line to print the message on
         */
        //% block="print $message on line $line of $this"
        //% line.min=1 line.max=2 line.defl=1
        //% blockId=fwd_lcd_print_line
        //% group="LCD"
        printLine(message: string, line: number) {
            line -= 1

            if (message.length > 16) {
                message = message.substr(0, 16)
            }

            if (line < 0 || line > 1) {
                this.setCursor(0, 0)
                this.setMessage("Error:")
                this.setCursor(0, 1)
                this.setMessage("Invalid Line #")
                pause(5000)
                this.clear()
            } else {
                this.setCursor(0, line)
                this.setMessage("                ")
                this.setCursor(0, line)
                this.setMessage(message)
            }
        }

        /**
         * Prints the provided text on the designated line of the LCD. Limited to 16 characters.
         * @param message the message to print
         * @param quadrant the quadrant to print the message on
         */
        //% block="print $message on quadrant $quadrant of $this"
        //% quadrant.min=1 quadrant.max=4 quadrant.defl=1
        //% blockId=fwd_lcd_print_quadrant
        //% group="LCD"
        printQuadrant(message: string, quadrant: number) {
            let col = 0
            let row = 0

            if (message.length > 8) {
                message = message.substr(0, 8)
            }

            switch (quadrant) {
                case 1:
                    col = 0
                    row = 0
                    break
                case 2:
                    col = 8
                    row = 0
                    break
                case 3:
                    col = 0
                    row = 1
                    break
                case 4:
                    col = 8
                    row = 1
                    break
                default:
                    this.setCursor(0, 0)
                    this.setMessage("Error:")
                    this.setCursor(0, 1)
                    this.setMessage("Invalid Quadrant")
                    pause(5000)
                    this.clear()
                    return
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
            // this.setEnabled(true)
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

    //% fixedInstance whenUsed weight=1 block="character display1"
    export const characterDisplay1 = new CharacterDisplayClient(
        "character Display1"
    )
}
