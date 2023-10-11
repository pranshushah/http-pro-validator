export type HValidationOptions = {
  /**
   * @default 'async'
   */
  mode?: 'async' | 'sync';
  /**
   * @description If true, the validation function will return the raw data instead of the parsed data.
   * @default true
   */
  raw?: boolean;
};
