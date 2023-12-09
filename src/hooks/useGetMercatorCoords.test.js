import { useGetMercatorCoords } from './useGetMercatorCoords';

describe('useGetMercaterCoords', () => {
  it('should return mercater coords', () => {
    const header = {
      la1: 0,
      la2: 40,
      lo1: 0,
      lo2: 80,
      height: 40,
      width: 80,
    };
    const x = 20;
    const y = 40;
    const coords = [x, y];
    const mercaterCoords = useGetMercatorCoords(coords, header);
    expect(mercaterCoords[0]).toBe(20);
    expect(mercaterCoords[1]).toBe(40);
  });
});
