export function getMinMaxDateTime(daysToAdd: number = 1): { min: string; max: string } {
  const pad = (num: number) => num.toString().padStart(2, "0");

  const formatDateTimeLocal = (date: Date) =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;

  const now = new Date();
  const min = formatDateTimeLocal(now);

  const maxDate = new Date(now);
  maxDate.setDate(now.getDate() + daysToAdd);
  const max = formatDateTimeLocal(maxDate);

  return { min, max };
}
