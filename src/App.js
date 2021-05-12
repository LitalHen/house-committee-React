import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ManagementNavbar from './component/ManagementNavbar';
import LogIn from './pages/LogIn';
import LogOut from './pages/LogOut';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomepAge';
import usersJSON from './data/users.json';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state={
      buildingUsers:usersJSON,
      activeManagerUser:{
        name: "lital",
        email: "lital@gmail.com",
        pwd: "123",
        address:'test 2',
        communityName:'Hertzel'
      },
      activeTenantUser:{
        name: "lital",
        email: "lital@gmail.com",
        pwd: "123"
      }
    }
  }


  addUser = (newUser) =>{
      this.setState({
        buildingUsers:this.state.buildingUsers.concat(newUser)
      })
  }

  render(){
  return (
    <div>
      <HashRouter>
        <Container>
        <Route exact path={['/','/messages']}>
          <ManagementNavbar
          activeUser={this.state.activeUser}
          >
          </ManagementNavbar>
        </Route>
        <Route exact path='/login'>
          <LogIn
           activeUser={this.state.activeUser}
           >
           </LogIn>
        </Route>
        <Route exact path='/logout'>
          <LogOut 
           activeUser={this.state.activeUser}
           >
           </LogOut>
        </Route>
        <Route exact path='/signup'>
          <SignUp
           activeUser={this.state.activeUser}
           addUser={this.addUser}
           >
           </SignUp>
        </Route>
        <Route exact path='/'>
         <HomePage></HomePage>
        </Route>
        </Container>
      </HashRouter>
    </div>
  )
  }
}

export default App;
