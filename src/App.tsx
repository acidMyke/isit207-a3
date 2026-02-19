import Nav from './components/Nav';
import { AuthContextProvider } from './context/Auth';
import { Route, Switch } from 'wouter';
import HomePage from './pages/Home';
import AuthenticationPage from './pages/Authenticate';
import AdoptPage from './pages/Adopt';
import { PetDataStoreProvider } from './context/Store/Provider';
import ConfirmationPage from './pages/Confirmation';

export const App = () => (
  <>
    <PetDataStoreProvider>
      <AuthContextProvider>
        <Nav />
        <Switch>
          <Route path='/' component={HomePage} />
          <Route path='/adopt' component={AdoptPage} />
          <Route
            path={AuthenticationPage.path}
            component={AuthenticationPage}
          />
          <Route path={ConfirmationPage.path} component={ConfirmationPage} />
        </Switch>
      </AuthContextProvider>
    </PetDataStoreProvider>
  </>
);

export default App;
