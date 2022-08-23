import seedrandom from 'seedrandom'

export type HSLA = {
  hue: number
  saturation: number
  lightness: number
  alpha: number
}

export type HSLAOptions = Partial<
  Pick<HSLA, 'saturation' | 'lightness' | 'alpha'>
>

const store = new Map<string, HSLA>()

export class PaletteGenerator {
  /**
   * Deprecated
   * @deprecated since creating of getHSLAByKey
   */
  static createHSLAPalette(
    parts: number,
    colorOptions: HSLAOptions = {
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

  //TODO use HSLAOptions
  static getHSLAByKey(key: string): string {
    let storedValue = store.get(key)
    if (!storedValue) {
      const rng = seedrandom(key)
      const randomInt = (min: number, max: number) => {
        const delta = max - min
        return (Math.floor(rng() * delta) % delta) + min
      }

      storedValue = {
        hue: randomInt(0, 360),
        saturation: randomInt(45, 55),
        lightness: randomInt(60, 70),
        alpha: 0.8,
      }

      store.set(key, storedValue)
    }

    const { hue, saturation, lightness, alpha } = storedValue

    return `hsla(${hue},${saturation}%,${lightness}%,${alpha})`
    return ''
  }
}
