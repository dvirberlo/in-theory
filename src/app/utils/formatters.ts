const _dynamicNumberFormatter = new Intl.NumberFormat(navigator.language, {
  notation: 'compact',
  compactDisplay: 'short',
});
export const dynamicNumber = (num: number) =>
  _dynamicNumberFormatter.format(num);

const _relativeDateFormatter = new Intl.RelativeTimeFormat('he-IL', {
  numeric: 'auto',
  style: 'short',
});
const _relativeDateUnits = [
  ['year', 1000 * 60 * 60 * 24 * 365],
  ['month', 1000 * 60 * 60 * 24 * 30],
] as const;
export const relativeDateMs = (ms: number) => {
  const diff = ms - Date.now();
  for (const [unit, length] of _relativeDateUnits) {
    if (Math.abs(diff) > length) {
      return _relativeDateFormatter.format(Math.round(diff / length), unit);
    }
  }
  return _relativeDateFormatter.format(
    Math.round(diff / 1000 / 60 / 60 / 24),
    'day',
  );
};
export const relativeDate = (date: Date) => relativeDateMs(date.getTime());

export const fireAuthCodeLength = 6;

export function validatePhoneNumber(phone: string) {
  return /^\+[0-9]{1,15}$/.test(phone);
}
