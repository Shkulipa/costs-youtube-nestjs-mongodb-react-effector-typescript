import './authPage.css';
import { Link, useNavigate } from "react-router-dom";
import React, { MutableRefObject, useRef, useState } from 'react';
import { AuthClinet } from '../../api/authClient';
import { setAlert } from '../../context/alert';
import Spinner from '../spinner/spinner';
import { handleAlertMsg } from '../../utils/auth';

interface IAuthPageProps {
  type: 'login' | 'registration'
}

export default function AuthPage({ type }: IAuthPageProps): JSX.Element {
  const [spinner, setSpinner] = useState<boolean>(false);
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();

  const currentAuthTitle = type === 'login' ? 'login' : 'registration';

  const handleAuthResponse = (
    res: boolean | undefined,
    navigatePath: string,
    alertText: string
  ) => {
    if(!res) {
      setSpinner(false);
      handleAlertMsg({ alertText: 'Smth went wrong', alertStatus: 'warning' })
      return;
    }

    setSpinner(false);
    navigate(navigatePath);
    handleAlertMsg({ alertText, alertStatus: 'success' })
  }

  const handleLogin = async (username: string, password: string) => {
    if(!usernameRef.current.value || !passwordRef.current.value) {
      setSpinner(false);
      handleAlertMsg({ alertText: 'Fill all fields', alertStatus: 'warning' });
      return;
    }

    if(passwordRef.current.value.length < 4) {
      setSpinner(false);
      handleAlertMsg({ 
        alertText: 'length of password should be more then 4 symbols', 
        alertStatus: 'error' 
      })
      return;
    };

    const res = await AuthClinet.login(username, password);

    handleAuthResponse(res, '/costs', 'Logged in');
  }

  const handleRegistration = async (username: string, password: string) => {
    if(!usernameRef.current.value || !passwordRef.current.value) {
      setSpinner(false);
      handleAlertMsg({ alertText: 'Fill all fields', alertStatus: 'warning' })
      return;
    }

    if(passwordRef.current.value.length < 4) {
      setSpinner(false);
      handleAlertMsg({ 
        alertText: 'length of password should be more then 4 symbols', 
        alertStatus: 'error' 
      })
      return;
    };

    const res = await AuthClinet.registration(username, password);

    handleAuthResponse(res, '/login', 'Registration completed!');
  }

  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpinner(true);

    switch (type) {
      case 'login':
        handleLogin(usernameRef.current.value, passwordRef.current.value);
        break;
      case 'registration':
        handleRegistration(usernameRef.current.value, passwordRef.current.value);
        break;
      default:
        break;
    }
  }


  return (
    <div className="container">
      <h1>{currentAuthTitle}</h1>
      <form onSubmit={handleAuth} className="form group">
        <label className="auth-label">
          Enter your name
          <input ref={usernameRef} type="text" className="form-control" />
        </label>
        <label className="auth-label">
          Password
          <input ref={passwordRef} type="password" className="form-control" />
        </label>
        <button type='submit' className="btn btn-primary auth-btn">
          {spinner ? <Spinner top={5} left={20}/> : currentAuthTitle}
        </button>
      </form>
      {
        type === 'login' 
          ? <div>
              <span className='question-text'>Haven't account?</span>
              <Link to={'/registration'}>Registration</Link>
            </div>
          : <div>
              <span className='question-text'>Already Have account?</span>
              <Link to={'/login'}>Login</Link>
            </div>
      }
    </div>
  )
}
