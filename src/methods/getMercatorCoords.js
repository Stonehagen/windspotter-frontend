export default ([x, y], header) => {
  // calc lat and long for each pixel
  const lat = (y / header.height) * (header.la2 - header.la1) + header.la1;
  const long = (x / header.width) * (header.lo2 - header.lo1) + header.lo1;

  // calc x and y coordinate for the canvas
  // consider the distortion of the map projection (Mercator)
  const xCoord = ((long + 180) / 360) * 256 * Math.pow(2, 7);
  const yCoord =
    (1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180),
      ) /
        Math.PI) *
    256 *
    Math.pow(2, 7);

  // calc the x and y coords of to the corresponding lo1, la1, lo2, la2
  // consider the distortion of the map projection and the scale of canvas
  const x1 = ((header.lo1 + 180) / 360) * 256 * Math.pow(2, 7);
  const y1 =
    (1 -
      Math.log(
        Math.tan((header.la1 * Math.PI) / 180) +
          1 / Math.cos((header.la1 * Math.PI) / 180),
      ) /
        Math.PI) *
    256 *
    Math.pow(2, 7);
  const x2 = ((header.lo2 + 180) / 360) * 256 * Math.pow(2, 7);
  const y2 =
    (1 -
      Math.log(
        Math.tan((header.la2 * Math.PI) / 180) +
          1 / Math.cos((header.la2 * Math.PI) / 180),
      ) /
        Math.PI) *
    256 *
    Math.pow(2, 7);

  // calc the final x and y coords for the canvas
  const finalX = Math.round(((xCoord - x1) / (x2 - x1)) * header.width);
  const finalY = Math.round(((yCoord - y1) / (y2 - y1)) * header.height);

  return [finalX, finalY];
};
