import React from 'react'
import { Button, Col, Form, Modal, Accordion,Card, Jumbotron, Container } from 'react-bootstrap';
import IssuesComments from './IssuesComments';
import MessageIssueComponent from './MessageIssueComponent';

class DashboardIssues extends React.Component{

    constructor(props){
        super(props);

        this.state={
            prioritySort:'',
            isPriority:false
        }

    }

    submitIssue = (newIssue) => {
  //from modal
        this.props.addIssue(newIssue);
    }

    addComment = (newComment) => {

        this.props.addComments(newComment)
    }

    sortedBy = () => {

       this.setState({
           prioritySort:"priority",
           isPriority: !this.state.isPriority
        })
    }
    
render(){

               const issues=this.props.allIssues.map((filteredIssue, id)=>{
                return <IssuesComments
                        issue={filteredIssue}
                        activeUser={this.props.activeUser}
                        allComments={this.props.allComments}
                        addComment={this.addComment}
                        />    
                })

    return(

        <div>    
        <Container style={{width:"500px", margin:"0px"}}>                   
                     <Jumbotron>
                         Issues
                     </Jumbotron>
                     <Form.Label>Filter By Priority</Form.Label>
                       {this.props.activeUser.owner &&  <input type="checkbox" checked={this.state.isPriority} onChange={this.sortedBy}>
                             </input> }
                     {/* show messages, all or filtered */}
                         {issues}
                     {/* send the submitMessage func from current component to modal- add new message */}
                     <MessageIssueComponent
                          addNewItem={this.submitIssue}
                          type="issue"
                     />
                </Container>
        </div>

        
    )
    
}

    
}

export default DashboardIssues