import moment from 'moment';

export const useCheckNightTimeMorning = (time, nightEnd) => {
  return moment(time).format('HH') < nightEnd;
};
