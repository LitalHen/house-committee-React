import React from 'react'
import MessagesComments from './MessagesComments';
import {Container, Form, Jumbotron} from 'react-bootstrap';
import MessageIssueComponent from './MessageIssueComponent';
import { v4 as uuidv4 } from 'uuid';
import './DashboardMessagesStyle.css';

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

    addNewMessage = (newMessage) => {
        //Addmessage from app- add new message to json
        //newMessage get from messagesIssueComponent
        const message={
            ...newMessage,
            date: new Date(),
            id: uuidv4(),
            ownerId: this.props.activeUser.id
        }
        this.props.addMessage(message);
    }


    addComment = (newComment) => {
        //addComments from app- add new message to json
        //newComments get from messagesComments
        this.props.addComments(newComment)
    }

    updateMessage = (key, updatedMessage, index) => {

        this.props.updateMessage(key, updatedMessage, index)
    
    }
 
  
render(){ 
            const messages= this.props.allMessages.filter((Messages)=>{
                // get allmessages json data, filter-get the filtered array of obj by search box or by priority selected
              return ((Messages.priority === this.state.filter || this.state.filter === "") &&
              Messages.title.includes(this.state.search) && 
              Messages.details.includes(this.state.search))
            }).map(( filteredMessage, index) => {
                //map on filtered array of obj-> message
                //send each message to messagesComponent
                //allcomments from app, to map all comments for each message
                //addComment func from current component to add new comment to json
                //active user-for user name
                return <div key={index}>
                    <MessagesComments
                        index={index}
                        message={filteredMessage}
                        allComments={this.props.allComments}
                        addComment={this.addComment}
                        activeUser={this.props.activeUser}
                        deleteMessage={this.props.deleteMessage}
                        addNewItem={this.addNewItem}
                        allMessages={this.props.allMessages}
                        updateMessage={this.updateMessage}
                        
                        />  
                        </div>                     
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

                <div>                   
                     <Jumbotron>
                         Messages
                     </Jumbotron>
                     {/* show messages, all or filtered */}
                         {messages}
                     {/* send the submitMessage func from current component to modal- add new message */}
                     <MessageIssueComponent
                         addNewItem={this.addNewMessage}
                         type="message"
                         activeUser={this.props.activeUser}
                     />
                </div>
        </div>
     )
    }
    
}

export default DashboardMessages
