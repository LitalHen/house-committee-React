import React from 'react'
import MessagesComments from './MessagesComments';
import {Container, Form, Jumbotron} from 'react-bootstrap';
import MessageIssueComponent from './MessageIssueComponent';

class DashboardMessages extends React.Component{

    constructor(props){
        super(props);

        this.state={
            filter:'',
            search:''           
        }
    }

    formInput = (key,val) => {
       this.setState({
           [key]:val
       })
    }

    submitMessage = (newMessage) => {
        //Addmessage from app- add new message to json
        //newMessage get from messagesIssueComponent
        this.props.addMessage(newMessage);
    }


    addComment = (newComment) => {
        //addComments from app- add new message to json
        //newComments get from messagesComments
        this.props.addComments(newComment)
    }

    // sortByDate = () => {
        
    // }

 
  
render(){ 
            const messages= this.props.allMessages.filter((filteredMessages)=>{
                // get allmessages json data, filter-get the filtered array of obj by search box or by priority selected
              return ((filteredMessages.priority === this.state.filter || this.state.filter === "") &&
                      filteredMessages.title.includes(this.state.search) && 
                      filteredMessages.details.includes(this.state.search))
            }).map((message,id) => {
                //map on filtered array of obj-> message
                //send each message to messagesComponent
                //allcomments from app, to map all comments for each message
                //addComment func from current component to add new comment to json
                //active user-for user name
                return <MessagesComments
                        message={message}
                        allComments={this.props.allComments}
                        addComment={this.addComment}
                        activeUser={this.props.activeUser}
                        />                       
                   })

                                    
    return(

        <div>
            <Form.Label>Seacrh</Form.Label>
                <Form.Control type="text" value={this.state.search} onChange={(event)=>{this.formInput('search', event.target.value)}}placeholder="search message" />
            <Form.Label>Filter By Priority</Form.Label>
                <Form.Control as="select" value={this.state.filter} onChange={(event)=>{this.formInput('filter', event.target.value)}}>
                        <option value="">view all messages</option>
                        <option value="important">Important</option>
                        <option value="info">Info</option>
                </Form.Control> 

                <Container style={{width:"500px", margin:"0px"}}>                   
                     <Jumbotron>
                         Messages
                     </Jumbotron>
                     {/* show messages, all or filtered */}
                         {messages}
                     {/* send the submitMessage func from current component to modal- add new message */}
                     <MessageIssueComponent
                         addNewItem={this.submitMessage}
                         type="message"
                     />
                </Container>
        </div>
     )
    }
    
}

export default DashboardMessages
