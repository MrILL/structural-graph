export type GameCharacter = {
  id: string
  name: string

  age?: string
  type?: string
  additionalInfo?: Map<string, string>

  background?: string
  characteristics?: string
  relationships?: Map<string, string>
  quotes?: string[]
  trivia?: string[]
}
