import Nav from './components/Nav';
import { AuthContextProvider } from './context/Auth';
import { Route, Switch } from 'wouter';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import AuthenticationPage from './pages/Authenticate';

export const App = () => (
  <>
    <AuthContextProvider>
      <Nav />
      <Switch>
        <Route path='/' component={HomePage} />
        <Route path='/about' component={AboutPage} />
        <Route path={AuthenticationPage.path} component={AuthenticationPage} />
      </Switch>
    </AuthContextProvider>
  </>
);

export default App;
