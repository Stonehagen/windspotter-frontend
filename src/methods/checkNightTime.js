import moment from 'moment';

export const checkNighttimeMorning = (time, nightEnd) => {
  return moment(time).format('HH') < nightEnd;
};

const checkNighttimeEvening = (time, nightStart) => {
  return moment(time).format('HH') > nightStart;
};

export const checkNighttime = (time, nightStart, nightEnd) => {
  return (
    checkNighttimeMorning(time, nightEnd) ||
    checkNighttimeEvening(time, nightStart)
  );
};
