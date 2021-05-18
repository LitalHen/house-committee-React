import React from 'react'
import MessageComponent from './MessageComponent';
import Messages from './Messages';

class DashboardMessages extends React.Component{

    constructor(props){
        super(props);

    }

     addComment = (newComment) => {
        this.props.addComments(newComment)
    }
    
render(){

            const messages= this.props.allMessages.map((message,id) => {

                return <MessageComponent
                        message={message}
                        allComments={this.props.allComments}
                        addComment={this.addComment}
                        activeUser={this.props.activeUser}
                        />
                        
                   })

    return(
        <div>
            {messages}
            <div>
            <Messages/>
            </div>
        </div>
    )
}
    
}

export default DashboardMessages