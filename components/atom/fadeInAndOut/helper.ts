function parseMsNumber(v?: string) {
  if (v === undefined) return 320
  if (v.endsWith('ms')) return Number(v.slice(0, -2)) - 5
  return Number(v.slice(0, -1)) * 1000 - 5
}

export {
  parseMsNumber
}