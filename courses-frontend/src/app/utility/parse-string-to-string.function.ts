export const parseDateTimeStrings = (dateStr: string, timeStr: string) => {
  const [year, month, day] = dateStr.split('-').map(str => parseInt(str));
  const [hours, minutes] = timeStr.split(':').map(str => parseInt(str));
  return new Date(year, month - 1, day, hours, minutes);
}
