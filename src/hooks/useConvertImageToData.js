import { useGetColorGrade } from './useGetColorGrade.js';
import { useGetMercatorCoords } from './useGetMercatorCoords.js';
import jpeg from 'jpeg-js';
import { fabric } from 'fabric';

export const useConvertImageToData = async (image, header) => {
  fabric.Image.prototype.getSvgSrc = function () {
    return this.toDataURLforSVG();
  };

  fabric.Image.prototype.toDataURLforSVG = function (options) {
    var el = fabric.util.createCanvasElement();
    el.width = this._element.naturalWidth || this._element.width;
    el.height = this._element.naturalHeight || this._element.height;
    el.getContext('2d').drawImage(this._element, 0, 0);
    var data = el.toDataURL(options);
    return data;
  };

  const scalefactor = 2;

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

      // If windspeed and winddir pixels are blue, set values to NaN
      if (rawImageData.data[i + 2] >= 100) {
        vValues.push(NaN);
        uValues.push(NaN);
        ctx.fillStyle = `rgba(0, 0, 0, 0)`;
      } else {
        const windSpeed = Math.floor(getWindSpeed(vValue, uValue));
        const [red, green, blue] = useGetColorGrade(windSpeed, 'windRGB');
        vValues.push(vValue);
        uValues.push(uValue);
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, 255)`;
      }

      // Get mercator coordinates for pixel
      const [warpedX, warpedY] = useGetMercatorCoords([x, y], header);

      // Set pixel color on canvas and flip it vertically
      if (x % 1 === 0 && y % 1 === 0) {
        ctx.fillRect(
          warpedX / scalefactor,
          canvas.height - warpedY / scalefactor,
          1,
          1,
        );
      }
    }
  }
  ctx.scale(scalefactor, scalefactor);
  const windOverlay = canvas.toDataURL();

  return { values: { u: uValues, v: vValues }, windOverlay };
};
