import React from 'react'
import { Jumbotron } from 'react-bootstrap';

class LogOut extends React.Component{

    constructor(props){
        super(props);
    
    }

    logout = () => {
        this.props.logout()
    }

render(){

    {this.props.logout()}
    return(
        <div>
            <Jumbotron>
            See you soon!...
            </Jumbotron>
        </div>
    )
}
    
}

export default LogOut