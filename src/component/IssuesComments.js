import React from 'react'
import { Button, Form, Accordion,Card } from 'react-bootstrap';


class IssuesComments extends React.Component{

    constructor(props){
        super(props);

        this.state={
            title:'',
            details:'',
            priority:'',
            comment:''
        }
    }

    formInput = (key,val) => {
       this.setState({
           [key]:val
       })
    }

    submitIssue = (newIssue) => {
            //from modal
            const finalIssue={
                ...newIssue,
                 type: "issue",
                 date: new Date()
            }
        this.props.addIssue(finalIssue);

    }

    addComment = (val) => {
        
        const newComment={
            userName: this.props.activeUser.name,
            userId: this.props.activeUser.id,
            comment: this.state.comment,
            messageId: val,
            type:"issue"
        }

        this.props.addComment(newComment)
        
        this.setState({
            title:'',
            details:'',
            priority:'',
            comment:''
        })

    }

    
render(){

    return(

        <div  sm={6} md={4} lg={3} key= {this.props.issue.id} style={{marginTop:'20px'}}>
            <Accordion>
               <Card>
                 <Card.Header>
                     <Accordion.Toggle as={Button} variant="link" eventKey="0">
                          {this.props.issue.title}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                     <Card.Body>
                        <h6>{this.props.issue.title}</h6>
                        <p> {this.props.issue.priority} </p>
                        <p> {this.props.issue.details}</p>
                        <img src={this.props.issue.img}/>
                 {

                     this.props.allComments.filter((comment)=>{
                         return comment.messageId === this.props.issue.id && comment.type === "issue"
                     })
                     
                     .map((issueComments) => {
                        return <div key= {issueComments.id} style={{border:'1px solid black'}}>

                                   <div style={{backgroundColor:"lightgrey", height:'40px'}}>
                                       <h6>{issueComments.userName} </h6>
                                </div>
                                  <p>{issueComments.comment}</p>
                          </div>
                    })


                     }
                        <Form.Control value={this.state.comment}  as="textarea" rows={2} type="text" onChange={(event)=>{this.formInput("comment",event.target.value)}}placeholder="Enter comment" />  
                        <Button onClick={()=> {this.addComment(this.props.issue.id)}}>
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

export default IssuesComments