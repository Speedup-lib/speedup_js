import { Sort, SortOrder } from './types';

/**
 * Parse string value to enum
 * @param val Value to parse
 * @param enumType Enum type to parse as the target
 * @returns
 */
export const parseEnum = <U = any>(val: any, enumType: any): U => {
  // iterate over all the valid values in the provided enum
  for (const enumKeyString in enumType) {
    const enumKey = enumKeyString as keyof typeof enumType;

    if (val === enumType[enumKey]) {
      return enumType[enumKey] as any;
    }
  }

  // create an array of possible values
  const possibleValues: Array<any> = Object.keys(enumType).map(
    (key) => enumType[key as keyof typeof enumType],
  );

  throw new Error(
    `Provided value '${val}' should be either of (${possibleValues.join(
      ' | ',
    )}).`,
  );
};

/**
 * Parse a value into a number
 * @param val Value to parse
 * @param defaultValue Default value to return in case of failure
 * @param excludeList Which values should be considered falsy
 * @param opts parser options
 * @returns parsed number/default value/undefined
 */
export const parseNumber = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  val: any,
  defaultValue?: number,
  excludeList: Array<any> = ['', ' ', null, undefined, Infinity, true, false],
  opts: { preventNaN: boolean } = { preventNaN: true },
): number | undefined => {
  if (
    // DM: Values listed below have different behavior with unary plus operator
    // https://www.tektutorialshub.com/typescript/typescript-string-to-number/
    excludeList.includes(val) === true
  ) {
    return defaultValue;
  }

  const parsedNumber = +`${val}`;

  // NaN check is necessary cause NaN is still a number
  if (opts.preventNaN === true && isNaN(parsedNumber) === true) {
    return defaultValue;
  }

  return parsedNumber;
};

/**
 * Parse sort string
 * @param val field_name leading with either + (ascending) or - (descending)
 * @param defaultVal Default value (sort options)
 * @param defaultSortOrder Default sort for this column
 * @param separator Separator between field name and sort order
 * @returns Sort object
 */
export const parseSort = (
  val?: string,
  defaultVal?: Sort,
  defaultSortOrder: SortOrder = SortOrder.Ascending,
  separator: string = ' ',
): Sort | undefined => {
  if (typeof val !== 'string' || val.length < 1) {
    return defaultVal;
  }

  // split by the provided separator
  let [field, rawOrder] = val.split(separator, 2);

  // ensure provided sort order is not empty
  if (typeof rawOrder !== 'string' || rawOrder.length < 1) {
    rawOrder = defaultSortOrder;
  }

  // ensure provided sort order is valid
  const order = parseEnum<SortOrder>(rawOrder, SortOrder);

  return {
    field,
    order,
  };
};
