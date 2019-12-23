export function assertDate8(date: string): asserts date is string {
  assertString(date)
  if (date.length !== 8) {
    throw new Error('date.length === 8')
  }
}
export function assertFile(file: string): asserts file is string {
  assertString(file)
  if (file.toUpperCase() !== 'SHP' && file.toUpperCase() !== 'CSV') {
    throw new Error('SHP or CSV')
  }
}
export function assertString(str: string): asserts str is string {
  if (typeof str !== 'string') {
    throw new Error('typeof string')
  }
}

