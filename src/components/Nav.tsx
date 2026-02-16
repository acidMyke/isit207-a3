function Nav() {
  return (
    <header className='site-header'>
      <nav className='nav'>
        <a href='index.html' id='logo'>
          <img src='/images/logo.webp' alt='Car Rental Logo' />
        </a>

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
          <li>
            <a href='index.html'>Home</a>
          </li>
          <li>
            <a href='about.html'>About Us</a>
          </li>
          <li className='publiconly'>
            <a href='login.html'>Login</a>
          </li>
          <li className='publiconly'>
            <a href='sign-up.html'>Sign Up</a>
          </li>
          <li className='loginonly'>
            <a href='reserve.html'>Reserve</a>
          </li>
          <li className='loginonly'>
            <a href='history.html'>History</a>
          </li>
          <li className='loginonly'>
            <a href='#'>Log out</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
