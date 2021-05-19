import React from 'react'
import { Button, Form, FormControl, Nav, Navbar} from 'react-bootstrap';

class ManagementNavbar extends React.Component{

    constructor(props){
        super(props);
    }

render(){
const owner=this.props.activeUser.owner;  
        const logout=(this.props.activeUser)? <Nav.Link to="/#" onClick={() => {this.props.logout()}}>Logout</Nav.Link>: null
        const login=(!this.props.activeUser)? <Nav.Link to="/#/login">Login</Nav.Link>:null
        const signup=(this.props.activeUser)? <Nav.Link to="/#/signup">Signup</Nav.Link>: null
        const userName=(this.props.activeUser)?<Nav.Link>{this.props.activeUser.name}</Nav.Link>:null
        const dashboardMessages=(this.props.activeUser)?<Nav.Link to="/#/dashboard-messages">Messages</Nav.Link>:null
        const tenantsAccount=(owner)?<Nav.Link to="/#/tenants-accounts">Tenants account</Nav.Link>:null
    return(   

        <div>

            <Navbar bg="primary" sm={6} md={4} lg={3} variant="dark">
                <Navbar.Brand href="#home">Home</Navbar.Brand>
                <Nav className="mr-auto">
                   {signup}
                   {tenantsAccount}
                   {dashboardMessages}
                </Nav>
                <Nav className="ml-auto">
                    {userName}
                    {login}
                    {logout}
               </Nav>  
            </Navbar>
        </div>
    )
}
    
}

export default ManagementNavbar