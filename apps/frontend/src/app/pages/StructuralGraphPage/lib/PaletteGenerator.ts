export type HSLColorOptions = {
  saturation?: number
  lightness?: number
  alpha?: number
}

export class PaletteGenerator {
  static createHSLPalette(
    parts: number,
    colorOptions: HSLColorOptions = {
      saturation: 0,
      lightness: 0,
      alpha: 1,
    },
  ): string[] {
    const { saturation, lightness, alpha } = colorOptions

    const hueOffset = 360 / parts
    const res = Array.from({ length: parts }, (_, i) => {
      const hue = hueOffset * i

      return `hsla(${hue},${saturation}%,${lightness}%,${alpha})`
    })

    return res
  }
}
