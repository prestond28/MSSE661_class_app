// import { useEffect, useState } from 'react';
import { doLogout } from './auth';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';


function About() {
  const navigate = useNavigate();

  return (
    <>
      <div className="body">
        <header>
          <nav className="nav">
            <Link to="/home" className='navlink'>home</Link>
            { localStorage.length ? <Link onClick={(e) => doLogout(e, navigate)} className="navlink">logout</Link> :
            <Link to="/login" className='navlink'>login</Link> }
          </nav>
        </header>
        <div className="content">
          Info about my app
        </div>
        <div className="footer">
          <div className="author">Author: <a href="https://github.com/prestond28" target="_blank">Preston Davis</a></div>
        </div>
      </div>
    </>
  )
}

export default About
