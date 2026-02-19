import { Link } from 'wouter';
import { useAuth } from '../context/Auth';
import './Nav.css';
import { useCallback, type MouseEventHandler } from 'react';

const navItems = [
  { special: 'greeting', roles: ['member', 'staff'] },
  { label: 'Home', path: '/' },
  { label: 'Adopt', path: '/adopt' },
  { label: 'Rehome', path: '/rehome' },
  { label: 'Login', path: '/login', roles: ['public'] },
  { label: 'Register', path: '/register', roles: ['public'] },
  { label: 'Manage', path: '/manage', roles: ['staff'] },
  { special: 'logout', roles: ['member', 'staff'] },
];

function Nav() {
  const { currentUsername, currentRole, processLogout } = useAuth();
  const onLogoutClick = useCallback<MouseEventHandler>(
    e => {
      e.preventDefault();
      processLogout();
    },
    [processLogout],
  );

  return (
    <header className='site-header'>
      <nav className='nav'>
        {/* <a href='index.html' id='logo'>
          <img src='/images/logo.webp' alt='Car Rental Logo' />
        </a> */}

        <input type='checkbox' id='nav-toggle' />
        <label htmlFor='nav-toggle'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-menu-icon lucide-menu hamburger'
          >
            <path d='M4 5h16' />
            <path d='M4 12h16' />
            <path d='M4 19h16' />
          </svg>
        </label>

        <ul id='menu'>
          {navItems.map(
            ({ label, path, roles = ['public', 'member'], special }) => {
              const allowedToSeeNav = roles.some(r => currentRole === r);

              if (!allowedToSeeNav) {
                return undefined;
              }

              if (label && path) {
                return (
                  <li key={path}>
                    <Link
                      href={path}
                      className={isActive => (isActive ? 'active' : undefined)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              }

              if (special === 'greeting') {
                return <li key='greeting'>Hello, {currentUsername}</li>;
              } else if (special === 'logout') {
                return (
                  <li key='logout'>
                    <a href='/' onClick={onLogoutClick}>
                      Logout
                    </a>
                  </li>
                );
              }
            },
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
