export const siteMask = {
  name: "siteMask",
  appendix: "https://",
  pattern: "^http(s|):\\/\\/"
}
export const numberMask = {
  name: "numberMask",
  appendix: "",
  pattern: "^(0|[1-9]\\d*|)(\\.(\\d+|))?$",
  beforeNormalize: (v) => v.replace(",", "."),
  afterNormalize: (v) => String(v).startsWith(".") ? `0${v}` : v
}
export const intMask = {
  name: "numberMask",
  appendix: "",
  pattern: "^(0|[1-9]\\d*|)",
  afterNormalize: (v) => Number(v)
}
