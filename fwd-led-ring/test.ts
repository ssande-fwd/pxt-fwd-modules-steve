// LED Ring Tests
// Type: compilation
//  const enum LEDRingPixels
//  setPixelColor(pixel: LEDRingPixels, color: number): void
//  setAllPixelsColor(color: number): void
//  setBrightness(brightness: number): void
//  rotate(offset: number): void
//  shift(offset: number): void
//  brightness(): number
fwdLights.ledRing1.setPixelColor(fwdLights.LEDRingPixels.Pixel1, 0xff0000)
fwdLights.ledRing1.setAllPixelsColor(0xb09eff)
fwdLights.ledRing1.setBrightness(10)
fwdLights.ledRing1.rotate(1)
fwdLights.ledRing1.shift(1)
basic.showNumber(fwdLights.ledRing1.brightness())
