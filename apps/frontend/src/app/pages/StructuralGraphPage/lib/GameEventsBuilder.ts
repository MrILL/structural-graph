import { Edge } from 'react-flow-renderer'

import { GameEvent } from '@sg/types'
import { CustomNode } from '../types'

const MAIN_ROUTE_NAME = 'Events'

const CARD_WIDTH = 240 //TODO
const CARD_HEIGHT = 150
const X_CARD_OFFSET = 20
const Y_CARD_OFFSET = 25
const X_OFFSET = 100
const Y_OFFSET = 100

type EventsMatrix = {
  [version: string]: {
    [type: string]: GameEvent[]
  }
}

type AxisRange = {
  min: number
  max: number
}

function sortEvents(v1: string, v2: string): number {
  const getReleaseVersion = (str: string) => {
    const vStrs = str.split('.')

    return vStrs[0] === '' ? 0 : +vStrs[0]
  }

  const getMainVersion = (str: string): number => {
    if (typeof str !== 'string') return str
    const vStrs = str.split('.')
    const vStr = vStrs[1].match(/^([0-9])*/g)
    if (!vStr) {
      console.error('getMainVersion: not valid string: ' + str)
      return 0
    }

    return +vStr[0]
  }

  const getSubVersion = (str: string): string => {
    if (typeof str !== 'string') return str
    const vStrs = str.split('.')

    return vStrs[1]
  }
  const v1Release = getReleaseVersion(v1)
  const v2Release = getReleaseVersion(v2)
  if (v1Release !== v2Release) return v1Release - v2Release

  const v1Main = getMainVersion(v1)
  const v2Main = getMainVersion(v2)
  if (v1Main !== v2Main) return v1Main - v2Main

  const v1Sub = getSubVersion(v1)
  const v2Sub = getSubVersion(v2)
  if (v1Sub !== v2Sub) return v1Sub.localeCompare(v2Sub)

  return 0
}

function getCharacters(eventsMatrix: EventsMatrix): Set<string> {
  const characters: Set<string> = new Set()

  Object.entries(eventsMatrix).forEach(
    ([version, characterEventsCollection]) => {
      Object.entries(characterEventsCollection).forEach(
        ([character, events]) => {
          characters.add(character)
        },
      )
    },
  )

  return characters
}

function getCharactersXRange(characters: Set<string>): {
  [character: string]: AxisRange
} {
  const charactersXRange: {
    [character: string]: AxisRange
  } = {}

  if (!characters.has(MAIN_ROUTE_NAME)) {
    console.error(`Not found main route: ${MAIN_ROUTE_NAME}`)
  }
  charactersXRange[MAIN_ROUTE_NAME] = {
    min: 0,
    max: CARD_WIDTH + X_CARD_OFFSET * 2 + 120,
  }

  characters.delete(MAIN_ROUTE_NAME)

  let curX = charactersXRange[MAIN_ROUTE_NAME].max + X_OFFSET
  characters.forEach(route => {
    const min = curX
    curX += CARD_WIDTH + X_CARD_OFFSET * 2

    charactersXRange[route] = {
      min,
      max: curX,
    }
  })

  return charactersXRange
}

export class GameEventsBuilder {
  private readonly events: GameEvent[]
  private readonly nodes: { [key: string]: GameEvent } = {}
  private readonly eventsMatrix: EventsMatrix = {}

  constructor(events: GameEvent[]) {
    this.events = events

    events.forEach(event => {
      const { version, type } = event

      if (!this.eventsMatrix[version]) this.eventsMatrix[version] = {}

      if (!this.eventsMatrix[version][type]) {
        this.eventsMatrix[version][type] = [event]
      } else {
        this.eventsMatrix[version][type].push(event)
      }
    })
  }

  getGraphInput(): {
    nodes: CustomNode[]
    edges: Edge[]
  } {
    const versionCollection = {} as { [key: string]: GameEvent[] }
    this.events.forEach(event => {
      const version = event.version

      if (!versionCollection[version]) {
        versionCollection[version] = [event]
      } else {
        versionCollection[version].push(event)
      }
    })
    const characters: Set<string> = getCharacters(this.eventsMatrix)

    // const totalVersions = Object.keys(this.eventsMatrix).length
    // const totalCharacters = characters.size

    const charactersXRange: {
      [character: string]: AxisRange
    } = getCharactersXRange(characters)

    const nodes: CustomNode[] = []
    let curYStart = 0
    Object.entries(this.eventsMatrix)
      .sort(([v1], [v2]) => sortEvents(v1, v2))
      .forEach(
        ([version, charactersCollection]) => {
          const minY = curYStart

          Object.entries(charactersCollection).forEach(
            ([character, events]) => {
              events.forEach((event, i) => {
                const x = charactersXRange[character].min + X_CARD_OFFSET
                const y = minY + (CARD_HEIGHT + Y_CARD_OFFSET) * i
                const yAfterCard = y + CARD_HEIGHT + Y_CARD_OFFSET
                if (yAfterCard > curYStart) {
                  curYStart = yAfterCard
                }

                const node: CustomNode = {
                  id: event.id,
                  type: 'card',
                  data: event,
                  position: {
                    x,
                    y,
                  },
                }
                nodes.push(node)
              })
            },
          )
        },

        (curYStart += Y_OFFSET),
      )

    const edges = this.events
      .filter(event => event.id && event.nextEventId)
      .filter(event => !!this.events.find(v => v.id === event.nextEventId))
      .map((event, i) => ({
        id: event.id + '-' + event.nextEventId,
        source: event.id,
        target: event.nextEventId as string,
      }))

    return {
      nodes,
      edges,
    }
  }
}
