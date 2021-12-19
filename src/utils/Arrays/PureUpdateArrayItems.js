export default function (array, index, value, deleteCount) {
  const newArray = Array.from(array)
  if (Array.isArray(value)) {
    newArray.splice(index, deleteCount || value.length, ...value)
  } else {
    newArray.splice(index, deleteCount || 1, value)
  }
  return newArray
}

export const pureUpdateArrayByComparator = (array, comparator, insertValue) => {
  const newArray = Array.from(array)
  let i = 0
  const arrLength = newArray.length
  for (i; i < arrLength; i++) {
    const currItem = newArray[i]
    if (comparator(currItem)) {
      if (typeof currItem === "object") {
        newArray[i] = { ...currItem, ...insertValue }
      } else {
        newArray[i] = insertValue
      }
      break
    }
  }
  return newArray
}
