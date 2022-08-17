export const checkedLengthArray = (arr) => {
  return arr.length === 0;
};

export const timeFormat = (timeFull) => {
  const minutes = timeFull % 60;
  const hours = Math.trunc(timeFull / 60);

  const timeHours = () => {
    if ((hours % 60) >= 1 && minutes === 0) return `${timeFull}м`
    return hours !== 0
      ? `${hours}ч`
      : ''
  }

  const timeMinutes = () => {
    if (String(minutes).length === 1 && minutes !== 0 && hours >= 1) return `0${minutes}м`

    return minutes !== 0
      ? `${minutes}м`
      : ''
  }

  return `${timeHours()} ${timeMinutes()}`
}