import React from 'react'
import { Button, Col, Form, Modal, Accordion,Card } from 'react-bootstrap';

class Messages extends React.Component{

    constructor(props){
        super(props);

        this.state={
          ismodalOpen:this.props.isUpdateMessage,
          title:this.props.title,
          details:this.props.details,
          priority:this.props.priority,
          img:this.props.img
        }
    }

    formInput = (key,val) => {
       this.setState({
           [key]:val
       })
    }

    submitMessage = (message) => {

        const newMessage={
          title:this.state.title,
          details:this.state.details,
          priority:this.state.priority,
          img:this.state.img
        }
        this.props.addNewItem(newMessage);

    }
    
    handleClose = () =>{

        this.setState({
          ismodalOpen:false
        })
}
    
render(){

    return(
        <div>
               {(this.props.activeUser.id === this.props.issue.ownerId) && <Button type="button" onClick={()=>{this.editIssue(this.props.index)}}>Edit Message</Button>}
          <Modal show={this.state.ismodalOpen} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>update message </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Col sm={10}>   
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={this.state.title} onChange={(event)=>{this.formInput("title",event.target.value)}}placeholder="Enter title" />
              </Col>
            <Col sm={10}> 
                <Form.Label>Description</Form.Label>
                <Form.Control  as="textarea" value={this.state.details} rows={3} type="text" onChange={(event)=>{this.formInput("description",event.target.value)}}placeholder="Enter description" />  
              </Col>
            <Col sm={10}>   
                <Form.Label>Priority</Form.Label>
                        <Form.Control as="select" value={this.state.priority} onChange={(event)=>{this.formInput("priority",event.target.value)}}>
                        <option value="">select priority</option>
                        <option value="important">Important</option>
                        <option value="info">Info</option>
                        </Form.Control>
              </Col>
            <Col sm={10}> 
            <Form.Label>Upload Img</Form.Label>
                    <Form.File  id="img" />  
              </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.submitMessage}>
          update message
          </Button>
        </Modal.Footer>
      </Modal>
        </div>

        
    )
    
}

    
}

export default Messages