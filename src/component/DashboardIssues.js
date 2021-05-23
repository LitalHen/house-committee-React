import React from 'react'
import { Form, Jumbotron, Container } from 'react-bootstrap';
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
        const issue={
            ...newIssue,
            id: uuidv4(),
            date: new Date(),
            ownerId: this.props.activeUser.id,

        }
        console.log(issue.date)
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
                          activeUser={this.props.activeUser}
                     />
            
        </div>

        
    )
    
}

    
}

export default DashboardIssues