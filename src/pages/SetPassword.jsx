import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { setAuthToken } from '../utils/authToken';
import '../assets/styles/SignIn.css';

const SetPassword = ({ user, login }) => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState([]);
  const [cookie, setCookie] = useCookies(['jwt_token']);

  const navigate = useNavigate();

  const saveJWTinCookie = (token) => {
    setCookie('jwt_token', token, { maxAge: 60 * 24 * 60 * 60 * 1000 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 1) {
      setErrors([{ msg: 'please provide a password' }]);
      return;
    }
    if (password !== passwordConfirm) {
      setErrors([{ msg: 'passwords do not match' }]);
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_BACKENDSERVER}/user/resetPassword`, {
        password,
        token,
      })
      .then((res) => {
        if (res.data.error) {
          setErrors(res.data.error);
          return;
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        setErrors(err.response.data.errors ? err.response.data.errors : []);
      });
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
            <label htmlFor="password">New Password</label>
            <input
              name="password"
              value={password}
              id="password"
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Confirm New Password</label>
            <input
              name="passwordConfirm"
              value={passwordConfirm}
              id="passwordConfirm"
              placeholder="password"
              type="password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
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
        </div>
      </form>
    </div>
  );
};

export default SetPassword;
