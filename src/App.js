import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ManagementNavbar from './component/ManagementNavbar';
import LogIn from './pages/LogIn';
import LogOut from './pages/LogOut';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import usersJSON from './data/users.json';
import TenantsAccount from './pages/TenantsAccount';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state={
      buildingUsers:usersJSON,
      activeUser:{
        name: "lital hen",
        email: "lital@gmail.com",
        pwd: "123",
        address:'test 2',
        communityName:'Hertzel',
        owner:true
      },
      // activeUser:{
      //   name: "lital",
      //   email: "lital@gmail.com",
      //   pwd: "123",
      //   owner: false,
      //   aptNumber: "7"
      // }
    }
  }


  addUser = (newUser) =>{
      this.setState({
        buildingUsers:this.state.buildingUsers.concat(newUser)
      })
      if (newUser.owner){
        this.setState({
          activeUser: newUser
        })
      }
  }
  logout= () =>{
    this.setState({
      activeUser:null
    })
  }

  login = (userObj) => {
    this.setState({
      activeUser:userObj
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
            buildingUsers={this.state.buildingUsers}
            login={this.login}
            >
           </LogIn>
        </Route>

          <Route exact path='/logout'>
           <LogOut 
           logout={this.logout}
           >
           </LogOut>
        </Route>

        <Route exact path='/signup'>
          <SignUp
           activeUser={this.state.activeUser}
           addUser={this.addUser}
           buildingUsers={this.state.buildingUsers}
           >
           </SignUp>
        </Route>

        <Route exact path='/tenants-accounts'>
          <TenantsAccount
           addUser={this.addUser}
           buildingUsers={this.state.buildingUsers}
           >
           </TenantsAccount>
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
