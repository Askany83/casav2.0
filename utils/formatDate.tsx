/**
 * Formats a date string into a localized date and time string.
 *
 * @param dateString - The date string to format.
 * @returns The formatted date and time string.
 */

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  const formattedTime = `${date.getHours()}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
  return `${formattedDate} às ${formattedTime}`;
};
