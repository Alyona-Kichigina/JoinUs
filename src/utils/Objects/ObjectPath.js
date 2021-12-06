import merge from 'lodash/merge'
export function get(path, data) {
  if (!path) {
    return data
  } if (data[path] === undefined && path.indexOf(".") >= 0) {
    const subs = path.split(".")
    let i = 0
    let result = data
    const pathLength = subs.length
    for (i; i < pathLength; i++) {
      const { [subs[i]]: semiRes = i === pathLength - 1 ? "" : {} } = result // деструкторизация
      result = semiRes
    }
    return result
  }
  return data[path]
}

function setByArray(subs, data, value, originValue) {
  let i = 0
  let result = data
  const pathLength = subs.length
  for (i; i < pathLength; i++) {
    const { [subs[i]]: semiRes = {} } = result
    const { [subs[i]]: originVal = {} } = originValue
    if (i !== pathLength - 1) {
      result[subs[i]] = merge(originVal, semiRes)
      result = result[subs[i]]
    } else {
      result[subs[i]] = value
    }
  }
}

export function set(path, data, value, originValue = {}) {
  if (!path) {
    return value
  }
  if (Array.isArray(path)) {
    if (path.length === 0) {
      return value ? merge(data, value) : data
    }
    if (path.length === 1) {
      data[path[0]] = typeof value === "object" && value !== null && !Array.isArray(value) ? merge(data[path[0]], value) : value
      return data
    }
    setByArray(path, data, value, originValue)
  } else if (path.indexOf(".") >= 0) {
    const subs = path.split(".")
    setByArray(subs, data, value, originValue)
  } else {
    data[path] = typeof value === "object" && value !== null && !Array.isArray(value) ? merge(data[path], value) : value
    return data
  }
  return data
}
