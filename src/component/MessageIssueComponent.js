import React from 'react'
import { Button,  Col, Form, Modal } from 'react-bootstrap';
class MessageIssueComponent extends React.Component{
//modal input for both message and issues component- generic component
    constructor(props){
        super(props);
 
        this.state={
            ismodalOpen: false,
            title:'',
            details:'',
            priority:'',
            img:''
        }
    }

    formInput = (key,val) => {
        this.setState({
            [key]:val
        })
     }

    submitNewMessage = () => {

        const newMessage={
            title: this.state.title,
            details: this.state.details,
            priority: this.state.priority,
            img: this.state.img
        }
        //props function from Dashboardmessages component 
        this.props.addNewItem(newMessage);

        this.setState({
            title:'',
            details:'',
            priority:'',
            img:''    
        })

        this.handleClose()
    }

    handleClose = () =>{

        this.setState({
            ismodalOpen:false
        })
    }

render(){

    return(
        
        <div>
            <Button type="button" onClick={()=>{this.setState({ismodalOpen:true})}}>Add Message</Button>
            <Modal show={this.state.ismodalOpen} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col sm={10}>   
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={this.state.title} onChange={(event)=>{this.formInput("title",event.target.value)}}placeholder="Enter title" />
                    </Col>
                    <Col sm={10}> 
                        <Form.Label>Description</Form.Label>
                        <Form.Control  as="textarea" value={this.state.details} rows={3} type="text" onChange={(event)=>{this.formInput("details",event.target.value)}}placeholder="Enter description" />  
                    </Col>
                    <Col sm={10}>   
                    <Form.Label>Priority</Form.Label>
                            <Form.Control as="select" value={this.state.value} onChange={(event)=>{this.formInput("priority",event.target.value)}}>
                                <option value="">select priority</option>
                                <option value="important">Important</option>
                                {this.props.type==="message" && <option value="info">Info</option>}
                                {this.props.type==="issue" && <option value="normal">Normal</option>}
                                {this.props.type==="issue" && <option value="urgent">Urgent</option>}
                            </Form.Control>
                    </Col>
                    <Col sm={10}> 
                    <Form.Label>Upload Img</Form.Label>
                    <Form.Control type="text" value={this.state.img} onChange={(event)=>{this.formInput("img",event.target.value)}}>
                    </Form.Control>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.submitNewMessage}>
                    submit message
                </Button>
                </Modal.Footer>
            </Modal>
</div>
    )
}

}

export default MessageIssueComponent