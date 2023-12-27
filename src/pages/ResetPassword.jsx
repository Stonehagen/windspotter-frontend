import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/SignIn.css';

const ResetPassword = ({ user, login }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length < 1) {
      setErrors([{ msg: 'please provide an email' }]);
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_BACKENDSERVER}/user/resetPasswordReq`, {
        email,
      })
      .then((res) => {
        navigate('/sign-in');
      }).catch((err) => {
        navigate('/sign-in');
      }
      );
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className="SignIn">
      <form onSubmit={handleSubmit}>
        <div className="SignIn-form-grp">
          <h3>
            RESET<span>PASSWORD</span>
          </h3>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              value={email}
              id="email"
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="messages">
            {errors.map((error, index) => {
              return (
                <p className="errorMessage" key={index}>
                  {error.msg}
                </p>
              );
            })}
          </div>
        </div>
        <div className="SignIn-btn-grp">
          <button type="submit">
            SEND<span>IT</span>
          </button>
          <button type="button" onClick={() => navigate('/sign-in')}>
            LOG<span>IN</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
