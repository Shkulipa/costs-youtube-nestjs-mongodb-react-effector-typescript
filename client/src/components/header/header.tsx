import { useStore } from 'effector-react';
import { $auth, $username } from "../../context/auth";
import { useTheme } from "../../hooks"
import { removeUser } from '../../utils/auth';

export default function Header(): JSX.Element {
  const { switchTheme, theme } = useTheme();
  const username = useStore($username);
  const loggedIn = useStore($auth);

  return (
    <header className={`navbar navbar-dark bg ${theme === 'dark' ? 'dark' : 'primary'}`}>
      <div className="container">
        <h1 style={{ color: 'whote' }}>Costs App</h1>
        {username && <h2>{username}</h2>}
        <button
          onClick={switchTheme}
          className={`btn btn-${theme === 'dark' ? 'dark' : 'light'}`}
        >
          {theme === 'dark' ? 'Go light' : 'Go dark'}
        </button>
        {loggedIn && <button onClick={removeUser} className="btn btn-primary">Logout</button>}
      </div>
    </header>
  )
}
