import React, { useEffect, useState } from 'react'
import '../views/Register.css';
import { useNavigate } from 'react-router-dom';
import { validateUsername, validatePassword, validateName } from '../validations';
import axios from 'axios';
// import { BASE_URL } from '../validations';

function Register() {

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(null);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validConfirmPassword, setValidConfirmPassword] = useState(null);
  const [name, setName] = useState('');
  const [validName, setValidName] = useState('');
  const [isValid, setIsValid] = useState(null);

  const navigate = useNavigate();
  // const [email, setEmail] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => { setValidUsername(validateUsername(username) !== null); }, [username])
  useEffect(() => { setValidPassword(validatePassword(password) !== null); setValidConfirmPassword(password === confirmPassword) }, [password, confirmPassword])
  useEffect(() => { setValidName(validateName(name) !== null) }, [name])

  const validDetails = () => {
    let validateDetails =
      (validName === true
        && validUsername === true
        && validPassword === true
        && validConfirmPassword === true);
    if (!validateDetails)
      return setIsValid(false);
    setIsValid(true);
    // axios.post(`${BASE_URL}/register`,
    axios.post(`/register`,
      {
        username: username
        , password: password
        , name: name
      })
      .then((response) => {
        console.log(response)
        if (response.data)
          navigate('/login')
        setIsValid('already resgitered member')
      })
      .catch(() => {
        setIsValid('server error')
      });
  }

  return (
    <div className='register-box'>
      <div className='input-field'>
        <div className='label'>
          USERID
        </div>
        <div>
          <input className='input-box' type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            placeholder='enter your user id' />
        </div>
        {
          validUsername !== null && validUsername === false && (
            <div>
              <text style={{ color: 'red' }}>
                ** Invalid username **
              </text>
            </div>
          )
        }
      </div>

      <div className='input-field'>
        <div className='label'>
          PASSWORD
        </div>
        <div>
          <input className='input-box' type="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            value={password} placeholder='enter your password' />
        </div>
        {
          validPassword !== null && validPassword === false && (
            <div>
              <text style={{ color: 'red' }}>
                ** Invalid password **
              </text>
            </div>
          )
        }
      </div>

      <div className='input-field'>
        <div className='label'>
          CONFIRM PASSWORD
        </div>
        <div>
          <input className='input-box' type="password"
            onChange={(e) => { setConfirmPassword(e.target.value) }}
            value={confirmPassword} placeholder='confirm your password' />
        </div>
        {
          validConfirmPassword !== null && validConfirmPassword === false && (
            <div>
              <text style={{ color: 'red' }}>
                ** password doesn't match **
              </text>
            </div>
          )
        }
      </div>

      <div className='input-field'>
        <div className='label'>
          NAME
        </div>
        <div>
          <input className='input-box' type="text"
            onChange={(e) => {
              setName(e.target.value)
            }}
            value={name} placeholder='enter your name' />
        </div>
        {
          validName !== null && validName === false && (
            <div>
              <text style={{ color: 'red' }}>
                ** Invalid name **
              </text>
            </div>
          )
        }
      </div>

      <div className='button-div'>
        <button className='cursor-pointer login-button' onClick={() => { validDetails() }} type='button'>
          {
            <span>
              REGISTER
            </span>
          }
        </button>
      </div>

      {
        isValid !== null && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <text style={{ color: 'red' }}>
              {isValid}
            </text>
          </div>
        )
      }
    </div>
  )
}

export default Register