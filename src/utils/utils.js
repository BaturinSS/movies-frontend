import { ARR_TYPE_INPUTS } from '../utils/constants';
import validator from "validator";

export const checkedLengthArray = (arr) => (arr.length === 0);

export function timeFormat(timeFull) {
  const minutes = (timeFull % 60);
  const hours = Math.trunc(timeFull / 60);

  function timeHours() {
    return ((hours % 60) >= 1) && (minutes === 0)
      ? `${timeFull}м`
      : (hours !== 0)
        ? `${hours}ч`
        : ''
  };

  function timeMinutes() {
    return (String(minutes).length === 1) && (minutes !== 0) && (hours >= 1)
      ? `0${minutes}м`
      : (minutes !== 0)
        ? `${minutes}м`
        : ''
  };

  return `${timeHours()} ${timeMinutes()}`
};

export function sortAlphabetList(list, isEN) {
  const sortFunction = isEN
    ? function SortArray(x, y) {
      if (x.nameEN < y.nameEN) return -1;
      if (x.nameEN > y.nameEN) return 1;
      return 0;
    }
    : function SortArray(x, y) {
      if (x.nameRU < y.nameRU) return -1;
      if (x.nameRU > y.nameRU) return 1;
      return 0;
    }

  return list.sort(sortFunction);
};

export function appointTypeInput(typeInput) {
  const checkType = () => (ARR_TYPE_INPUTS.indexOf(typeInput) !== -1);

  return (String(typeInput) && checkType())
    ? typeInput
    : 'text'
};

export function validUrl(url) {
  return validator.isURL(url.trim())
    ? url
    : null;
};