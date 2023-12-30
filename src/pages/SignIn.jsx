import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../utils/authToken';
import '../assets/styles/SignIn.css';

const SignIn = ({ user, login, cookies, setCookie }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const saveJWTinCookie = (token) => {
    setCookie('jwt_token', token, { maxAge: 60 * 24 * 60 * 60 * 1000 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length < 1) {
      setErrors([{ msg: 'please provide an email' }]);
      return;
    }
    if (password.length < 1) {
      setErrors([{ msg: 'please provide a password' }]);
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_BACKENDSERVER}/user/sign-in`, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.error) {
          setErrors(res.data.error);
          return;
        } else {
          const token = res.data.token;
          saveJWTinCookie(token);
          setAuthToken(token);
          login(res.data.user);
          navigate('/');
        }
      })
      .catch((err) => {
        setErrors(
          err.response
            ? err.response.data.errors
              ? err.response.data.errors
              : []
            : [],
        );
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
            LOG<span>IN</span>
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
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={password}
              id="password"
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
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
          <div className="forgotPassword">
            <a href="/reset-password">Forgot your Password?</a>
          </div>
        </div>
        <div className="SignIn-btn-grp">
          <button type="submit">
            SEND<span>IT</span>
          </button>
          <button type="button" onClick={() => navigate('/sign-up')}>
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
