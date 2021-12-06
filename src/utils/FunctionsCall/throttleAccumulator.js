export default (fn, time) => {
  let timeout
  const args = []
  return function (...a) {
    const functionCall = () => {
      fn.apply(this, args.splice(0, args.length))
    }
    clearTimeout(timeout)
    args.push(a)
    timeout = setTimeout(functionCall, time)
  }
}
