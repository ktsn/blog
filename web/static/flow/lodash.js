// @flow

declare module 'lodash' {
  declare function isObject (value: any): boolean;
  declare function toPairs (object: Object): [string, any][];
}
