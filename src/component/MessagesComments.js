import React from 'react'
import { Form, Button } from 'react-bootstrap';

class MessagesComments extends React.Component{

constructor(props){
    super(props);
    this.state={
        comment: '',
    }
}

formInput = (key,val) => {
    this.setState({
        [key]:val
    })
 }

addComment = (val) => {

    const newComment={
        userName: this.props.activeUser.name,
        userId: this.props.activeUser.id,
        comment: this.state.comment,
        messageId: val
    }

    this.props.addComment(newComment)
    
    this.setState({
        comment:''
    })

}

render(){
    return(
        <div>
        <h6>{this.props.message.title}</h6>
            {this.props.message.priority}
        <p> {this.props.message.description}</p>
       
        {
            this.props.allComments.filter((comment)=>{

                return comment.messageId === this.props.message.id
            }).map((messageComment)=>{

                return <div key= {messageComment.id} style={{border:'1px solid black'}}>
                            <h6>{messageComment.userName} </h6>
                            <p>{messageComment.comment}</p>
                        </div>
            })
        }
        
        <Form>
            <Form.Group controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control value={this.state.comment}  as="textarea" rows={2} type="text" onChange={(event)=>{this.formInput("comment",event.target.value)}}placeholder="Enter comment" />
            </Form.Group>
            <Button onClick={()=> {this.addComment(this.props.message.id)}}>add comment</Button>
          </Form>
          
    </div>

    )
}



}

export default MessagesComments