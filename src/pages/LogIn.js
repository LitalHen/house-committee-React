
import { Alert } from 'bootstrap';
import React from 'react'
import { Form, Jumbotron, Button } from 'react-bootstrap';

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
        <div>
            <Jumbotron >
              <h1>  Login </h1>
            </Jumbotron>
            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                        <Form.Control type="text" onChange={(event)=>{this.formInput("email",event.target.value)}}placeholder="Enter Email" />
                    </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={(event)=>{this.formInput("pwd",event.target.value)}}placeholder="Enter Password" />
                    </Form.Group>

                <Button variant="success" type="button" onClick={this.login}>
                   Login
                </Button>
            </Form>
            <div style={{color:"red"}}>
                {this.state.errMessage}

                </div>
        </div>
    )
}

}

export default LogIn