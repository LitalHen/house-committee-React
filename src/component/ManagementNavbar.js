import React from 'react'
import { Button, Form, FormControl, Nav, Navbar} from 'react-bootstrap';

class ManagementNavbar extends React.Component{

    constructor(props){
        super(props);
    }

render(){
        const logout=(this.props.activeUser)? <Nav.Link href="/#/logout" onClick={() => {this.props.logout()}}>Logout</Nav.Link>: null
        const login=(!this.props.activeUser)? <Nav.Link href="/#/login">Login</Nav.Link>:null
        const signup=(!this.props.activeUser)? <Nav.Link href="/#/signup">Signup</Nav.Link>: null
        const userName=(this.props.activeUser)?<Nav.Link>Hello {this.props.activeUser.name}</Nav.Link>:null
        const dashboardMessages=(this.props.activeUser)?<Nav.Link href="/#/dashboard-messages">Messages</Nav.Link>:null
        const dashboardIssues=(this.props.activeUser)?<Nav.Link href="/#/dashboard-issues">Issues</Nav.Link>:null
        const tenantsAccount=(this.props.activeUser && this.props.activeUser.owner)?<Nav.Link href="/#/tenants-accounts">Tenants account</Nav.Link>:null
    return(   

        <div>

            <Navbar bg="primary" sm={6} md={4} lg={3} variant="dark">
                <Navbar.Brand href="/#/">HOA System</Navbar.Brand>
                <Nav className="mr-auto">
                  {(this.props.activeUser && this.props.activeUser.owner) && (signup)}
                  {(this.props.activeUser && this.props.activeUser.owner) && (tenantsAccount)}
                   {dashboardMessages}
                   {dashboardIssues}
                </Nav>
                <div  className="ml-auto">
                <Nav>
                    {userName}
                    {login}
                    {logout}
               </Nav>  
               </div>
            </Navbar>
        </div>
    )
}
    
}

export default ManagementNavbar