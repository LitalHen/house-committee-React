import React from 'react'
import { Form, Button, Col, Modal, Accordion, Card } from 'react-bootstrap';

class MessagesComments extends React.Component{

constructor(props){
    super(props);
    this.state={
        comment: '',
        ismodalOpen: false
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
        messageId: val
    }

   if(this.state.comment!=""){

    this.props.addComment(newComment)
}
    this.setState({
        comment:''
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
              
            
        <div  key= {this.props.message.id}  style={{marginTop:'20px'}}>
                  <Accordion>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                {this.props.message.title}
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                     <h6>{this.props.message.title}</h6>
                     <p> {this.props.message.priority} </p>
                     <p> {this.props.message.description}</p>
                     <img src={this.props.message.img}/>
                     {
            this.props.allComments.filter((comment)=>{

                return comment.messageId === this.props.message.id
            }).map((messageComment)=>{

                return <div key= {messageComment.id} style={{border:'1px solid black'}}>
                           <div style={{backgroundColor:"lightgrey", height:'40px'}}>
                            <h6>{messageComment.userName} </h6>
                            </div>
                            <p>{messageComment.comment}</p>
                        </div>
            })
        }

                <Button onClick={()=> this.setState({ismodalOpen:true})}>add comment</Button>
                     </Card.Body>
                </Accordion.Collapse>

        
       
            </Card>
            </Accordion>
            <div>
       

       
         </div>

          <Modal show={this.state.ismodalOpen} onHide={this.handleClose}>
            <Modal.Header closeButton>
                 <Modal.Title>Join the Discussion!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col sm={10}>   
                <Form.Label>Comment</Form.Label>
                <Form.Control value={this.state.comment}  as="textarea" rows={2} type="text" onChange={(event)=>{this.formInput("comment",event.target.value)}}placeholder="Enter comment" />
                </Col>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
             Close
            </Button>
           <Button variant="primary" onClick={()=> {this.addComment(this.props.message.id)}}>
            Submit comment
             </Button>
        </Modal.Footer>
        </Modal>
          
    </div>

    )
}



}

export default MessagesComments