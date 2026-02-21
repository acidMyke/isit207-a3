import { Link, useLocation, useRoute, useSearchParams } from 'wouter';
import './Authenticate.css';
import { useCallback, useState, type SubmitEventHandler } from 'react';
import { useAuth } from '../context/Auth';

const AuthenticationPagePath = '/(login|register)' as const;
export const AuthenticationPage = Object.assign(
  function () {
    const { processLogin, processRegister } = useAuth();
    const [, param] = useRoute(AuthenticationPagePath);
    const isRegister = param?.[0] === 'register';
    const [error, setError] = useState<string | undefined>();
    const [, redirect] = useLocation();
    const [searchParam] = useSearchParams();

    const onFormSubmit = useCallback<SubmitEventHandler<HTMLFormElement>>(
      e => {
        e.preventDefault();

        const data = new FormData(e.target);
        const namail = (data.get('namail') as string | undefined)?.trim() ?? '';
        const name = (data.get('name') as string | undefined)?.trim() ?? '';
        const fullname =
          (data.get('fullname') as string | undefined)?.trim() ?? '';
        const phone = (data.get('phone') as string | undefined)?.trim() ?? '';
        const email = (data.get('email') as string | undefined)?.trim() ?? '';
        const password = data.get('password') as string;

        if (isRegister) {
          if (name.length === 0) {
            setError('Name cannot be empty');
            return;
          }
          if (email.length === 0) {
            setError('Email cannot be empty');
            return;
          }

          if (!processRegister(email, name, password, fullname, phone)) {
            setError('Email/Name in used');
            return;
          }
        } else {
          if (namail.length === 0) {
            setError('Name/Email cannot be empty');
            return;
          }

          if (!processLogin(namail, password)) {
            setError('Invalid credentials');
            return;
          }
        }

        redirect(searchParam.get('redirect') ?? '/');
      },
      [isRegister, processLogin, processRegister],
    );

    return (
      <main id='login_page'>
        <section className='login_card' data-islogin={!isRegister}>
          <div className='login_title'>
            <h1>Welcome back</h1>
          </div>

          <form
            style={{ display: 'grid', gap: '1.25rem' }}
            onSubmit={onFormSubmit}
          >
            {isRegister ? (
              <>
                <div className='formfield'>
                  <label htmlFor='email'>Email</label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='you@example.com'
                    required
                  />
                  <p>Please include an '@' in the email address!</p>
                </div>

                <div className='formfield canwrap'>
                  <label htmlFor='name'>Username</label>
                  <input id='name' name='name' placeholder='you' required />
                  <p>Required</p>
                </div>

                <div className='formfield canwrap'>
                  <label htmlFor='fullname'>Full Name</label>
                  <input
                    id='fullname'
                    name='fullname'
                    type='text'
                    required
                    minLength={3}
                    placeholder='You Qing'
                  />
                  <p>Please enter your full name.</p>
                </div>

                <div className='formfield canwrap'>
                  <label htmlFor='password'>Password</label>
                  <input
                    id='password'
                    type='password'
                    name='password'
                    placeholder='••••••••'
                    required
                    minLength={8}
                  />
                  <p>Must be at least 8 characters</p>
                </div>
              </>
            ) : (
              <>
                <div className='formfield'>
                  <label htmlFor='namail'>Name/Email</label>
                  <input
                    id='namail'
                    name='namail'
                    placeholder='you/you@example.com'
                    required
                  />
                  <p>Required</p>
                </div>

                <div className='formfield'>
                  <label htmlFor='password'>Password</label>
                  <input
                    id='password'
                    type='password'
                    name='password'
                    placeholder='••••••••'
                    required
                    minLength={8}
                  />
                  <p>Must be at least 8 characters</p>
                </div>
              </>
            )}

            {isRegister && (
              <>
                <div className='formfield canwrap'>
                  <label htmlFor='phone'>Phone Number</label>
                  <input
                    id='phone'
                    name='phone'
                    type='tel'
                    required
                    pattern='[0-9]{8}'
                    placeholder='87654321'
                  />
                  <p>Please enter a valid phone number.</p>
                </div>
              </>
            )}

            <div className='formStatus'>
              {error && <p className='error'>{error}</p>}
            </div>

            <button className='btn-action-gradient' type='submit'>
              {isRegister ? 'Register' : 'Sign in'}
            </button>
          </form>

          {isRegister ? (
            <div className='login_footer'>
              <span>Have an account?</span>
              <Link
                href={`/login?${searchParam.toString()}`}
                className='btn-link inline'
              >
                <strong>Login</strong>
              </Link>
            </div>
          ) : (
            <div className='login_footer'>
              <span>Don't have an account?</span>
              <Link
                href={`/register?${searchParam.toString()}`}
                className='btn-link inline'
              >
                <strong>Register</strong>
              </Link>
            </div>
          )}
        </section>
      </main>
    );
  },
  { path: AuthenticationPagePath },
);

export default AuthenticationPage;
