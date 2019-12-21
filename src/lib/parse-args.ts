export const parseArgs = (fx: string) => fx
  .match(/'([\w\s_.]+)'/g)
  .map(arg => arg.replace(/\'/g, ''))
