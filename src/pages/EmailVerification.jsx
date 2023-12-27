import React, { useEffect, useState } from 'react';
import '../assets/styles/EmailVerification.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmailVerification = () => {
  const { token } = useParams();
  const [text, setText] = useState('');
  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_BACKENDSERVER}/user/verify`, { token })
      .then((res) =>
        setText(
          'Thank you for verifying your email address. You can now sign in to your account.',
        ),
      )
      .catch((err) =>
        setText(
          'Somewhere along the way, something went wrong. Please try again.',
        ),
      );
  }, []);

  return (
    <div className="EmailVerification">
      <h2 className="EmailVerificationTitle">Hello there!</h2>
      <p className="EmailVerificationText">{text}</p>
    </div>
  );
};

export default EmailVerification;
