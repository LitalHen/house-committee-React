import React from 'react'
import { Form, Jumbotron, Container } from 'react-bootstrap';
import IssuesComments from './IssuesComments';
import MessageIssueComponent from './MessageIssueComponent';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

class DashboardIssues extends React.Component{

    constructor(props){
        super(props);

        this.state={
            allIssues:''
        }

    }

    addNewIssue = (newIssue) => {
        //from modal
        const issue={
            ...newIssue,
            date: moment().toDate(),
            id: uuidv4()
        }
    this.props.addIssue(issue);

}

    addComment = (newComment) => {

        this.props.addComments(newComment)
    }

    sortedBy = (sortedValue) => {

        this.setState({
            allIssues: this.props.allIssues
        })

        let sortedIssues;
        if (sortedValue === "priority"){
           sortedIssues = this.state.allIssues.sort((a,b)=> b.priorityId -a.priorityId) 
        }
            
        
    }

render(){

               const issues=this.props.allIssues.map((issue, index)=>{
                return <IssuesComments
                        issue={issue}
                        index={index}
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
                       {this.props.activeUser.owner &&
                       <Form.Control as="select" value={this.state.sortBy} onChange={(event)=>{this.sortedBy(event.target.value)}}>
                        <option value="">sorted by</option>
                        <option value="priority">Priority</option>
                        <option value="date">Date</option>
                </Form.Control> }
                     {/* show messages, all or filtered */}
                         {issues}
                     {/* send the submitMessage func from current component to modal- add new message */}
                     <MessageIssueComponent
                          addNewItem={this.addNewIssue}
                          type="issue"
                     />
                </Container>
        </div>

        
    )
    
}

    
}

export default DashboardIssues