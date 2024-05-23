import '../../assets/styles/SpotCharts.css';
import { useNavigate } from 'react-router-dom';
import { getColorGrade } from '../../utils/getColorGrade';

const SpotCharts = ({ spotCharts, user, setPath }) => {
  const ktToMs = 0.514444;

  const navigate = useNavigate();

  return (
    <div className="SpotCharts">
      {spotCharts.map((spot, index) => (
        <div
          key={index}
          className="spot"
          onClick={() => {
            setPath(`/forecast/${spot.searchName}`);
            navigate(`/forecast/${spot.searchName}`);
          }}
        >
          <div className="spotIndex">
            <div>{index + 1}</div>
          </div>
          <div
            className="spotInfo"
            style={{
              background: `linear-gradient(to right, ${getColorGrade(
                spot.minWind * ktToMs,
                'wind',
              )} 50%, ${getColorGrade(spot.maxGust * ktToMs, 'wind')} 90%)`,
            }}
          >
            <div className="spotName">{spot.name}</div>
            <div className="wind">
              <div className="base">
                {spot.minWind.toFixed(0)}
                <span>kts</span>
              </div>
              <div className="gust">{spot.maxGust.toFixed(0)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpotCharts;
