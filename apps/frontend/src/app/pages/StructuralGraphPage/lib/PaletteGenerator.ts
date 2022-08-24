import seedrandom from 'seedrandom'

type NumberRange = {
  min: number
  max: number
}

type CreateOptionalRange<T> = Partial<{
  [P in keyof T]: T[P] | NumberRange
}>

export type HSLA = {
  hue: number
  saturation: number
  lightness: number
  alpha: number
}

export type HSLAOptions = CreateOptionalRange<
  Pick<HSLA, 'hue' | 'saturation' | 'lightness' | 'alpha'>
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

  static getHSLAByKey(key: string, options?: HSLAOptions): string {
    let storedValue = store.get(key)
    if (!storedValue) {
      const rng = seedrandom(key)
      const randomInt = (min: number, max: number) => {
        const delta = max - min

        return (Math.floor(rng() * delta) % delta) + min
      }

      const optionsAffectedHSLA = Object.fromEntries(
        Object.entries(options ?? {}).map(([key, value]) => {
          const newValue =
            typeof value === 'number' ? value : randomInt(value.min, value.max)

          return [key, newValue]
        }),
      )

      storedValue = Object.assign(
        {
          hue: randomInt(0, 360),
          saturation: randomInt(0, 100),
          lightness: randomInt(0, 100),
          alpha: 0.8,
        },
        optionsAffectedHSLA,
      )

      store.set(key, storedValue)
    }

    const { hue, saturation, lightness, alpha } = storedValue

    return `hsla(${hue},${saturation}%,${lightness}%,${alpha})`
  }
}
