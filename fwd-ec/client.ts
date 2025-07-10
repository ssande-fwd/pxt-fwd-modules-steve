namespace fwdSensors {
    //% fixedInstances
    export class EcClient extends jacdac.SimpleSensorClient {
        private readonly _electricalConductivityError: jacdac.RegisterClient<
            [number]
        >
        private readonly _minElectricalConductivity: jacdac.RegisterClient<
            [number]
        >
        private readonly _maxElectricalConductivity: jacdac.RegisterClient<
            [number]
        >

        constructor(role: string) {
            super(
                fwdSensors.SRV_ELECTRICALCONDUCTIVITY,
                role,
                fwdSensors.ElectricalConductivityRegPack.ElectricalConductivity
            )

            this._electricalConductivityError = this.addRegister<[number]>(
                fwdSensors.ElectricalConductivityReg
                    .ElectricalConductivityError,
                fwdSensors.ElectricalConductivityRegPack
                    .ElectricalConductivityError,
                jacdac.RegisterClientFlags.Optional
            )
            this._minElectricalConductivity = this.addRegister<[number]>(
                fwdSensors.ElectricalConductivityReg.MinElectricalConductivity,
                fwdSensors.ElectricalConductivityRegPack
                    .MinElectricalConductivity,
                jacdac.RegisterClientFlags.Optional |
                jacdac.RegisterClientFlags.Const
            )
            this._maxElectricalConductivity = this.addRegister<[number]>(
                fwdSensors.ElectricalConductivityReg.MaxElectricalConductivity,
                fwdSensors.ElectricalConductivityRegPack
                    .MaxElectricalConductivity,
                jacdac.RegisterClientFlags.Optional |
                jacdac.RegisterClientFlags.Const
            )
        }

        /**
         * The ElectricalConductivity, uS, of fluids.
         */
        //% group="Electrical Conductivity (EC)"
        //% block="%electricalconductivity µS"
        //% blockId=jacdac_electricalconductivity_electricalconductivity___get
        electricalconductivity(): number {
            return this.reading()
        }

        /**
         * Error on the electricalconductivity reading.
         */
        //% group="Electrical Conductivity (EC)"
        electricalconductivityError(): number {
            this.start()
            const values =
                this._electricalConductivityError.pauseUntilValues() as any[]
            return values[0]
        }

        /**
         * Lowest electricalconductivity that can be reported.
         */
        //% group="Electrical Conductivity (EC)"
        minElectricalConductivity(): number {
            this.start()
            const values =
                this._minElectricalConductivity.pauseUntilValues() as any[]
            return values[0]
        }

        /**
         * Highest electricalconductivity that can be reported.
         */
        //% group="Electrical Conductivity (EC)"
        maxElectricalConductivity(): number {
            this.start()
            const values =
                this._maxElectricalConductivity.pauseUntilValues() as any[]
            return values[0]
        }

        /**
         * Run code when the electricalconductivity changes by the given threshold value.
         */
        //% group="Electrical Conductivity (EC)"
        //% blockId=jacdac_electricalconductivity_on_electricalconductivity_change
        //% block="on %electricalconductivity electricalconductivity changed by %threshold (uS)"
        //% threshold.min=0
        //% threshold.max=10.5
        //% threshold.defl=1
        onElectricalConductivityChangedBy(
            threshold: number,
            handler: () => void
        ): void {
            this.onReadingChangedBy(threshold, handler)
        }

        /**
         * Sets the low reference calibration point.
         * @param low low uS value
         */
        //% blockId=jacdac_characterscreen_setcalibrationlow_cmd
        //% block="set the low reference calibration on %electricalconductivity|to low %low"
        //% low.defl=1413
        //% group="Electrical Conductivity (EC)"
        setlowreference(low: number): void {
            this.start()
            this.sendCommand(
                jacdac.JDPacket.from(
                    fwdSensors.ElectricalConductivityCmd.CalibrateLow,
                    jacdac.jdpack(
                        fwdSensors.ElectricalConductivityCmdPack
                            .SetCalibrationPoint,
                        [low]
                    )
                )
            )
        }

        /**
         * Sets the high reference calibration point.
         * @param high high uS value
         */
        //% blockId=jacdac_characterscreen_setcalibrationhigh_cmd
        //% block="set the high reference calibration on %electricalconductivity|to high %high"
        //% high.defl=5000
        //% group="Electrical Conductivity (EC)"
        sethighreference(high: number): void {
            this.start()
            this.sendCommand(
                jacdac.JDPacket.from(
                    fwdSensors.ElectricalConductivityCmd.CalibrateHigh,
                    jacdac.jdpack(
                        fwdSensors.ElectricalConductivityCmdPack
                            .SetCalibrationPoint,
                        [high]
                    )
                )
            )
        }
    }

    //% fixedInstance whenUsed
    export const EC1 = new EcClient("ec1")
}
