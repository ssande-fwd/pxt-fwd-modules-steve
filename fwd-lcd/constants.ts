namespace fwdLights {
    // Service Character display constants
    export const SRV_CHARACTER_SCREEN = 0x1f37c56a

    export const enum CharacterScreenCmd {
        /**
         * No-args command. Returns the cursor to the upper-left corner.
         */
        Home = 0x83,

        /**
         * No-args command. Clears the LCD display.
         */
        Clear = 0x84,

        /**
         * Arguments: uint8_t, uint8_t command set X, Y position of print cursor
         */
        SetCursor = 0x85,
    }

    export namespace CharacterScreenCmdPack {
        /**
         * Pack format for 'setcursor' data.
         */
        export const SetCursor = "u8 u8"
    }

    export const enum CharacterDisplayReg {
        /**
         * Read-write bool (uint8_t). Determines if the character display is active.
         *
         * ```
         * const [enabled] = jdunpack<[number]>(buf, "u8")
         * ```
         */
        Enabled = 0x1,

        /**
         * Read-write string (bytes). Characters to show.
         *
         * ```
         * const [message] = jdunpack<[string]>(buf, "s")
         * ```
         */
        Message = 0x2,
    }

    export namespace CharacterDisplayRegPack {
        /**
         * Pack format for 'enabled' data.
         */
        export const Enabled = "u8"

        /**
         * Pack format for 'message' data.
         */
        export const Message = "s"
    }
}
