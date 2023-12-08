import RainDrop from '../../assets/icons/weather/RainDrop.svg?react';

export default ({ rain }) => {
  const raindrops = [0.1, 2, 4];

  return (
    <>
      {raindrops.map((drop, index) => {
        if (rain >= drop) {
          return <RainDrop key={index} />;
        }
        return;
      })}
    </>
  );
};
