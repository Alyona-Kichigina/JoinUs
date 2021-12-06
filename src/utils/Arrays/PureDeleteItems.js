export default function (array, startIndex, deleteCount = 1) {
  const newArray = Array.from(array)
  newArray.splice(startIndex, deleteCount)
  return newArray
}
