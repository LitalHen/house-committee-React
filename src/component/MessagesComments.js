import React from 'react'
import { Form, Button, Accordion, Card } from 'react-bootstrap';

class MessagesComments extends React.Component{

        constructor(props){
            super(props);
            this.state={
                comment: ''
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
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                     <Card.Body>
                        <h6>{this.props.message.title}</h6>
                        <p> {this.props.message.priority} </p>
                        <p> {this.props.message.details}</p>
                        <img src={this.props.message.img}/>

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
                
    </div>

    )
}



}

export default MessagesComments