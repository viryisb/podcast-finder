export function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

export function formatDuration(durationMillis) {
  const durationInSeconds = Math.floor(durationMillis / 1000);
  const hours = Math.floor(durationInSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((durationInSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(durationInSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
