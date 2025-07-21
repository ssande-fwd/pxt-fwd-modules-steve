namespace fwdSensors {
    //% fixedInstances
    export class FwdSonarClient extends modules.DistanceClient {
        constructor(role: string) {
            super(role)
        }

        /**
         * Returns the sensor's distance reading (m).
         */
        //% group="Sonar"
        //% block="$this distance (m)"
        //% blockId=fwd_sonar_get_distance
        distance(): number {
            return super.distance()
        }

        /**
         * Returns true when the distance (m) is past the provided threshold in the designated direction.
         * @param threshold the distance (m) to check against
         * @param direction over or under the threshold
         */
        //% group="Sonar"
        //% block="$this is $direction $threshold m"
        //% blockId=fwd_sonar_is_past_threshold
        isPastThreshold(
            threshold: number,
            direction: fwdEnums.OverUnder
        ): boolean {
            const difference = super.distance() - threshold > 0
            const isPastThreshold =
                (direction === fwdEnums.OverUnder.Over && difference) ||
                (direction === fwdEnums.OverUnder.Under && !difference)
            return isPastThreshold
        }
    }

    //% fixedInstance whenUsed
    export const sonar1 = new FwdSonarClient("sonar1")
    //% fixedInstance whenUsed
    export const sonar2 = new FwdSonarClient("sonar2")
    //% fixedInstance whenUsed
    export const sonar3 = new FwdSonarClient("sonar3")
    //% fixedInstance whenUsed
    export const sonar4 = new FwdSonarClient("sonar4")
}
