import React from 'react'
import MessagesComments from './MessagesComments';
import { Button,  Col, Container, Form, Jumbotron, Modal } from 'react-bootstrap';

class DashboardMessages extends React.Component{

    constructor(props){
        super(props);

        this.state={
            title:'',
            details:'',
            priority:'',
            ismodalOpen: false,
            img:'',
            filter:'',
            search:'',
            date:''
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
            details: this.state.details,
            priority: this.state.priority,
            img: this.state.img,

        }


        this.props.addMessage(newMessage);

        this.setState({
            title:'',
            details:'',
            priority:'',
            img:'',
            
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

    // sortByDate = () => {
        
    // }
  
render(){ 
            const messages= this.props.allMessages.filter((filteredMessages)=>{

              return (filteredMessages.priority.includes(this.state.filter) && filteredMessages.title.includes(this.state.search) && filteredMessages.details.includes(this.state.search))
            })
            .map((message,id) => {

                return <MessagesComments
                        message={message}
                        allComments={this.props.allComments}
                        addComment={this.addComment}
                        activeUser={this.props.activeUser}
                        />                       
                   })
                                    
    return(
        <div>
        
        <Form.Label>Seacrh</Form.Label>
        <Form.Control type="text" value={this.state.search} onChange={(event)=>{this.formInput('search', event.target.value)}}placeholder="search message" />
        <Form.Label>Filter By Priority</Form.Label>
            <Form.Control as="select" onChange={(event)=>{this.formInput('filter', event.target.value)}}>
                    <option value="">view all messages</option>
                    <option value="important">Important</option>
                    <option value="info">Info</option>
            </Form.Control>    
            <Container style={{width:"500px", margin:"0px"}}>

                
            <Jumbotron>
                 Messages
            </Jumbotron>
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
                    <Form.Label>Details</Form.Label>
                    <Form.Control  as="textarea" required value={this.state.description} rows={3} type="text" onChange={(event)=>{this.formInput("details",event.target.value)}}placeholder="Enter description" />  
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
                     <Form.Control  className="message-img" type="text" value={this.state.img} onChange={(event)=>{this.formInput("img",event.target.value)}}>
                     </Form.Control>
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
        </Container>

        </div>
    )
}
    
}

export default DashboardMessages