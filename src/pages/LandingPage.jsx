import React from 'react';
import '../assets/styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';

import UserLandingPage from '../features/userLandingPage/UserLandingPage';
import SignUp from '../assets/icons/SignUp.svg?react';
import SignIn from '../assets/icons/SignIn.svg?react';

const LandingPage = ({ user, setPath }) => {
  const navigate = useNavigate();

  return (
    <div className="landingpage">
      {user ? (
        <UserLandingPage user={user} />
      ) : (
        <>
          <div className="LogoWrapper">
            <h1 className="Logo">
              WIND<span>MATE</span>
            </h1>
            <h2 className="LogoSub">
              WIND<span>PREDICTION</span> FOR <span>SURFERS</span>
            </h2>
          </div>
          <div className="Register">
            <button
              type="button"
              onClick={() => {
                setPath('/sign-in');
                navigate('/sign-in');
              }}
            >
              <SignIn />
              Log In
            </button>
            <button
              type="button"
              onClick={() => {
                setPath('/sign-up');
                navigate('/sign-up');
              }}
            >
              <SignUp />
              Register Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
