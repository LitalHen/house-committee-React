import React from 'react'
import MessagesComments from './MessagesComments';
import {Container, Form, Jumbotron} from 'react-bootstrap';
import MessageIssueComponent from './MessageIssueComponent';

class DashboardMessages extends React.Component{

    constructor(props){
        super(props);

        this.state={
            filter:'',
            search:'',
           
        }
    }

    formInput = (key,val) => {
       this.setState({
           [key]:val
       })
    }

    submitMessage = (newMessage) => {

        this.props.addMessage(newMessage);
    }


    addComment = (newComment) => {
        this.props.addComments(newComment)
    }

    // sortByDate = () => {
        
    // }
  
render(){ 
           
            const messages= this.props.allMessages.filter((filteredMessages)=>{

              return (filteredMessages.priority.includes(this.state.filter) && filteredMessages.title.includes(this.state.search) && filteredMessages.details.includes(this.state.search))
            })
            .map((message,id) => {

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
            <Form.Control as="select" onChange={(event)=>{this.formInput('filter', event.target.value)}}>
                    <option value="">view all messages</option>
                    <option value="important">Important</option>
                    <option value="info">Info</option>
            </Form.Control>    
            <Container style={{width:"500px", margin:"0px"}}>

                
            <Jumbotron>
                 Messages
            </Jumbotron>
            {messages}
            <MessageIssueComponent
            submitMessage={this.submitMessage}
            />
        </Container>

        </div>
    )
}
    
}

export default DashboardMessages