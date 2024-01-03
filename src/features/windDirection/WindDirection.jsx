import '../../assets/styles/AddSpot.css';

const AddSpot = ({ windDirections }) => {
  const windDirectionsList = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];

  return (
    <div className="AddSpot">
      <ul className="windDirections windDirectionsInfo">
        {windDirectionsList.map((direction, index) => {
          const main = direction === 'N';
          return (
            <li
              className={`windDirection ${
                windDirections[index] ? 'selected' : ''
              }`}
              key={index}
              style={{
                transform: `rotate(${index * 22.5 - 11.25}deg) skewY(-67.5deg)`,
              }}
            >
              <div className="text">{main ? direction : ''}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AddSpot;
