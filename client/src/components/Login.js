import React, { useState } from 'react';
import axios from 'axios';
import '../views/Login.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { BASE_URL } from '../validations';

function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(null);

  const LoginDetails = () => {
    // axios.post(`${BASE_URL}/login`
    axios.post(`/login`
      , {
        userId: userId,
        password: password
      })
      .then(
        (response) => {
          const data = response.data;
          if (data['token']) {
            Cookies.set('token', data['token'], { expires: 7, path: '/' });
            navigate('/')
          } else {
            setIsValid(false);
          }
        }
      )
      .catch(
        () => {
          setIsValid(false);
        }
      );
  }

  return (
    <div className='login-center'>
      <div className='card login'>

        <div className='login-box'>
          <div className='label'>
            <span>USERNAME</span>
          </div>

          <div>
            <input className='input-box' onChange={(e) => { setUserId(e.target.value) }} value={userId} placeholder='enter your user id' type='text' />
          </div>

          <div className='label'>
            <span>PASSWORD</span>
          </div>

          <div className='input-password'>
            <span>
              <input className='input-box' type={showPassword ? 'text' : 'password'} onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder='enter your password' />
            </span>
            <span onClick={() => { setShowPassword((v) => !v) }}>
              {
                showPassword ?
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg> :
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                  </svg>
              }
            </span>
          </div>

          <div className='button-div' style={{ flex: 'row', justifyContent: 'space-evenly' }}>
            <span>
              <button className='cursor-pointer login-button' onClick={() => { LoginDetails() }} type='button'>
                {
                  <span>
                    LOGIN
                  </span>
                }
              </button>
            </span>
            <span>
              <button className='cursor-pointer login-button' onClick={() => { navigate('/register'); }} type='button'>
                {
                  <span>
                    REGISTER
                  </span>
                }
              </button>
            </span>
          </div>

          {
            isValid === false && (
              <div class='d-flex flex-row justify-content-center'>
                <text style={{ color: 'red' }}>
                  <br />
                  ** Invalid Username or Password **
                </text>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Login