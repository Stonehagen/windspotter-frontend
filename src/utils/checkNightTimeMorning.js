import moment from 'moment';

export const checkNightTimeMorning = (time, nightEnd) => {
  return moment(time).format('HH') < nightEnd;
};
