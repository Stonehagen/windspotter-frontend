import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/SignUp.css';

const SignUp = ({ user }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length < 5) {
      setErrors([{ msg: 'username must be at least 5 characters long' }]);
      return;
    }
    if (username.search(/[a-zA-Z]/) === -1) {
      setErrors([{ msg: 'username must contain at least one letter' }]);
      return;
    }
    if (email.search(/@/) === -1) {
      setErrors([{ msg: 'please enter a valid email address' }]);
      return;
    }
    if (password !== passwordCheck) {
      setErrors([{ msg: 'passwords do not match' }]);
      return;
    }
    if (password.length < 8) {
      setErrors([{ msg: 'password must be at least 8 characters long' }]);
      return;
    }
    if (password.search(/\d/) === -1) {
      setErrors([{ msg: 'password must contain at least one number' }]);
      return;
    }
    if (password.search(/[a-zA-Z]/) === -1) {
      setErrors([{ msg: 'password must contain at least one letter' }]);
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_BACKENDSERVER}/user/sign-up`, {
        username,
        email,
        password,
      })
      .then(() => navigate('/sign-in'))
      .catch((err) =>
        setErrors(err.response.data.errors ? err.response.data.errors : []),
      );
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  });

  return (
    <div className="SignUp">
      <form onSubmit={handleSubmit}>
        <div className="SignUp-form-grp">
          <h3>
            SIGN<span>UP</span>
          </h3>
          <div className="formGroup">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              value={username}
              id="username"
              placeholder="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <div className="formGroup">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              name="passwordConfirm"
              value={passwordCheck}
              id="passwordConfirm"
              placeholder="password"
              type="password"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>
          <div className="messages">
            {errors.map((error, index) => {
              return (
                <p className="errorMessage" key={index}>
                  - ! {error.msg}
                </p>
              );
            })}
          </div>
        </div>
        <div className="SignUp-btn-grp">
          <button type="submit">
            SIGN<span>UP</span>
          </button>
          <button
            type="button"
            className="secondoryBtn"
            onClick={() => navigate('/sign-in')}
          >
            SIGN<span>IN</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
