import React from 'react';
import '../assets/styles/Info.css';

const Dashboard = ({ user }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.memerstatus === 'admin') {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [user]);

  return;
  {
    loading ? (
      <></>
    ) : (
      <div className="Dashboard">
        <h2 className="DashboardHeader">
          DASH<span>BOARD</span>
        </h2>
      </div>
    );
  }
};

export default Dashboard;
