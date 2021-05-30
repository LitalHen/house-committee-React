import React from 'react'
import { Form, Jumbotron, Button, Container } from 'react-bootstrap';

class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            pwd:'',
            address:'',
            communityName:'',
            id:''
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
            communityName: this.state.communityName,
            owner: true,
            id: `{owner-${this.state.communityName}}`

        }

        this.props.addUser(newUserObj);
        
        this.setState({
            name:'',
            email:'',
            pwd:'',
            address:'',
            communityName:''       
        })

        window.location.href="/#/"
    }

render(){

    return(
        <div className="signup-img-form">
            <div>
            <img className="signup-img" src="https://i.pinimg.com/originals/eb/bc/f9/ebbcf97df874668df83e093f3297a4af.jpg" alt="lobby picture"/>
            </div>
            <div className="signup-form">
                <h1>Welcom to Ahuzot HaNassi Community</h1>
                <h3>Create Account To Your Building</h3>
    
            <Form>
            <Form.Group controlId="formBasicPassword">
                    <Form.Label  className="signup-label">building community name</Form.Label>
                    <Form.Control type="text"  onChange={(event)=>{this.formInput("communityName",event.target.value)}}placeholder="community name" />
                </Form.Group>
                
                <Form.Group controlId="formBasicEmail">
                <Form.Label className="signup-label">Name</Form.Label>
                    <Form.Control type="text" onChange={(event)=>{this.formInput("name",event.target.value)}}placeholder="Enter full name" />
                </Form.Group>
                
                <Form.Group controlId="formBasicEmail">
                    <Form.Label  className="signup-label">Email address</Form.Label>
                    <Form.Control type="email"  onChange={(event)=>{this.formInput("email",event.target.value)}}placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label  className="signup-label">Password</Form.Label>
                    <Form.Control type="password"  onChange={(event)=>{this.formInput("pwd",event.target.value)}}placeholder="Password" />
                </Form.Group>
               
                <Form.Group controlId="formBasicPassword">
                    <Form.Label  className="signup-label">Full address</Form.Label>
                    <Form.Control type="text"  onChange={(event)=>{this.formInput("address",event.target.value)}}placeholder="address" />
                </Form.Group>
                <div className="btn-signup">
                <Button variant="success" type="button" onClick={this.signUp}>
                    create account!
                </Button>
                </div>
            </Form>
            </div>
        </div>
    )
}
    
}

export default SignUp