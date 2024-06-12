export interface ResultType {
  description: string
  needMoreInfo: boolean
  usedTokens: {
    prompt: number
    completion: number
  }
}
