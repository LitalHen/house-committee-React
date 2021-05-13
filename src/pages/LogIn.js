
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
        this.setState={
            [key]:val
        }
    }

    login= () => {

        const userExist=this.props.buildingUsers.find((user) => {
            return this.state.email === user.email && this.state.pwd === user.pwd
        })

        if (userExist){
            this.props.login(userExist)
            //close modal
            window.location.href="/homepage"
            this.setState({
                errMessage:''
            })
        }
        else{

            this.setState({
                errMessage:'email or password incurrect, please check with your homeowner association committee'
            })

        }
    }

render(){


    return(
        <div>
            <Jumbotron >
              <h1>  Login </h1>
            </Jumbotron>
            {/* //create modal */}
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={(event)=>{this.formInput("name",event.target.value)}}placeholder="Enter full name" />
                    </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={(event)=>{this.formInput("email",event.target.value)}}placeholder="Enter Email" />
                    </Form.Group>

                <Button variant="success" type="button" onClick={this.login}>
                   Login
                </Button>
            </Form>
            <div>{this.state.errMessage}</div>
            
            {/* <Alert variant="success">
                <Alert.Heading>Error message</Alert.Heading>
                <p>
                {this.state.errMessage}
                </p>
                </Alert> */}
        </div>
    )
}

}

export default LogIn