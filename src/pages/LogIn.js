
import { Alert } from 'bootstrap';
import React from 'react'
import { Form, Jumbotron, Button, Col } from 'react-bootstrap';

class LogIn extends React.Component{

    constructor(props){
        super(props);

        this.state={
            email:'',
            pwd:'',
            errMessage:''
        }
    }


    formInput = (key, val) => {
        this.setState({
            [key]:val
        })
    }

    login = () => {

        const userExist=this.props.buildingUsers.find((user) => {
            return (this.state.email === user.email)
        })

        if (userExist){
            this.props.login(userExist);
            window.location.href='/#/';
            this.setState({
                errMessage:''
            })
        }
        else{

            this.setState({
                errMessage:'email or password incurrect please check with your building committee'
            })

        }
    }

render(){

    
  
 
    return(
        <div className="logIn-img-form">
         
            <div>
            <img className="logIn-img"  src="https://www.miamiluxuryhomes.com/blog/wp-content/uploads/2014/08/One-Thousand-Museum-Condos-Skyline-View-at-Night.jpg" roundedCircle alt="building picture"></img>
            </div>
            <div className="logIn-form">
            <Form>
                <Form.Group>
                    <Form.Label className="login-label">Email</Form.Label>
                        <Form.Control type="text" onChange={(event)=>{this.formInput("email",event.target.value)}}placeholder="Enter Email" />
                    </Form.Group>

                <Form.Group>
                    <Form.Label className="login-label">Password</Form.Label>
                        <Form.Control type="password" onChange={(event)=>{this.formInput("pwd",event.target.value)}}placeholder="Enter Password" />
                    </Form.Group>
                <div className="btn-login">
                <Button variant="success" type="button" onClick={this.login}>
                   Login
                </Button>
                </div>
            </Form>
            <div className="login-errMessage">
                {this.state.errMessage}

                </div>
                </div>
        </div>
    )
}

}

export default LogIn