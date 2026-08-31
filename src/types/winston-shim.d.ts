declare module 'winston' {
  const winston: any;
  export default winston;
  export const format: any;
  export const transports: any;
  export function createLogger(...args: any[]): any;
}
