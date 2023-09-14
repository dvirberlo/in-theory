/**
 * Tailwind CSS class string type
 */
export type TW = string & { __tw: never };

export const classes = (...classes: string[]): TW => classes.join(' ') as TW;
