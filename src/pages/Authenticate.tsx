import { Link, useRoute } from 'wouter';
import './Authenticate.css';

const AuthenticationPagePath = '/(login|register)' as const;
export const AuthenticationPage = Object.assign(
  function () {
    const [, param] = useRoute(AuthenticationPagePath);
    const isRegister = param?.[0] === 'register';

    return (
      <main id='login_page'>
        <section className='login_card'>
          <div className='login_title'>
            <h1>Welcome back</h1>
          </div>

          <form style={{ display: 'grid', gap: '1.25rem' }}>
            {isRegister ? (
              <>
                <div className='formfield'>
                  <label htmlFor='name'>Name</label>
                  <input id='name' name='name' placeholder='you' required />
                  <p>Required</p>
                </div>

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
              </>
            ) : (
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
            )}

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

            <div className='formStatus'></div>

            <button className='btn-action-gradient' type='submit'>
              {isRegister ? 'Register' : 'Sign in'}
            </button>
          </form>

          {isRegister ? (
            <div className='login_footer'>
              <span>Have an account?</span>
              <Link href='/login' className='btn-link inline'>
                <strong>Login</strong>
              </Link>
            </div>
          ) : (
            <div className='login_footer'>
              <span>Don't have an account?</span>
              <Link href='/register' className='btn-link inline'>
                <strong>Sign up</strong>
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
