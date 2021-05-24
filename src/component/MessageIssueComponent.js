import React from 'react'
import { Button,  Col, Form, InputGroup, Modal } from 'react-bootstrap';
class MessageIssueComponent extends React.Component{
//modal input for both message and issues component- generic component
    constructor(props){
        super(props);
 
        this.state={
            ismodalOpen: false,
            title:'',
            details:'',
            priority:'',
            img:'',
            status:'open',
            validated: false,
            setValidated : false
        }
    }

    formInput = (key,val) => {
        this.setState({
            [key]:val
        })
     }

    submitNewMessage = () => {
        
        this.setState({
            setValidated:true
        })

        const newMessage={
            title: this.state.title,
            details: this.state.details,
            priority: this.state.priority,
            img: this.state.img,
            status: this.state.status
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
            ismodalOpen:false,
            title:'',
            details:'',
            priority:'',
            img:'' 
        })
    }

render(){

    return(
        
        <div>
            {(this.props.type==="message" && this.props.activeUser.owner) &&   <Button type="button" onClick={()=>{this.setState({ismodalOpen:true})}}>Add Message</Button>}
            {this.props.type==="issue"  && <Button type="button" onClick={()=>{this.setState({ismodalOpen:true})}}>Add Issue</Button>}
          
            <Modal show={this.state.ismodalOpen} onHide={this.handleClose}>
              <Form noValidate validated={this.state.validated}>
                <Modal.Header closeButton>
                {this.props.type==="message" && <Modal.Title>Create Message </Modal.Title>}
                {this.props.type==="issue"  && <Modal.Title>Create Issue </Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    <Col sm={10}>   
                        <Form.Label>Title</Form.Label>
                        <InputGroup hasValidation>
                        <Form.Control type="text" value={this.state.title} required onChange={(event)=>{this.formInput("title",event.target.value)}}placeholder="Enter title" />
                        <Form.Control.Feedback type="invalid">
                         Please provide title
                       </Form.Control.Feedback>
                       </InputGroup>
                    </Col>

                    <Col sm={10}> 
                        <Form.Label>Details</Form.Label>
                        <Form.Control  as="textarea" value={this.state.details} rows={3} type="text" onChange={(event)=>{this.formInput("details",event.target.value)}}placeholder="Enter description" />  
                        <Form.Control.Feedback type="invalid">
                         Please provide details
                       </Form.Control.Feedback>
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
                            {this.props.type==="issue" && <Form.Label>Status</Form.Label>}
                            {this.props.type==="issue" &&
                            <Form.Control as="select" value={this.state.value} onChange={(event)=>{this.formInput("status",event.target.value)}}>
                                <option value="open">Open</option>
                                <option value="close">Close</option>
                                </Form.Control>
                           }
                           <Form.Control.Feedback type="invalid">
                             Please provide priority
                            </Form.Control.Feedback>
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
                    submit
                </Button>
                </Modal.Footer>
                </Form>
            </Modal>
            
</div>
    )
}

}

export default MessageIssueComponent