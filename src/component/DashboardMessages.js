import React from 'react'
import MessagesComments from './MessagesComments';
import { Button, Col, Form, Modal } from 'react-bootstrap';

class DashboardMessages extends React.Component{

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

        this.props.addMessage(newMessage);

        this.setState({
            title:'',
            description:'',
            priority:''
        })
        this.handleClose()
    }
    
    handleClose = () =>{

        this.setState({
            ismodalOpen:false
        })
}

     addComment = (newComment) => {
        this.props.addComments(newComment)
    }
    
render(){   
        <div>
        
         
        </div>

            const messages= this.props.allMessages.map((message,id) => {

                return <MessagesComments
                        message={message}
                        allComments={this.props.allComments}
                        addComment={this.addComment}
                        activeUser={this.props.activeUser}
                        />
                        
                   })
                   
                 
    return(
        <div>
            {messages}
        <Button type="button" onClick={()=>{this.setState({ismodalOpen:true})}}>Add Message</Button>

        <Modal show={this.state.ismodalOpen} onHide={this.handleClose}>
            <Modal.Header closeButton>
                 <Modal.Title>Create </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col sm={10}>   
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" required value={this.state.title} onChange={(event)=>{this.formInput("title",event.target.value)}}placeholder="Enter title" />
                    <div class="invalid-feedback">
                            Please enter a title
                    </div>
                </Col>
                <Col sm={10}> 
                    <Form.Label>Description</Form.Label>
                    <Form.Control  as="textarea" required value={this.state.description} rows={3} type="text" onChange={(event)=>{this.formInput("description",event.target.value)}}placeholder="Enter description" />  
                </Col>
                <Col sm={10}>   
                     <Form.Label>Priority</Form.Label>
                     <Form.Control as="select" required value={this.state.value} onChange={(event)=>{this.formInput("priority",event.target.value)}}>
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
            Submit message
             </Button>
        </Modal.Footer>
        </Modal>
        </div>
    )
}
    
}

export default DashboardMessages