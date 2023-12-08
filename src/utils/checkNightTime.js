import moment from 'moment';
import { checkNightTimeMorning } from './checkNightTimeMorning';

export const checkNightTime = (time, nightStart, nightEnd) => {
  const checkNightTimeEvening = (time, nightStart) => {
    return moment(time).format('HH') > nightStart;
  };

  return (
    checkNightTimeMorning(time, nightEnd) ||
    checkNightTimeEvening(time, nightStart)
  );
};
