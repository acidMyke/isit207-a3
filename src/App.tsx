import Nav from './components/Nav';
import { AuthContextProvider } from './context/Auth';
import { Route, Switch } from 'wouter';
import HomePage from './pages/Home';
import AuthenticationPage from './pages/Authenticate';
import AdoptPage from './pages/Adopt';

export const App = () => (
  <>
    <AuthContextProvider>
      <Nav />
      <Switch>
        <Route path='/' component={HomePage} />
        <Route path='/adopt' component={AdoptPage} />
        <Route path={AuthenticationPage.path} component={AuthenticationPage} />
      </Switch>
    </AuthContextProvider>
  </>
);

export default App;
