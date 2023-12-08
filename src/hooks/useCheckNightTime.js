import moment from 'moment';
import { useCheckNightTimeMorning } from './useCheckNightTimeMorning';

export const useCheckNightTime = (time, nightStart, nightEnd) => {
  const checkNightTimeEvening = (time, nightStart) => {
    return moment(time).format('HH') > nightStart;
  };

  return (
    useCheckNightTimeMorning(time, nightEnd) ||
    checkNightTimeEvening(time, nightStart)
  );
};
