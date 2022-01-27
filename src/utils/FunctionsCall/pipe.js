export default class Pipe {
  constructor(value, right, left) {
    this.left = left
    this.right = right
    this.value = value
  }

  apply(functions) {
    const fLength = functions.length
    let path = "right"
    let i = 0
    for (i; i < fLength; i++) {
      this.value = functions[i](this.value)
      if (this.value instanceof Error) {
        path = "left"
        break
      }
    }
    this[path](this.value)
  }
}
