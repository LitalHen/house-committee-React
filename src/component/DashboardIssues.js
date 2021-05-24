import React from 'react'
import { Form, Jumbotron, Container, Row, Col } from 'react-bootstrap';
import IssuesComments from './IssuesComments';
import MessageIssueComponent from './MessageIssueComponent';
import { v4 as uuidv4 } from 'uuid';

class DashboardIssues extends React.Component{

    constructor(props){
        super(props);

        this.state={
            sortBy:''
        }

    }

    addNewIssue = (newIssue) => {
        //from modal
        let priority=0;
        if (newIssue.priority == "normal"){
            priority=1;
        }
        else if (newIssue.priority == "important"){
            priority=2;
        }
        else if (newIssue.priority == "urgent"){
            priority=3;
        }
        const issue={
            ...newIssue,
            id: uuidv4(),
            date: new Date(),
            ownerId: this.props.activeUser.id,
            priorityId:priority
        }
      
    this.props.addIssue(issue);

}

    addComment = (newComment) => {

        this.props.addComments(newComment)
    }

    updateIssue = (key, updatedMessage, index) => {

        this.props.updateIssue(key, updatedMessage, index)

    }

    sortedBy = (sortedValue) => {

        this.setState({
            sortBy:sortedValue
            
        })
        
    }

render(){

               const issues=this.props.allIssues.slice().sort((a,b)=>{
                   return ((this.state.sortBy === "priority" ? b.priorityId -a.priorityId:null) || (this.state.sortBy=== '') ||
                             (this.state.sortBy === "date" ? b.date - a.date :null))
               }).map((issue, index)=>{
                return <IssuesComments
                        issue={issue}
                        index={index}
                        activeUser={this.props.activeUser}
                        allComments={this.props.allComments}
                        addComment={this.addComment}
                        deleteIssue={this.props.deleteIssue}
                        updateIssue={this.updateIssue}
                        />    
                })

    return(

        <div>    
                       
                  <Container>
                     <Row>
                         <Col sm={10}>
                         <Form.Group className="group-issue-search">
                       <Form.Control className="select-issue" as="select" value={this.state.sortBy} onChange={(event)=>{this.sortedBy(event.target.value)}}>
                        <option value="">sorted by</option>
                        <option value="priority">Priority</option>
                        <option value="date">Date</option>
                </Form.Control> 
                </Form.Group>
                </Col>
                </Row>
                </Container>
                <div>
                     {/* show messages, all or filtered */}
                         {issues}
                     {/* send the submitMessage func from current component to modal- add new message */}
                   
                     <div className="messages-display">
                     <MessageIssueComponent
                          addNewItem={this.addNewIssue}
                          type="issue"
                          activeUser={this.props.activeUser}
                     />
                     </div> 
                     </div> 
        </div>

        
    )
    
}

    
}

export default DashboardIssues