import React from 'react'
import { Jumbotron } from 'react-bootstrap';

class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            pwd:'',
            address:'',
            communityName:''
        }
    }


    formInput = (key,val) => {
        this.setState({
            [key] : val
        })
    }

    signUp = () => {

        const newUserObj={

            name: this.state.name,
            email: this.state.email,
            pwd: this.state.pwd,
            address: this.state.address,
            communityName: this.state.communityName
        }

        this.props.addUser(newUserObj);
        this.setState={
            name:'',
            email:'',
            pwd:'',
            address:'',
            communityName:''
        }
    }

render(){

    return(
        <div>
            <Jumbotron>
                Sign Up
            </Jumbotron>

            <Form>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                    <Form.Control type="email" onChange={(event)=>{this.formInput("name",event.target.value)}}placeholder="Enter full name" />
                </Form.Group>
                
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"  onChange={(event)=>{this.formInput("email",event.target.value)}}placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"  onChange={(event)=>{this.formInput("pwd",event.target.value)}}placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>building community name</Form.Label>
                    <Form.Control type="text"  onChange={(event)=>{this.formInput("communityName",event.target.value)}}placeholder="community name" />
                </Form.Group>
               
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Full address</Form.Label>
                    <Form.Control type="text"  onChange={(event)=>{this.formInput("address",event.target.value)}}placeholder="address" />
                </Form.Group>
                {/* <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="success" type="button" onClick={this.signUp}>
                    create account!
                </Button>
            </Form>
        </div>
    )
}
    
}

export default SignUp