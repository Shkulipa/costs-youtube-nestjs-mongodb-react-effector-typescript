import './App.css';
import { useStore } from 'effector-react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/authPage/authPage';
import Header from './components/header/header';
import { $auth, setAuth, setUsername } from './context/auth';
import { $alert } from './context/alert';
import Alert from './components/alert/alert';
import { CostsPage } from './components/costsPage/costsPage';
import { useEffect } from 'react';
import { getAuthDataFromLS, removeUser } from './utils/auth';

function App() {
  const isLoggedIn = useStore($auth);
  const alert = useStore($alert);

  useEffect(() => {
    const auth = getAuthDataFromLS();

    if(!auth || !auth.accessToken || !auth.refreshToken) {
      removeUser()
    } else {
      setAuth(true);
      setUsername(auth.username);
    }
  }, [])

  return (
    <div>
      <Header />
      {
        alert.alertText && 
          <Alert 
            alertText={alert.alertText}
            alertStatus={alert.alertStatus} 
          /> 
      }
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            isLoggedIn
              ? <Navigate to='/costs' />
              : <Navigate to='/login' />
          } />
          <Route path='/login' element={
            isLoggedIn
            ? <Navigate to='/costs' />
            : <AuthPage type='login' />
          } />
          <Route path='/registration' element={
            isLoggedIn
            ? <Navigate to='/costs' />
            : <AuthPage type='registration' />
          } />
          <Route path='/costs' element={
            !isLoggedIn
              ? <AuthPage type='login' />
              : <CostsPage />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
