export default (e) => {
  e.preventDefault()
  e.stopPropagation()
  return e
}

export const stopProp = (e) => {
  e.stopPropagation()
  return e
}
