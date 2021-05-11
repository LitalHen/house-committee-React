import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ManagementNavbar from './component/ManagementNavbar';
import LogIn from './pages/LogIn';
import LogOut from './pages/LogOut';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomepAge';
function App() {
  return (
    <div>
      <HashRouter>
        <Container>
        <Route exact path={['/','/messages']}>
          <ManagementNavbar></ManagementNavbar>
        </Route>
        <Route exact path='/login'>
          <LogIn></LogIn>
        </Route>
        <Route exact path='/logout'>
          <LogOut></LogOut>
        </Route>
        <Route exact path='/signup'>
          <SignUp></SignUp>
        </Route>
        <Route exact path='/'>
         <HomePage></HomePage>
        </Route>
        </Container>
      </HashRouter>
    </div>
  );
}

export default App;
