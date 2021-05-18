import React from 'react'
import { Button, Col, Form, Modal } from 'react-bootstrap';

class Messages extends React.Component{

    constructor(props){
        super(props);

        this.state={
            title:'',
            description:'',
            priority:'',
            ismodalOpen: false
        }
    }

    formInput = (key,val) => {
       this.setState({
           [key]:val
       })
    }

    submitMessage = () => {
        const newMessage={
            title: this.state.title,
            description: this.state.description,
            priority: this.state.priority
        }

        this.props.addMessage(newMessage)

        this.setState({
            title:'',
            description:'',
            priority:''
        })

    }
    
    handleClose = () =>{

        this.setState({
            ismodalOpen:false
        })
}
    
render(){
    return(
        <div>
             {/* <Form>
                <Form.Group controlId="Title">
                <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={(event)=>{this.formInput("title",event.target.value)}}placeholder="Enter title" />
                </Form.Group>
                
                <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control  as="textarea" rows={3} type="text" onChange={(event)=>{this.formInput("description",event.target.value)}}placeholder="Enter description" />
                </Form.Group>

                <Form.Group controlId="Priority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control as="select" value={this.state.value} onChange={(event)=>{this.formInput("priority",event.target.value)}}>
                      <option value="">select priority</option>
                      <option value="important">Important</option>
                      <option value="info">Info</option>
                    </Form.Control>
                    <Form.Label>Upload Img</Form.Label>
                    <Form.File id="img" />
                </Form.Group>

                <Button type="button" onClick={this.submitMessage}>Submit</Button>
                </Form> */}
              <Button type="button" onClick={()=>{this.setState({ismodalOpen:true})}}>Add Message</Button>

                <Modal show={this.state.ismodalOpen} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Col sm={10}>   
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" onChange={(event)=>{this.formInput("title",event.target.value)}}placeholder="Enter title" />
              </Col>
            <Col sm={10}> 
                <Form.Label>Description</Form.Label>
                <Form.Control  as="textarea" rows={3} type="text" onChange={(event)=>{this.formInput("description",event.target.value)}}placeholder="Enter description" />  
              </Col>
            <Col sm={10}>   
                <Form.Label>Priority</Form.Label>
                        <Form.Control as="select" value={this.state.value} onChange={(event)=>{this.formInput("priority",event.target.value)}}>
                        <option value="">select priority</option>
                        <option value="important">Important</option>
                        <option value="info">Info</option>
                        </Form.Control>
              </Col>
            <Col sm={10}> 
            <Form.Label>Upload Img</Form.Label>
                    <Form.File id="img" />  
              </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.submitMessage}>
          submit message
          </Button>
        </Modal.Footer>
      </Modal>

        </div>
    )
}
    
}

export default Messages