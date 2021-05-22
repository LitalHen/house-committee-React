import React from 'react'
import { Form, Button, Accordion, Card, Modal, Col} from 'react-bootstrap';
// import Messages from './Messages';

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
                id: this.state.id
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
              
        <div sm={6} md={4} lg={3} key= {this.props.message.id} style={{marginTop:'20px'}}>
         {/* show each message in accordion view, message from DashboardMessages after filter and map */}
          <Accordion>
            <Card>
                <Card.Header>
                     <Accordion.Toggle as={Button} variant="link" eventKey="0">
                          {this.props.message.title}
                         
                    </Accordion.Toggle>
                    {(this.props.activeUser.owner) && <Button type="button" onClick={()=>{this.deleteMessage(this.props.index)}}>delete</Button>}
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                     <Card.Body>
                   
                        <h6>{this.props.message.title}</h6>
                        <p> {this.props.message.priority} </p>
                        <p> {this.props.message.details}</p>
                        <img src={this.props.message.img}/>
                    <div>
                      {(this.props.activeUser.owner) && <Button type="button" onClick={()=>{this.editMessage(this.props.index)}}>Edit Message</Button>}
                    </div>  
               
                
                {this.props.allComments.filter((comment)=>{
                 // get allComments(json from app) from DashboardMessages and filtered to get the comment for currect message
                return comment.messageId === this.props.message.id && comment.type === "message"

                }).map((messageComment)=>{
                // map the filtered comments
                return <div key= {messageComment.id} style={{border:'1px solid black'}}>
                           <div style={{backgroundColor:"lightgrey", height:'40px'}}>
                               <h6>{messageComment.userName} </h6>
                            </div>
                                <p>{messageComment.comment}</p>
                        </div>
                  })
                }

                        <Form.Control value={this.state.comment}  as="textarea" rows={2} type="text" onChange={(event)=>{this.formInput("comment",event.target.value)}}placeholder="Enter comment" />  
                        <Button onClick={()=> {this.addComment(this.props.message.id)}}>
                                Add comment
                        </Button>
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
 
                
  
    </div>

    )


}



}

export default MessagesComments
{/* <Messages
messageId={this.state.id}
title={this.props.message.title}
priority={this.props.message.priority}
details={this.props.message.details}
img={this.props.message.img}
allMessages={this.props.allMessages}
addNewItem={this.props.addNewItem}
isUpdateMessage={this.state.isUpdateMessage}
/>   */}