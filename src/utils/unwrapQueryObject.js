export default function unwrapQueryObject(obj) {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    acc[key] = Array.isArray(val)
      ? (typeof val[0] === "object" ? val.map(({ ID }) => ID) : val).join(",")
      : val
    return acc
  }, {})
}
