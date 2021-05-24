import React from 'react'
import { Form, Button, Accordion, Card, Modal, Col, Container, Row} from 'react-bootstrap';

class MessagesComments extends React.Component{

        constructor(props){
            super(props);
            this.state={
                comment: '',
                messageId: '',
                isUpdateMessage: false,
                title:'',
                details:'',
                priority:'',
                img:'',
                id:'',
                index: ''
            }
        }

        formInput = (key,val) => {
            this.setState({
                [key]:val
            })
        }


        
        addComment = (val) => {

            const newComment={
                userName: this.props.activeUser.name,
                userId: this.props.activeUser.id,
                comment: this.state.comment,
                messageId: val,
                type:"message"
            }

        if(this.state.comment!=""){
                // send new obj to addComment func from DashboardMessages
                this.props.addComment(newComment)
            }       
            this.setState({
                comment:''
            })
        }

        deleteMessage = (index) => {

            this.props.deleteMessage('messages', index);
            
        }

        editMessage = (index) => {
            
            this.setState({
                messageId: this.props.message.id,
                isUpdateMessage:true,
                title:this.props.message.title,
                details:this.props.message.details,
                priority:this.props.message.priority,
                img:this.props.message.img,
                id: this.props.message.id,
                index: index
            })

        }

        updateMessage = () => {

            const updatedMessage={
                title: this.state.title,
                details:this.state.details,
                priority:this.state.priority,
                img:this.state.img,
                id: this.state.id,
                createdBy: this.props.activeUser.name
            }
            
            this.props.updateMessage('messages',updatedMessage, this.state.index)
            
            this.setState({
                isUpdateMessage:false,
                title: '',
                details:'',
                priority:'',
                img:'',
                id: '',
                index: ''
                
            })

            this.setState({
                isUpdateMessage:false
            })
            
        }
        
        handleClose = () =>{

            this.setState({
                isUpdateMessage:false
            })
    }
        

render(){
    return(
              
        <div>
    <Container sm={6} md={4} lg={3}>
         {/* show each message in accordion view, message from DashboardMessages after filter and map */}
          <Accordion>
            <Card>
                <Card.Header>
                     <Accordion.Toggle as={Button} variant="link" eventKey="0">
                          {this.props.message.title}
                         
                    </Accordion.Toggle>
                  
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                     <Card.Body>
                         <Row>
                        <Col>
                             {(this.props.message.img !== '') ? <img className="message-img" src={this.props.message.img}/> : <img className="message-img" src={"https://static.vecteezy.com/system/resources/thumbnails/001/970/338/small/building-under-construction-site-free-vector.jpg"} />}
                             <p>Created By: {this.props.message.createdBy}</p>
                             <div className="remove-message">
                             {(this.props.activeUser.owner) && <Button type="button" variant="danger" onClick={()=>{this.deleteMessage(this.props.index)}}>Remove Message</Button>}
                             </div>
                        </Col>
                        <Col className="message-content">
                             <h4>{this.props.message.title}</h4>
                             <p>Priority: {this.props.message.priority} </p>
                             <p>Details: {this.props.message.details}</p>
                            <div>
                            {(this.props.activeUser.owner) && <Button type="button" onClick={()=>{this.editMessage(this.props.index)}}>Edit Message</Button>}
                            </div>  
                            <div className="add-comment">
                            <Form.Control value={this.state.comment}  as="textarea" rows={2} type="text" onChange={(event)=>{this.formInput("comment",event.target.value)}}placeholder="Enter comment" />  
                            </div>
                           <Button onClick={()=> {this.addComment(this.props.message.id)}}>
                                Add comment
                        </Button>
                      
                        </Col>
                    <Col>
                    <h4>Join Discussion</h4>
                {this.props.allComments.filter((comment)=>{
                 // get allComments(json from app) from DashboardMessages and filtered to get the comment for currect message
                return comment.messageId === this.props.message.id && comment.type === "message"

                }).map((messageComment)=>{
                // map the filtered comments
                return   <div key= {messageComment.id} className="comments-border">
                           <div className="comments">
                               <h5>{messageComment.userName} </h5>
                            </div>
                                <p>{messageComment.comment}</p>
                        </div>
                       
                  })
                  
                }
                
                        </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            
          </Accordion>      
          <div>
          <Modal show={this.state.isUpdateMessage} onHide={this.handleClose}>
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
                <Form.Control  as="textarea" value={this.state.details} rows={3} type="text" onChange={(event)=>{this.formInput("details",event.target.value)}}placeholder="Enter description" />  
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
            <Form.Control type="text" value={this.state.img} onChange={(event)=>{this.formInput("img",event.target.value)}}>
                    </Form.Control>
              </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.updateMessage}>
          update message
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
        </Container>
        </div>

    )


}



}

export default MessagesComments