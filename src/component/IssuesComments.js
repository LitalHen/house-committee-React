
import React from 'react'
import { Button, Form, Accordion,Card, Col,Modal, Container, Row } from 'react-bootstrap';


class IssuesComments extends React.Component{

    constructor(props){
        super(props);
        this.state={
            comment:'',
            isUpdateIssue: false,
            messageId: '',
            title:'',
            details:'',
            priority:'',
            img:'',
            id:'',
            index: '',
            status:'',
            ownerId:''
        }
    }

    formInput = (key,val) => {
       this.setState({
           [key]:val
       })
    }

    
    deleteIssues = (index) => {

        this.props.deleteIssue('issues', index);
        
    }
    
    editIssue = (index) => {
            
        this.setState({
            messageId: this.props.issue.id,
            isUpdateIssue:true,
            title:this.props.issue.title,
            details:this.props.issue.details,
            priority:this.props.issue.priority,
            img:this.props.issue.img,
            id: this.props.issue.id,
            index: index,
            status:this.props.issue.status,
            ownerId:this.props.issue.ownerId            
        })

    }

    addComment = (val) => {
        
        const newComment={
            userName: this.props.activeUser.name,
            userId: this.props.activeUser.id,
            comment: this.state.comment,
            messageId: val,
            type:"issue"
        }

        if (this.state.comment!=""){

              this.props.addComment(newComment)
        }
        
        this.setState({
            comment:''
        })

    }
    updateIssue = () => {

        const updatedIssue={
            title: this.state.title,
            details:this.state.details,
            priority:this.state.priority,
            img:this.state.img,
            id: this.state.id,
            status: this.state.status,
            ownerId: this.state.ownerId,
            createdBy: this.props.activeUser.name
        }
        
        this.props.updateIssue('issues',updatedIssue, this.state.index)
        
        this.setState({
            isUpdateIssue:false,
            title: '',
            details:'',
            priority:'',
            img:'',
            id: '',
            index: '',
            status:''
            
        })

        this.setState({
            isUpdateIssue:false,
            title: '',
            details:'',
            priority:'',
            img:'',
            id: '',
            index: '',
            status:''
        })
        
    }
    
    handleClose = () =>{

        this.setState({
            isUpdateIssue:false,
            title: '',
            details:'',
            priority:'',
            img:'',
            id: '',
            index: '',
            status:''
        })
}
    
render(){

    return(

        <Container sm={6} md={4} lg={3}>
            <Accordion>
               <Card>
                 <Card.Header>
                     <Accordion.Toggle as={Button} variant="link" eventKey="0">
                          {this.props.issue.title}
                         
                    </Accordion.Toggle>

                </Card.Header>
                <Accordion.Collapse eventKey="0">
                     <Card.Body>
                         <Row>
                            <Col>
                            {(this.props.issue.img !== '') ? <img className="message-img" src={this.props.issue.img}/> : <img className="message-img" src={"https://static.vecteezy.com/system/resources/thumbnails/001/970/338/small/building-under-construction-site-free-vector.jpg"} />}
                           <p>Created By: {this.props.issue.name}</p>
                            <div className="remove-message">
                            {(this.props.activeUser.id === this.props.issue.ownerId) &&  <Button type="button" variant="danger" onClick={()=>{this.deleteIssues(this.props.index)}}>Remove Issue</Button>}
                           </div>
                            </Col>
                            <Col><h4>{this.props.issue.title}</h4>
                                  <p>Status:{this.props.issue.status}</p>
                                  <p>Priority:{this.props.issue.priority} </p>
                                  <p>Details:{this.props.issue.details}</p>
                      <div>
                             {(this.props.activeUser.id === this.props.issue.ownerId) && <Button type="button" onClick={()=>{this.editIssue(this.props.index)}}>Edit Issue</Button>}
                       </div>
                        <div className="add-comment">
                            <Form.Control value={this.state.comment}  as="textarea" rows={2} type="text" onChange={(event)=>{this.formInput("comment",event.target.value)}}placeholder="Enter comment" />  
                            </div>
                           <Button onClick={()=> {this.addComment(this.props.issue.id)}}>
                                Add comment
                        </Button>
                       </Col>
                       <Col>
                       <h4>Join Discussion</h4>
                 {
                        
                     this.props.allComments.filter((comment)=>{
                         return comment.messageId === this.props.issue.id && comment.type === "issue"
                     })
                     
                     .map((issueComments) => {
                        return <div key= {issueComments.id} className="comments-border">
                                   
                                   <div className="comments">
                                       <h5>{issueComments.userName} </h5>
                                </div>
                                  <p>{issueComments.comment}</p>
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
          <Modal show={this.state.isUpdateIssue} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>update Issue </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Col sm={10}>
            <Form.Label>Status</Form.Label>
                <Form.Control as="select" value={this.state.value} onChange={(event)=>{this.formInput("status",event.target.value)}}>
                    <option value="open">Open</option>
                    <option value="close">Close</option>
                    </Form.Control>
                         </Col>
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
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
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
          <Button variant="primary" onClick={this.updateIssue}>
          update
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
 
          
        </Container>

        
    )
    
}

    
}

export default IssuesComments