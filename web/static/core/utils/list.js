// @flow

export function replace <T>(target: T[], source: T[], index: number): void {
  target.splice(index, source.length, ...source)
}
