import React, { useEffect, useState } from 'react';
import '../assets/styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

import AddSpot from '../features/addSpot/AddSpot';

const Dashboard = ({ user }) => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.memberStatus === 'admin') {
        setLoading(false);
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [user]);

  return loading ? (
    <></>
  ) : (
    <div className="Dashboard">
      <h2 className="DashboardTitle">
        DASH<span>BOARD</span>
        <AddSpot user={user} />
      </h2>
    </div>
  );
};

export default Dashboard;
