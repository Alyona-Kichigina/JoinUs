export default (fn, time) => {
  let timer
  const replyArray = []
  return new Proxy(fn, {
    apply(target, thisArg, argArray) {
      clearTimeout(timer)
      timer = setTimeout(async () => {
        const res = await target.apply(thisArg, argArray)
        replyArray.splice(0, replyArray.length).forEach(r => r(res))
      }, time)
      return new Promise(resolve => {
        replyArray.push(resolve)
      })
    }
  })
}
