export const formatDeadline = (date: string) => {
  const now = new Date();
  const dateToCompare = new Date(date);
  const diff = dateToCompare.getTime() - now.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days,
    hours: hours % 24, // Calculate remaining hours after full days
    minutes: minutes % 60, // Calculate remaining minutes after full hours
  };
};
