import { ARR_TYPE_INPUTS } from '../utils/constants';
import validator from "validator";
import { REGEX_TEXT_SEARCH, REGEX_TEST_TITLE_CARD } from '../utils/constants';

export const checkedLengthArray = (arr) => (arr.length === 0);
export const testTextFormat = (text) => !(REGEX_TEXT_SEARCH.test(`${text}`));

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
  const sortFunction = (isEN)
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

  return ((String(typeInput)) && (checkType()))
    ? typeInput
    : 'text'
};

export function validUrl(url) {
  return (validator.isURL(url.trim()))
    ? url
    : null;
};

export const getParseLocalStorage = (key) => {
  JSON.parse(localStorage.getItem(key));
};

export const setStringifyLocalStorage = (key, arr) => {
  localStorage.setItem(key, JSON.stringify(arr));
};

export const filterExpression = (searchQuery, filter, movies, isEN) => {
  const regex = new RegExp(`${searchQuery.replace(REGEX_TEST_TITLE_CARD, '')}`, "i")

  const formString = () => {
    return (isEN)
      ? ((movies.nameEN) && (movies.nameEN !== ''))
        ? movies.nameEN.replace(REGEX_TEST_TITLE_CARD, '')
        : movies.nameRU.replace(REGEX_TEST_TITLE_CARD, '')
      : ((movies.nameRU) && (movies.nameRU !== ''))
        ? movies.nameRU.replace(REGEX_TEST_TITLE_CARD, '')
        : movies.nameEN.replace(REGEX_TEST_TITLE_CARD, '');
  };

  return filter
    ? movies.duration <= 40 && regex.test(formString())
    : regex.test(formString());
};