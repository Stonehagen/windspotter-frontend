import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../utils/authToken';
import '../assets/styles/SignIn.css';

const SignIn = ({ user, login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const [cookie, setCookie] = useCookies(['jwt_token']);

  const navigate = useNavigate();

  const saveJWTinCookie = (token) => {
    setCookie('jwt_token', token, { maxAge: 60 * 24 * 60 * 60 * 1000 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_BACKENDSERVER}/user/sign-in`, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.error) {
          setErrors(res.data.error);
        } else {
          saveJWTinCookie(res.data.token);
          setAuthToken(res.data.token);
          login(res.data.user.email, res.data.user._id);
        }
      })
      .catch((err) =>
        setErrors(err.response.data.error ? err.response.data.error : []),
      )
      .finally(() => navigate('/'));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  });

  return (
    <div className="SignIn">
      <form onSubmit={handleSubmit}>
        <h2>SIGN<span>IN</span></h2>
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
        <button type="submit">SIGN<span>IN</span></button>
        <button
          type="button"
          className="secondoryBtn"
          onClick={() => navigate('/sign-up')}
        >
          SIGN<span>UP</span>
        </button>
      </form>
    </div>
  );
};

export default SignIn;
