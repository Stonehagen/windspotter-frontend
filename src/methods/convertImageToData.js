import getColorGrade from './getColorGrade';
import getMercatorCoords from './getMercatorCoords.js';
import jpeg from 'jpeg-js';

export default async (image, header) => {
  const scalefactor = 4;
  const skipfactor = scalefactor <= 1 ? 1 : scalefactor - 1;
  const jpegBias = 2;

  const getWindSpeed = (v, u) => {
    return Math.sqrt(Math.pow(u, 2) + Math.pow(v, 2));
  };

  // Create arrays for u and v values
  const vValues = [];
  const uValues = [];

  // Create canvas for wind speed visualization
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = Math.round(header.width / scalefactor);
  canvas.height = Math.round(header.height / scalefactor);

  // Decode jpeg image to raw image data
  const rawImageData = jpeg.decode(image, { useTArray: true });

  // Loop through all pixels
  for (let y = 0; y < header.height; y++) {
    for (let x = 0; x < header.width; x++) {
      const i = (y * header.width + x) * 4;

      const uValue =
        (rawImageData.data[i + 0] / 255) * (header.uMax - header.uMin) +
        header.uMin;
      const vValue =
        (rawImageData.data[i + 1] / 255) * (header.vMax - header.vMin) +
        header.vMin;

      // If windspeed and winddir pixels are black, set values to NaN
      if (
        rawImageData.data[i + 0] <= jpegBias &&
        rawImageData.data[i + 1] <= jpegBias
      ) {
        vValues.push(NaN);
        uValues.push(NaN);
        ctx.fillStyle = `rgba(0, 0, 0, 0)`;
      } else {
        const windSpeed = getWindSpeed(vValue, uValue);
        const [red, green, blue] = getColorGrade(windSpeed, 'windRGB');
        vValues.push(vValue);
        uValues.push(uValue);
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, 255)`;
      }

      // Get mercator coordinates for pixel
      const [warpedX, warpedY] = getMercatorCoords([x, y], header);

      // Set pixel color on canvas and flip it vertically
      if (x % skipfactor === 0 && y % skipfactor === 0) {
        ctx.fillRect(
          warpedX / scalefactor,
          canvas.height - warpedY / scalefactor,
          1,
          1,
        );
      }
    }
  }

  const windOverlay = canvas.toDataURL();

  return { values: { u: uValues, v: vValues }, windOverlay };
};
