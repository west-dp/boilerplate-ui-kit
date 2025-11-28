export class TokenUtils {
  public static generate(count: number = 32): string {
    const symbolArr: string[] = []
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    while (symbolArr.length < count) {
      symbolArr.push(characters.charAt(Math.floor(Math.random() * characters.length)))
    }

    return symbolArr.join('')
  }
}

