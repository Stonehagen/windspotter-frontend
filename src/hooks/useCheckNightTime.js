import moment from 'moment';

export const useCheckNightTime = (time, nightStart, nightEnd) => {
  const checkNightTimeMorning = (time, nightEnd) => {
    return moment(time).format('HH') < nightEnd;
  };

  const checkNightTimeEvening = (time, nightStart) => {
    return moment(time).format('HH') > nightStart;
  };

  return (
    checkNightTimeMorning(time, nightEnd) ||
    checkNightTimeEvening(time, nightStart)
  );
};
