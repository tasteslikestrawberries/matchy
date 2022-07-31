export interface IMatch {
  id?: string,
  player1: {
    id: string,
    name: string,
    points?: number[],
    setsWon: number
  },
  player2: {
    id: string,
    name: string,
    points?: number[], 
    setsWon: number
  },
  winner?: string
}

