export const getTrim = (string, count) => {
  if (string.length < count) {
    return string;
  }
  return `${string.slice(0, count)}...`;
};