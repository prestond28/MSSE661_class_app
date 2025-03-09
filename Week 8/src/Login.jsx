import './index.css';
import { doLogin } from './auth';
import { useNavigate, Link } from 'react-router-dom';

function Login() {

const navigate = useNavigate();
  return (
    <>
      <div className="body">
        <header>
          <nav className="nav">
            { localStorage.length ? 
            <Link to="/home" className='navlink'>home</Link>
            : null
            }
            <Link to="/about" className='navlink'>about</Link>
          </nav>
        </header>
        <div className="content">
          <div className="login">
            <div className="inputs-and-labels">
              <label htmlFor="username">Username:</label><input className="input-field" id="usernameLogin" type="text" />
              <label htmlFor="password">Password:</label><input className="input-field" id="passwordLogin" type="password" />
            </div>
            <div className="login-or-register">
              <button onClick={(e) => doLogin(e, navigate)}>Login</button>
              <Link to="/register" className='navlink'>Register</Link>
            </div>
          </div>
        </div>
        <div className="footer">
          <p className="author">Author: <a href="https://github.com/prestond28" target="_blank">Preston Davis</a></p>
        </div>
      </div>
    </>
  )
}

export default Login
