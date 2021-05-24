import React from 'react'
import MessagesComments from './MessagesComments';
import {Container, Form, Jumbotron, Button, Row, Col} from 'react-bootstrap';
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
              (Messages.title.toLowerCase()).includes(this.state.search.toLowerCase()) && 
              (Messages.details.toLowerCase()).includes(this.state.search.toLowerCase()))
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
            <Container>
            <Row>
                 <Col>
                 <Form.Group className="group-search">
                     <Form.Control type="text" style={{backgroundImage: "url(img/magnifying-glass-189254_960_720.png)", position:'right',backgroundSize:'20px',backgroundRepeat:'no-repeat',borderRadius:'8px',backgroundPosition:'right'}} value={this.state.search} onChange={(event)=>{this.formInput('search', event.target.value)}}placeholder="search message" /> 
                </Form.Group>
                </Col>
                  <Col>
                  <Form.Group className="group-search">
                <Form.Control className="select-message" as="select" value={this.state.filter} onChange={(event)=>{this.formInput('filter', event.target.value)}}>
                        <option value="">fliter messages</option>
                        <option value="important">Important</option>
                        <option value="info">Info</option>
                </Form.Control> 
                </Form.Group>
                </Col>
            </Row>
            </Container>

                <div>                   
                     {/* show messages, all or filtered */}
                         {messages}
                     {/* send the submitMessage func from current component to modal- add new message */}
                     <div className="messages-display">
                     <MessageIssueComponent
                         addNewItem={this.addNewMessage}
                         type="message"
                         activeUser={this.props.activeUser}
                     />
                     </div>
                </div>
        </div>
     )
    }
    
}

export default DashboardMessages
